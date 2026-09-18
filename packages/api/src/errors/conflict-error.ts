import { AppError } from '@/errors/app-error.js';

export class ConflictError extends AppError {
    constructor(message = 'Conflict') {
        super('CONFLICT', 409, message);
    }
}
