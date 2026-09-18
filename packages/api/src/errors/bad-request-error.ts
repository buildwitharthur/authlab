import { AppError } from '@/errors/app-error.js';

export class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super('BAD_REQUEST', 400, message);
    }
}
