import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/create-account/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/create-account/"!</div>;
}
