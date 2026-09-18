import { UnauthorizedError } from '@/errors/index.js';
import { prisma } from '@authlab/database';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: {
            sub: string;
        };
    }
}

declare module 'fastify' {
    interface FastifyRequest {
        userId: string | null;
        verifyAuth: () => Promise<void>;
    }
}

export const authPlugin = fp(async (app: FastifyInstance) => {
    app.decorateRequest('userId', null);

    app.decorateRequest('verifyAuth', async function verifyAuth() {
        let payload: { sub: string };

        try {
            payload = await this.jwtVerify();
        } catch {
            throw new UnauthorizedError();
        }

        const user = await prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });

        if (!user) throw new UnauthorizedError();

        this.userId = user.id;
    });
});
