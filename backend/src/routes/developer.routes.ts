import { Router } from 'express';
import { developerController } from '../controllers/developer.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Toutes les routes de développeur nécessitent une authentification
router.use(authenticate);

// Obtenir le profil
router.get('/profile', developerController.getProfile);

// Mettre à jour l'onboarding
router.post('/onboarding', developerController.updateOnboarding);

// Mettre à jour les infos personnelles
router.put('/profile', developerController.updatePersonalInfo);

export default router;
