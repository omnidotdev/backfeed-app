import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/organizations/$organizationSlug/")(
  {
    component: OrganizationPage,
  },
);

function OrganizationPage() {
  return <div>Hello "/_auth/organizations/$organizationSlug/"!</div>;
}
