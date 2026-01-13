import { Router } from 'express';
import { body } from 'express-validator';
import { kycController } from '../controllers/kyc.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { uploadKYCDocuments } from '../middleware/upload';

const router = Router();

// Validation des données KYC
const kycValidation = [
  body('firstName').notEmpty().withMessage('Le prénom est requis'),
  body('lastName').notEmpty().withMessage('Le nom est requis'),
  body('dateOfBirth').isISO8601().withMessage('Date de naissance invalide'),
  body('idType')
    .isIn(['PASSPORT', 'NATIONAL_ID', 'DRIVERS_LICENSE', 'OTHER'])
    .withMessage('Type de document invalide'),
  body('idNumber').notEmpty().withMessage('Le numéro de document est requis'),
];

// Toutes les routes nécessitent une authentification
router.use(authenticate);

// Routes
router.post(
  '/',
  uploadKYCDocuments,
  validate(kycValidation),
  kycController.createOrUpdateKYC
);

router.get(
  '/status',
  kycController.getKYCStatus
);

router.get(
  '/all',
  kycController.getAllKYC
);

router.patch(
  '/:kycId/verify',
  kycController.verifyKYC
);

export default router;
