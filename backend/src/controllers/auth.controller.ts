import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth';

export const authController = {
  // Inscription développeur
  registerDeveloper: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      const result = await authService.registerDeveloper({
        email,
        password,
        firstName,
        lastName,
      });

      res.status(201).json({
        success: true,
        message: 'Compte développeur créé avec succès',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // Inscription entreprise
  registerCompany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name, type, description, location, website } = req.body;

      const result = await authService.registerCompany({
        email,
        password,
        name,
        type,
        description,
        location,
        website,
      });

      res.status(201).json({
        success: true,
        message: 'Compte entreprise créé avec succès',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // Connexion
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });

      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // Connexion avec Firebase
  firebaseLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idToken } = req.body;
      const result = await authService.verifyFirebaseToken(idToken);

      res.status(200).json({
        success: true,
        message: 'Connexion Firebase réussie',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // Inscription avec Firebase
  firebaseRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idToken, role, extraData } = req.body;
      const result = await authService.registerWithFirebase({ idToken, role, extraData });

      res.status(201).json({
        success: true,
        message: 'Inscription Firebase réussie',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: async (req: AuthRequest<any, any, any>, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Non authentifié',
        });
      }

      const user = await authService.getCurrentUser(req.user.userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
