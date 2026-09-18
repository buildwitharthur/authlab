import jwt from '@fastify/jwt';
import type { FastifyInstance } from 'fastify';

import { env } from '@authlab/env';

export const SESSION_COOKIE_NAME = 'auth-lab-session';

export const jwtPlugin = (app: FastifyInstance) => {
    app.register(jwt, {
        secret: env.JWT_SECRET,
        cookie: {
            cookieName: SESSION_COOKIE_NAME,
            signed: false,
        },
    });
};
