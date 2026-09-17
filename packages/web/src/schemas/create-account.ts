import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
  showOnWall: z.boolean(),
});

export type CreateAccountValues = z.infer<typeof createAccountSchema>;
