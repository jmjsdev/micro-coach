import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.message
    });
  }

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.errors
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erreur serveur interne',
  });
};
