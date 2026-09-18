import { AppError } from '@/errors/app-error.js';

export class UnprocessableEntityError extends AppError {
    constructor(message = 'Unprocessable entity') {
        super('UNPROCESSABLE_ENTITY', 422, message);
    }
}
