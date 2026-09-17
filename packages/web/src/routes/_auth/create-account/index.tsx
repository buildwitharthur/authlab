import { createFileRoute } from "@tanstack/react-router";
import { createRouteMetadata } from "../../../lib/route-metadata";

export const Route = createFileRoute("/_auth/create-account/")({
  head: () =>
    createRouteMetadata({
      title: "Criar conta | AuthLab",
      description:
        "Crie sua conta no AuthLab, receba as boas-vindas e escolha fazer parte do mural.",
    }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/create-account/"!</div>;
}
