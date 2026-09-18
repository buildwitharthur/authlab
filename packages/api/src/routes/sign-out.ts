import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { SESSION_COOKIE_NAME } from '@/plugins/jwt.js';

const signOutResponseSchema = z.null();

export const signOut: FastifyPluginAsyncZod = async (app) => {
    app.post(
        '/sign-out',
        {
            schema: {
                tags: ['Authentication'],
                description:
                    'Encerra a sessão do usuário, limpando o cookie de sessão.',
                response: {
                    200: signOutResponseSchema,
                },
                operationId: 'signOut',
            },
        },
        async (_request, reply) => {
            reply.clearCookie(SESSION_COOKIE_NAME, { path: '/' });

            return reply.code(200).send(null);
        },
    );
};
