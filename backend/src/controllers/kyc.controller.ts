import { Response, NextFunction } from 'express';
import { kycService } from '../services/kyc.service';
import { AuthRequest } from '../middleware/auth';
import { IDType, KYCStatus } from '@prisma/client';

export const kycController = {
  // Créer ou mettre à jour une demande KYC
  createOrUpdateKYC: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Non authentifié',
        });
      }

      const { firstName, lastName, dateOfBirth, idType, idNumber } = req.body;

      // Récupérer les fichiers uploadés
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const idDocumentFront = files?.idDocumentFront?.[0]?.path;
      const idDocumentBack = files?.idDocumentBack?.[0]?.path;

      if (!idDocumentFront) {
        return res.status(400).json({
          success: false,
          message: 'Le document d\'identité (recto) est requis',
        });
      }

      const kyc = await kycService.createOrUpdateKYC({
        userId: req.user.userId,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        idType: idType as IDType,
        idNumber,
        idDocumentFront,
        idDocumentBack,
      });

      res.status(200).json({
        success: true,
        message: 'Demande KYC soumise avec succès',
        data: kyc,
      });
    } catch (error) {
      next(error);
    }
  },

  // Obtenir le statut KYC
  getKYCStatus: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Non authentifié',
        });
      }

      const kyc = await kycService.getKYCStatus(req.user.userId);

      res.status(200).json({
        success: true,
        data: kyc,
      });
    } catch (error) {
      next(error);
    }
  },

  // Obtenir toutes les demandes KYC (admin)
  getAllKYC: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Accès refusé',
        });
      }

      const status = req.query.status as KYCStatus | undefined;
      const kycRequests = await kycService.getAllKYC(status);

      res.status(200).json({
        success: true,
        data: kycRequests,
      });
    } catch (error) {
      next(error);
    }
  },

  // Vérifier une demande KYC (admin)
  verifyKYC: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Accès refusé',
        });
      }

      const { kycId } = req.params;
      const { approved, rejectionReason } = req.body;

      const kyc = await kycService.verifyKYC(kycId, req.user.userId, approved, rejectionReason);

      res.status(200).json({
        success: true,
        message: approved ? 'KYC vérifié avec succès' : 'KYC rejeté',
        data: kyc,
      });
    } catch (error) {
      next(error);
    }
  },
};
