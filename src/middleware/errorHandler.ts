import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('[ERROR]', {
        name: err.name,
        message: err.message,
        path: req.path,
        method: req.method,
    });

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                details: (err as any).details || null,
            },
        });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    return res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: isProduction ? 'Internal server error' : err.message,
            ...(isProduction ? {} : { stack: err.stack }),
        },
    });
};
