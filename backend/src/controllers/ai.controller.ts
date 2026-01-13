import { Response, NextFunction } from 'express';
import { aiService } from '../services/ai.service';
import { AuthRequest } from '../middleware/auth';

export const aiController = {
  // Recommander des projets
  recommendProjects: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Non authentifié',
        });
      }

      // Trouver le profil développeur
      const developer = await require('../config/database').default.developerProfile.findFirst({
        where: { userId: req.user.userId },
      });

      if (!developer) {
        return res.status(404).json({
          success: false,
          message: 'Profil développeur non trouvé',
        });
      }

      const projects = await aiService.recommendProjects(developer.id);

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  // Recommander des collaborateurs
  recommendCollaborators: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Non authentifié',
        });
      }

      const developer = await require('../config/database').default.developerProfile.findFirst({
        where: { userId: req.user.userId },
      });

      if (!developer) {
        return res.status(404).json({
          success: false,
          message: 'Profil développeur non trouvé',
        });
      }

      const limit = parseInt(req.query.limit as string) || 10;
      const collaborators = await aiService.recommendCollaborators(developer.id, limit);

      res.status(200).json({
        success: true,
        data: collaborators,
      });
    } catch (error) {
      next(error);
    }
  },

  // Suggérer des technologies
  suggestTechnologies: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Non authentifié',
        });
      }

      const developer = await require('../config/database').default.developerProfile.findFirst({
        where: { userId: req.user.userId },
      });

      if (!developer) {
        return res.status(404).json({
          success: false,
          message: 'Profil développeur non trouvé',
        });
      }

      const technologies = await aiService.suggestTechnologies(developer.id);

      res.status(200).json({
        success: true,
        data: technologies,
      });
    } catch (error) {
      next(error);
    }
  },
};
