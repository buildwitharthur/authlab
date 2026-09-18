import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createAccount: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/create-account",
    {
      schema: {
        tags: ["Authentication"],
        description: "",
        body: z.object({ name: z.string() }),
        response: {
          200: z.object({ name: z.string() }),
        },
        operationId: "createAccount",
      },
    },
    async (request, reply) => {
      const { name } = request.body;
      return reply.code(200).send({ name });
    },
  );
};
