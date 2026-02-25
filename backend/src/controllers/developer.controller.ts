import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { BadRequestError, NotFoundError } from '../utils/errors';

export const developerController = {
    // Profil management
    // Mettre à jour le profil de onboarding
    updateOnboarding: async (
        req: AuthRequest<any, any, { interests?: string[]; level?: string; objectives?: string[] }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                throw new BadRequestError('Non authentifié');
            }

            const { interests, level, objectives } = req.body;

            // Trouver le profil développeur de l'utilisateur
            const developerProfile = await prisma.developerProfile.findUnique({
                where: { userId: req.user.userId },
            });

            if (!developerProfile) {
                throw new NotFoundError('Profil développeur non trouvé');
            }

            // Mettre à jour le profil
            const updatedProfile = await prisma.developerProfile.update({
                where: { id: developerProfile.id },
                data: {
                    interests: interests || [],
                    level: level || 'beginner',
                    objectives: objectives || [],
                },
            });

            res.status(200).json({
                success: true,
                message: 'Profil onboarding mis à jour',
                data: updatedProfile,
            });
        } catch (error) {
            next(error);
        }
    },

    // Mettre à jour les informations personnelles (Université, Pays, etc.)
    updatePersonalInfo: async (
        req: AuthRequest<any, any, { firstName?: string; lastName?: string; country?: string; university?: string; location?: string; bio?: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                throw new BadRequestError('Non authentifié');
            }

            const { firstName, lastName, country, university, location, bio } = req.body;

            const developerProfile = await prisma.developerProfile.findUnique({
                where: { userId: req.user.userId },
            });

            if (!developerProfile) {
                throw new NotFoundError('Profil développeur non trouvé');
            }

            const updatedProfile = await prisma.developerProfile.update({
                where: { id: developerProfile.id },
                data: {
                    firstName,
                    lastName,
                    country,
                    university,
                    location,
                    bio,
                },
            });

            res.status(200).json({
                success: true,
                message: 'Informations personnelles mises à jour',
                data: updatedProfile,
            });
        } catch (error) {
            next(error);
        }
    },

    // Obtenir le profil développeur
    getProfile: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new BadRequestError('Non authentifié');
            }

            const profile = await prisma.developerProfile.findUnique({
                where: { userId: req.user.userId },
                include: {
                    skills: true,
                    user: {
                        select: {
                            email: true,
                            role: true,
                        },
                    },
                },
            });

            if (!profile) {
                throw new NotFoundError('Profil non trouvé');
            }

            res.status(200).json({
                success: true,
                data: profile,
            });
        } catch (error) {
            next(error);
        }
    },
};
