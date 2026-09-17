import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_welcome/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/_welcome/"!</div>;
}
