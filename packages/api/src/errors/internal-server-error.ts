import { AppError } from '@/errors/app-error.js';

export class InternalServerError extends AppError {
    constructor(message = 'Internal server error') {
        super('INTERNAL_SERVER_ERROR', 500, message);
    }
}
