import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        HOST: z.string().min(1).default('0.0.0.0'),
        PORT: z.coerce.number().int().min(1).max(65_535).default(8080),
        DATABASE_URL: z.string().url().optional(),
        JWT_SECRET: z.string().min(1).default('auth-lab-development-secret'),
        COOKIE_SECRET: z.string().min(1).optional(),
        RESEND_API_KEY: z.string().min(1).optional(),
        EMAIL_FROM: z.string().min(1).default('AuthLab <onboarding@resend.dev>'),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});
