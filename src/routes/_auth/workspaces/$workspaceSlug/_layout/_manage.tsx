import { Outlet, createFileRoute } from "@tanstack/react-router";

import ManagementSidebar from "@/components/workspace/ManagementSidebar";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/_layout/_manage",
)({
  component: ManageWorkspaceLayout,
});

function ManageWorkspaceLayout() {
  return (
    <ManagementSidebar>
      <Outlet />
    </ManagementSidebar>
  );
}
