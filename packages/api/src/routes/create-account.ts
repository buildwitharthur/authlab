import { hash } from '@node-rs/argon2';
import { prisma } from '@authlab/database';

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { ConflictError } from '@/errors/conflict-error.js';

import { sendEmail } from '@authlab/email';

const createAccountBodySchema = z
    .object({
        name: z.string().trim().min(1),
        email: z.string().trim().toLowerCase().email(),
        password: z.string().min(8),
        showOnWall: z.boolean(),
    })
    .meta({
        example: {
            name: 'Arthur Reis',
            email: 'arthur@example.com',
            password: 'senha-forte-123',
            showOnWall: true,
        },
    });

const createAccountResponseSchema = z.null();

const errorResponseSchema = z
    .object({
        error: z.string(),
        message: z.string(),
        statusCode: z.number().int(),
    })
    .meta({
        example: {
            error: 'CONFLICT',
            message: 'E-mail already registered',
            statusCode: 409,
        },
    });

export const createAccount: FastifyPluginAsyncZod = async (app) => {
    app.post(
        '/create-account',
        {
            schema: {
                tags: ['Auth'],
                description:
                    'Registers a new account and sends a welcome email.',
                body: createAccountBodySchema,
                response: {
                    201: createAccountResponseSchema,
                    409: errorResponseSchema,
                },
                operationId: 'createAccount',
            },
        },
        async (request, reply) => {
            const { name, email, password, showOnWall } = request.body;
            const passwordHash = await hash(password);

            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser)
                throw new ConflictError('E-mail already registered');

            const user = await prisma.user.create({
                data: { name, email, passwordHash, showWall: showOnWall },
            });

            const welcomeEmailText = `Olá, ${name}!

Sua conta foi criada com sucesso.

Obrigado por fazer parte do AuthLab.

Mais do que criar uma conta, você acabou de fazer parte desse movimento.

Você agora faz parte disso.

Seu número no AuthLab: #${user.memberNumber}

Espero que goste da experiência.

— Arthur Reis

AuthLab
Built by Arthur Reis · ArthurLabs`;

            await sendEmail({
                from: 'AuthLab <authlab@buildwitharthur.com.br>',
                to: email,
                subject: 'Bem-vindo ao AuthLab',
                text: welcomeEmailText,
            });

            return reply.code(201).send(null);
        },
    );
};
