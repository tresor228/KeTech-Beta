import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { BadRequestError, UnauthorizedError, ConflictError, NotFoundError } from '../utils/errors';
import { UserRole, KYCStatus, CompanyType } from '@prisma/client';

interface RegisterDeveloperData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface RegisterCompanyData {
  email: string;
  password: string;
  name: string;
  type: string;
  description?: string;
  location?: string;
  website?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Inscription développeur
  registerDeveloper: async (data: RegisterDeveloperData) => {
    const { email, password, firstName, lastName } = data;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('Cet email est déjà utilisé');
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur et le profil développeur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRole.DEVELOPER,
        developerProfile: {
          create: {
            firstName,
            lastName,
            globalScore: 0,
            level: 'beginner',
            objectives: [],
            interests: [],
            availability: 'available',
          },
        },
        keys: {
          create: {
            balance: 100, // 100 Keys gratuites à l'inscription
            totalEarned: 100,
            totalSpent: 0,
          },
        },
      },
      include: {
        developerProfile: true,
        keys: true,
      },
    });

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        developerProfile: user.developerProfile,
        keys: user.keys,
      },
      token,
    };
  },

  // Inscription entreprise
  registerCompany: async (data: RegisterCompanyData) => {
    const { email, password, name, type, description, location, website } = data;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('Cet email est déjà utilisé');
    }

    // Vérifier le type d'entreprise
    const companyType = type.toUpperCase() as keyof typeof CompanyType;
    if (!Object.keys(CompanyType).includes(companyType)) {
      throw new BadRequestError('Type d\'entreprise invalide');
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur et le profil entreprise
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRole.COMPANY,
        companyProfile: {
          create: {
            name,
            type: companyType as any,
            description,
            location,
            website,
          },
        },
      },
      include: {
        companyProfile: true,
      },
    });

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyProfile: user.companyProfile,
      },
      token,
    };
  },

  // Connexion
  login: async (data: LoginData) => {
    const { email, password } = data;

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        developerProfile: true,
        companyProfile: true,
        kyc: true,
        keys: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Email ou mot de passe incorrect');
    }

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        developerProfile: user.developerProfile,
        companyProfile: user.companyProfile,
        kyc: user.kyc,
        keys: user.keys,
      },
      token,
    };
  },

  // Obtenir le profil utilisateur actuel
  getCurrentUser: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        developerProfile: {
          include: {
            skills: true,
            achievements: true,
          },
        },
        companyProfile: true,
        kyc: true,
        keys: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      developerProfile: user.developerProfile,
      companyProfile: user.companyProfile,
      kyc: user.kyc,
      keys: user.keys,
    };
  },
};
