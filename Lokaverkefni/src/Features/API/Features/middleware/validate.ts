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


export const validateQuery = (schema: z.ZodSchema) => {
  return (request: Request, _response: Response, next: NextFunction) => {
    try {
      const queryData: any = {};

      for (const [key, value] of Object.entries(request.query)) {
        if (value !== undefined) {
          if (typeof value === 'string' && !isNaN(Number(value))) {
            queryData[key] = Number(value);
          } else {
            queryData[key] = value;
          };
        };
      };

      schema.parse(queryData);
      next();
    } catch (error) {
      next(error);
    };
  };
};