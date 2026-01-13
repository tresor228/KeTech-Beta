import { Router } from 'express';
import { body } from 'express-validator';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Validation des données d'inscription développeur
const registerDeveloperValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('firstName').optional().isString().withMessage('Prénom invalide'),
  body('lastName').optional().isString().withMessage('Nom invalide'),
];

// Validation des données d'inscription entreprise
const registerCompanyValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('name').notEmpty().withMessage('Le nom de l\'entreprise est requis'),
  body('type')
    .isIn(['STARTUP', 'AGENCE', 'PME', 'GRAND_GROUPE', 'AUTRE'])
    .withMessage('Type d\'entreprise invalide'),
  body('description').optional().isString().withMessage('Description invalide'),
  body('location').optional().isString().withMessage('Localisation invalide'),
  body('website').optional().isURL().withMessage('URL de site web invalide'),
];

// Validation des données de connexion
const loginValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Le mot de passe est requis'),
];

// Routes
router.post(
  '/register/developer',
  validate(registerDeveloperValidation),
  authController.registerDeveloper
);

router.post(
  '/register/company',
  validate(registerCompanyValidation),
  authController.registerCompany
);

router.post(
  '/login',
  validate(loginValidation),
  authController.login
);

router.get(
  '/me',
  authenticate,
  authController.getCurrentUser
);

export default router;
