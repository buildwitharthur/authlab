import Fastify from "fastify";
import { env } from "@authlab/env";
import { cookiePlugin } from "@/plugins/cookie.js";
import { corsPlugin } from "@/plugins/cors.js";
import { errorHandlerPlugin } from "@/plugins/error-handler.js";
import { jwtPlugin } from "@/plugins/jwt.js";
import { rateLimitPlugin } from "@/plugins/rate-limit.js";
import { scalarPlugin } from "@/plugins/scalar.js";
import { swaggerPlugin } from "@/plugins/swagger.js";

const app = Fastify({
  logger: true,
}).withTypeProvider();

errorHandlerPlugin(app);
corsPlugin(app);
rateLimitPlugin(app);
cookiePlugin(app);
jwtPlugin(app);
swaggerPlugin(app);
scalarPlugin(app);

app.get("/health", () => ({ status: "ok" }));

await app.listen({ port: env.PORT, host: env.HOST });
