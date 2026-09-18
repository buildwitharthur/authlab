import { fastify } from "fastify";
import { env } from "@authlab/env";
import { cookiePlugin } from "@/plugins/cookie.js";
import { corsPlugin } from "@/plugins/cors.js";
import { errorHandlerPlugin } from "@/plugins/error-handler.js";
import { jwtPlugin } from "@/plugins/jwt.js";
import { rateLimitPlugin } from "@/plugins/rate-limit.js";
import { scalarPlugin } from "@/plugins/scalar.js";
import { swaggerPlugin } from "@/plugins/swagger.js";
import { createAccount } from "@/routes/create-account.js";
import { signIn } from "@/routes/sign-in.js";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

export const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

errorHandlerPlugin(app);
corsPlugin(app);
rateLimitPlugin(app);
cookiePlugin(app);
jwtPlugin(app);
swaggerPlugin(app);
scalarPlugin(app);

app.get("/health", () => ({ status: "ok" }));

app.register(createAccount);
app.register(signIn);

app.listen({ port: env.PORT, host: env.HOST });
