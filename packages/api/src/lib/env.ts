import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  HOST: z.string().min(1).default("0.0.0.0"),
  PORT: z.coerce.number().int().positive().default(8080),
  JWT_SECRET: z.string().min(1).default("auth-lab-development-secret"),
  COOKIE_SECRET: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
