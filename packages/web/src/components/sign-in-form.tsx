import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInSchema, type SignInValues } from "../schemas/sign-in";
import { Button } from "./ui/button";
import { FormField } from "./ui/form-field";

interface SignInFormProps {
  onSubmit: (values: SignInValues) => void | Promise<void>;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function submit(values: SignInValues) {
    try {
      await onSubmit(values);
    } catch {
      toast.error("Não foi possível entrar. Tente novamente.");
    }
  }

  return (
    <form
      noValidate
      aria-label="Entrar na sua conta"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit(submit)}
      className="grid gap-4.5"
    >
      <FormField
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        autoCapitalize="none"
        spellCheck={false}
        required
        disabled={isSubmitting}
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        label="Senha"
        type="password"
        autoComplete="current-password"
        placeholder="Sua senha"
        required
        disabled={isSubmitting}
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
