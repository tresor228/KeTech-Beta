import prisma from '../config/database';
import { BadRequestError, NotFoundError, ConflictError } from '../utils/errors';
import { KYCStatus, IDType } from '@prisma/client';
import path from 'path';

interface CreateKYCData {
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  idType: IDType;
  idNumber: string;
  idDocumentFront?: string;
  idDocumentBack?: string;
}

export const kycService = {
  // Créer ou mettre à jour une demande KYC
  createOrUpdateKYC: async (data: CreateKYCData) => {
    const { userId, firstName, lastName, dateOfBirth, idType, idNumber, idDocumentFront, idDocumentBack } = data;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé');
    }

    // Vérifier si une demande KYC existe déjà
    const existingKYC = await prisma.kYC.findUnique({
      where: { userId },
    });

    // Si une demande existe et est vérifiée, ne pas permettre de modification
    if (existingKYC && existingKYC.status === KYCStatus.VERIFIED) {
      throw new ConflictError('Votre identité est déjà vérifiée');
    }

    // Créer ou mettre à jour la demande KYC
    const kyc = await prisma.kYC.upsert({
      where: { userId },
      update: {
        firstName,
        lastName,
        dateOfBirth,
        idType,
        idNumber,
        idDocumentFront: idDocumentFront || existingKYC?.idDocumentFront,
        idDocumentBack: idDocumentBack || existingKYC?.idDocumentBack,
        status: KYCStatus.PENDING,
        updatedAt: new Date(),
      },
      create: {
        userId,
        firstName,
        lastName,
        dateOfBirth,
        idType,
        idNumber,
        idDocumentFront,
        idDocumentBack,
        status: KYCStatus.PENDING,
      },
    });

    return kyc;
  },

  // Obtenir le statut KYC d'un utilisateur
  getKYCStatus: async (userId: string) => {
    const kyc = await prisma.kYC.findUnique({
      where: { userId },
    });

    if (!kyc) {
      return {
        status: KYCStatus.NOT_VERIFIED,
        verified: false,
      };
    }

    return {
      ...kyc,
      verified: kyc.status === KYCStatus.VERIFIED,
    };
  },

  // Obtenir toutes les demandes KYC (pour admin)
  getAllKYC: async (status?: KYCStatus) => {
    const where = status ? { status } : {};
    
    const kycRequests = await prisma.kYC.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            developerProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return kycRequests;
  },

  // Vérifier une demande KYC (pour admin)
  verifyKYC: async (kycId: string, verifiedBy: string, approved: boolean, rejectionReason?: string) => {
    const kyc = await prisma.kYC.findUnique({
      where: { id: kycId },
    });

    if (!kyc) {
      throw new NotFoundError('Demande KYC non trouvée');
    }

    if (kyc.status === KYCStatus.VERIFIED) {
      throw new ConflictError('Cette demande est déjà vérifiée');
    }

    const updatedKYC = await prisma.kYC.update({
      where: { id: kycId },
      data: {
        status: approved ? KYCStatus.VERIFIED : KYCStatus.REJECTED,
        verifiedAt: approved ? new Date() : null,
        verifiedBy: approved ? verifiedBy : null,
        rejectionReason: !approved ? rejectionReason : null,
      },
    });

    return updatedKYC;
  },
};
