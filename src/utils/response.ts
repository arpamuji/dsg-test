import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export type ApiSuccessResponse<T> = {
    success: true;
    data: T;
    message?: string;
};

export function success<T>(res: Response, data: T, message?: string): Response {
    return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message,
    } as ApiSuccessResponse<T>);
}
