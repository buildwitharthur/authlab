import { prisma } from '@authlab/database';

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

const membersCountResponseSchema = z
    .object({
        count: z.number().int(),
    })
    .meta({
        example: {
            count: 42,
        },
    });

export const membersCount: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/members/count',
        {
            schema: {
                tags: ['Members'],
                description:
                    'Retorna o total de contas cadastradas no AuthLab. Pública, usada na página de autenticação.',
                response: {
                    200: membersCountResponseSchema,
                },
                operationId: 'getMembersCount',
            },
        },
        async (_request, reply) => {
            const count = await prisma.user.count();

            return reply.code(200).send({ count });
        },
    );
};
