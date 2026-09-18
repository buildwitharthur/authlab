import { AppError } from '@/errors/app-error.js';

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super('NOT_FOUND', 404, message);
    }
}
