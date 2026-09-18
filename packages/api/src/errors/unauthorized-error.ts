import { AppError } from '@/errors/app-error.js';

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super('UNAUTHORIZED', 401, message);
    }
}
