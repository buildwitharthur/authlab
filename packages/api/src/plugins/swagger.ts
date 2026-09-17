import swagger from "@fastify/swagger";
import type { FastifyInstance } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerPlugin = (app: FastifyInstance) => {
  app.register(swagger, {
    openapi: {
      info: {
        title: "Auth Lab API",
        description: "API documentation for Auth Lab",
        version: "1.0.0",
      },
    },

    transform: jsonSchemaTransform,
  });

  app.get("/openapi.json", () => app.swagger());
};
