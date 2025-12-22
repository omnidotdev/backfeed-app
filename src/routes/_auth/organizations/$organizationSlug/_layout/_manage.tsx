import { Outlet, createFileRoute } from "@tanstack/react-router";

import ManagementSidebar from "@/components/organization/ManagementSidebar";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/_manage",
)({
  component: ManageOrganizationLayout,
});

function ManageOrganizationLayout() {
  return (
    <ManagementSidebar>
      <Outlet />
    </ManagementSidebar>
  );
}
