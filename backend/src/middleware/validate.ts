import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from '../utils/errors';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors = errors.array().reduce((acc, error) => {
      if ('path' in error) {
        acc[error.path] = error.msg;
      }
      return acc;
    }, {} as Record<string, string>);

    return next(new ValidationError('Erreur de validation', formattedErrors));
  };
};
