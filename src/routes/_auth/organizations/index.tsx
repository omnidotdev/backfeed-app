import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/organizations/")({
  component: OrganizationsPage,
});

function OrganizationsPage() {
  return <div>Hello "/_auth/organizations/"!</div>;
}
