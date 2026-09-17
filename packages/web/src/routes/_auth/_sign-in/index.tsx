import { createFileRoute } from "@tanstack/react-router";
import { createRouteMetadata } from "../../../lib/route-metadata";

export const Route = createFileRoute("/_auth/_sign-in/")({
  head: () =>
    createRouteMetadata({
      title: "Entrar | AuthLab",
      description:
        "Entre na sua conta AuthLab e acesse seu perfil e o mural de membros.",
    }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
