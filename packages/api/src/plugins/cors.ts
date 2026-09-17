import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

export const corsPlugin = (app: FastifyInstance) => {
  app.register(cors, {
    origin: true,
    credentials: true,
  });
};
