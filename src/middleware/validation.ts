import { z, ZodError } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/apiError';

type Target = 'body' | 'params' | 'query';

export function validate<T extends z.ZodType>(schema: T, target: Target = 'body') {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[target]);

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));

                next(new ValidationError('Validation Failed', errorMessages));
            } else {
                next(error);
            }
        }
    };
}
