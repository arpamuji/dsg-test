import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
    constructor(public statusCode: number, public code: string, message: string, public details?: any) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends ApiError {
    constructor(resource: string, id: string) {
        super(StatusCodes.NOT_FOUND, 'NOT_FOUND', `${resource} with ID '${id}' not found`);
    }
}

export class ValidationError extends ApiError {
    constructor(message: string, details?: any[]) {
        super(StatusCodes.BAD_REQUEST, 'VALIDATION_ERROR', message, details);
    }
}
