export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Ressource non trouvée') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Requête invalide') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Non autorisé') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Accès refusé') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflit de ressources') {
    super(message, 409);
  }
}

export class ValidationError extends AppError {
  public errors: any;

  constructor(message: string = 'Erreur de validation', errors?: any) {
    super(message, 400);
    this.errors = errors;
  }
}
