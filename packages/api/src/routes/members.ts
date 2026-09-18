import { prisma } from '@authlab/database';

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

const memberSchema = z.object({
    id: z.string(),
    name: z.string(),
    memberNumber: z.number().int(),
    joinedAt: z.date(),
});

const listMembersResponseSchema = z.array(memberSchema).meta({
    example: [
        {
            id: 'b3f1c9de-6e2a-4c3a-9f9b-6b5e2b6a2f2e',
            name: 'Arthur Reis',
            memberNumber: 42,
            joinedAt: '2026-09-18T12:00:00.000Z',
        },
    ],
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

export const members: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/members',
        {
            schema: {
                tags: ['Members'],
                description:
                    'Lista os membros que optaram por aparecer no mural, ordenados pela numeração de associação. Requer sessão autenticada.',
                response: {
                    200: listMembersResponseSchema,
                    401: errorResponseSchema,
                },
                operationId: 'listMembers',
            },
            preHandler: [async (request) => await request.verifyAuth()],
        },
        async (_request, reply) => {
            const users = await prisma.user.findMany({
                where: { showWall: true },
                orderBy: { memberNumber: 'asc' },
                select: {
                    id: true,
                    name: true,
                    memberNumber: true,
                    joinedAt: true,
                },
            });

            return reply.code(200).send(users);
        },
    );
};
