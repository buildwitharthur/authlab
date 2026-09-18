import { verify } from '@node-rs/argon2';
import { prisma } from '@authlab/database';

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { env } from '@authlab/env';

import { UnauthorizedError } from '@/errors/unauthorized-error.js';

const signInBodySchema = z
    .object({
        email: z.string().trim().toLowerCase().email(),
        password: z.string().min(1),
    })
    .meta({
        example: {
            email: 'arthur@example.com',
            password: 'senha-forte-123',
        },
    });

const signInResponseSchema = z.null();

const errorResponseSchema = z
    .object({
        error: z.string(),
        message: z.string(),
        statusCode: z.number().int(),
    })
    .meta({
        example: {
            error: 'UNAUTHORIZED',
            message: 'Invalid email or password',
            statusCode: 401,
        },
    });

export const signIn: FastifyPluginAsyncZod = async (app) => {
    app.post(
        '/sign-in',
        {
            schema: {
                tags: ['Authentication'],
                description:
                    'Autentica um usuário com e-mail e senha e emite uma sessão via cookie httpOnly contendo um JWT.',
                body: signInBodySchema,
                response: {
                    200: signInResponseSchema,
                    401: errorResponseSchema,
                },
                operationId: 'signIn',
            },
        },
        async (request, reply) => {
            const { email, password } = request.body;

            const user = await prisma.user.findUnique({ where: { email } });
            const passwordMatches = user ? await verify(user.passwordHash, password) : false;

            if (!user || !passwordMatches) throw new UnauthorizedError('Invalid email or password');

            const token = await reply.jwtSign({ sub: user.id }, { expiresIn: '7d' });

            reply.setCookie('auth-lab-session', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            return reply.code(200).send(null);
        },
    );
};
