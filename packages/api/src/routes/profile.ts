import { prisma } from '@authlab/database';

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { UnauthorizedError } from '@/errors/unauthorized-error.js';

const profileResponseSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        memberNumber: z.number().int(),
        joinedAt: z.date(),
        showWall: z.boolean(),
    })
    .meta({
        example: {
            id: 'b3f1c9de-6e2a-4c3a-9f9b-6b5e2b6a2f2e',
            name: 'Arthur Reis',
            email: 'arthur@example.com',
            memberNumber: 42,
            joinedAt: '2026-09-18T12:00:00.000Z',
            showWall: true,
        },
    });

const errorResponseSchema = z
    .object({
        error: z.string(),
        message: z.string(),
        statusCode: z.number().int(),
    })
    .meta({
        example: {
            error: 'UNAUTHORIZED',
            message: 'Unauthorized',
            statusCode: 401,
        },
    });

export const profile: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/profile',
        {
            schema: {
                tags: ['Members'],
                description: 'Returns the signed-in user\'s profile.',
                response: {
                    200: profileResponseSchema,
                    401: errorResponseSchema,
                },
                security: [{ cookieAuth: [] }],
                operationId: 'profile',
            },
            preHandler: [async (request) => await request.verifyAuth()],
        },
        async (request, reply) => {
            const user = await prisma.user.findUnique({
                where: { id: request.userId! },
            });

            if (!user) throw new UnauthorizedError();

            return reply.code(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                memberNumber: user.memberNumber,
                joinedAt: user.joinedAt,
                showWall: user.showWall,
            });
        },
    );
};
