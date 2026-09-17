import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
