import jwt from '@fastify/jwt';
import type { FastifyInstance } from 'fastify';

import { env } from '@authlab/env';

export const jwtPlugin = (app: FastifyInstance) => {
    app.register(jwt, {
        secret: env.JWT_SECRET,
    });
};
