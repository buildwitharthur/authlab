import jwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

import { env } from "@/lib/env.js";

export const jwtPlugin = (app: FastifyInstance) => {
  app.register(jwt, {
    secret: env.JWT_SECRET,
  });
};
