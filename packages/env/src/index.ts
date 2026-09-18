import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'),
        HOST: z.string().min(1, 'HOST must not be empty').default('0.0.0.0'),
        PORT: z.coerce
            .number()
            .int('PORT must be an integer')
            .min(1, 'PORT must be between 1 and 65535')
            .max(65_535, 'PORT must be between 1 and 65535')
            .default(8080),
        DATABASE_URL: z
            .string()
            .url('DATABASE_URL must be a valid connection URL'),
        JWT_SECRET: z
            .string()
            .min(1, 'JWT_SECRET must not be empty')
            .default('auth-lab-development-secret'),
        COOKIE_SECRET: z
            .string()
            .min(1, 'COOKIE_SECRET must not be empty')
            .optional(),
        RESEND_API_KEY: z
            .string()
            .min(1, 'RESEND_API_KEY must not be empty')
            .optional(),
        EMAIL_FROM: z
            .string()
            .min(1, 'EMAIL_FROM must not be empty')
            .default('AuthLab <authlab@buildwitharthur.com.br>'),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});
