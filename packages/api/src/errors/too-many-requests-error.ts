import { AppError } from '@/errors/app-error.js';

export class TooManyRequestsError extends AppError {
    constructor(message = 'Too many requests') {
        super('TOO_MANY_REQUESTS', 429, message);
    }
}
