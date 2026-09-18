import { AppError } from '@/errors/app-error.js';

export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super('FORBIDDEN', 403, message);
    }
}
