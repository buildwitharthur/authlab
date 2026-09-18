import cookie from '@fastify/cookie';
import type { FastifyInstance } from 'fastify';

import { env } from '@authlab/env';

export const cookiePlugin = (app: FastifyInstance) => {
    app.register(cookie, {
        secret: env.COOKIE_SECRET,

        parseOptions: {
            httpOnly: true,
            sameSite: 'lax',
            secure: env.NODE_ENV === 'production',
            path: '/',
        },
    });
};
