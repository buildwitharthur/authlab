import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { CreateAccountForm } from "../../../components/create-account-form";
import { Accent, Heading, Text } from "../../../components/ui/typography";
import { createRouteMetadata } from "../../../lib/route-metadata";

export const Route = createFileRoute("/_auth/create-account/")({
  head: () =>
    createRouteMetadata({
      title: "Criar conta | AuthLab",
      description:
        "Crie sua conta no AuthLab, receba as boas-vindas e escolha fazer parte do mural.",
    }),
  component: CreateAccountPage,
});

function CreateAccountPage() {
  function handleCreateAccount() {
    // Conectar ao endpoint de cadastro quando estiver disponível.
    toast.info(
      "O cadastro ainda não está disponível. Tente novamente em breve.",
    );
  }

  return (
    <section aria-labelledby="create-account-heading" className="grid gap-6">
      <div className="grid gap-2">
        <Heading
          as="h2"
          id="create-account-heading"
          size="sm"
          className="text-[28px] tracking-[-0.05em]"
        >
          Crie sua conta<Accent>.</Accent>
        </Heading>
        <Text size="sm" tone="muted" className="text-[13px]">
          Leva menos de um minuto.
        </Text>
      </div>
      <CreateAccountForm onSubmit={handleCreateAccount} />
    </section>
  );
}
