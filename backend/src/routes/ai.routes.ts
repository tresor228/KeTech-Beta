import { Router } from 'express';
import { aiController } from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

// Routes
router.get('/projects/recommendations', aiController.recommendProjects);
router.get('/collaborators/recommendations', aiController.recommendCollaborators);
router.get('/technologies/suggestions', aiController.suggestTechnologies);

export default router;
