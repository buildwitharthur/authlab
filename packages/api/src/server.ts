import Fastify from "fastify";
import { env } from "./lib/env.js";
import { cookiePlugin } from "./plugins/cookie.js";
import { corsPlugin } from "./plugins/cors.js";
import { jwtPlugin } from "./plugins/jwt.js";
import { rateLimitPlugin } from "./plugins/rate-limit.js";
import { scalarPlugin } from "./plugins/scalar.js";
import { swaggerPlugin } from "./plugins/swagger.js";

const app = Fastify({
  logger: true,
});

corsPlugin(app);
rateLimitPlugin(app);
cookiePlugin(app);
jwtPlugin(app);
swaggerPlugin(app);
scalarPlugin(app);

app.get("/health", () => ({ status: "ok" }));

try {
  await app.listen({ port: env.PORT, host: env.HOST });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
