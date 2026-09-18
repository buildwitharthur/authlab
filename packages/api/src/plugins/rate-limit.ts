import { TooManyRequestsError } from '@/errors/too-many-requests-error.js';
import rateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';

export const rateLimitPlugin = (app: FastifyInstance) => {
    app.register(rateLimit, {
        global: true,
        max: 100,
        timeWindow: '1 minute',
        errorResponseBuilder: () => new TooManyRequestsError(),
    });
};
