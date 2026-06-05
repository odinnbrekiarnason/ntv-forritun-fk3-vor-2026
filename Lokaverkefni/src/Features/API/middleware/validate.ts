import z from 'zod'
import type {Request, Response, NextFunction} from 'express'

export const validate = (schema: z.ZodSchema) => {
  return (request: Request, _response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
