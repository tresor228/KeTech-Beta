import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Erreur Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Cette ressource existe déjà',
        error: err.meta,
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Ressource non trouvée',
      });
    }
  }

  // Erreur Prisma Validation
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation des données',
      error: err.message,
    });
  }

  // Erreur personnalisée
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err instanceof Error && 'errors' in err ? { errors: (err as any).errors } : {}),
    });
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token invalide',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expiré',
    });
  }

  // Erreur inconnue
  console.error('Erreur:', err);
  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Une erreur interne est survenue' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
