import z from 'zod'
import type { Response } from 'express'

export const errorHandler = (
  error: any,
  response: Response,
) => {
  if (error instanceof z.ZodError) {
    const details = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return response.status(400).json({
      success: false,
      error: 'Validation failed',
      details,
    });
  } 

  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  response.status(status).json({
    success: false,
    error: message,
  });
};