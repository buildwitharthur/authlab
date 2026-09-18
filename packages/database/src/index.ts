import { env } from '@authlab/env';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

export { Prisma, PrismaClient } from './generated/prisma/client.js';
export type * from './generated/prisma/models.js';

const globalForPrisma = globalThis as unknown as {
    authlabPrisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.authlabPrisma ??
    new PrismaClient({
        adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
    });

if (env.NODE_ENV !== 'production') {
    globalForPrisma.authlabPrisma = prisma;
}
