import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_manage",
)({
  component: ManageOrganizationLayout,
});

function ManageOrganizationLayout() {
  return <Outlet />;
}
