import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import ManagementSidebar from "@/components/workspace/ManagementSidebar";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/_manage",
)({
  beforeLoad: async ({ context: { session }, location }) => {
    // Management routes require authentication
    if (!session?.user?.rowId) {
      throw redirect({
        to: "/",
        search: { returnTo: location.href },
      });
    }
  },
  component: ManageWorkspaceLayout,
});

function ManageWorkspaceLayout() {
  return (
    <ManagementSidebar>
      <Outlet />
    </ManagementSidebar>
  );
}
