import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { isAdminOrOwner, isOwner } from "@/lib/permissions";

import type { IdpRole } from "@/lib/permissions";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout",
)({
  beforeLoad: async ({ context: { session }, params: { workspaceSlug } }) => {
    // workspaceSlug in the URL is actually the org slug from JWT claims
    // Resolve it to organizationId
    const orgFromSlug = session?.organizations?.find(
      (org) => org.slug === workspaceSlug,
    );

    if (!orgFromSlug) throw notFound();

    // For unauthenticated users, provide minimal context
    const isAuthenticated = !!session?.user?.rowId;

    // Role comes from JWT organization claims, not local DB
    // roles is an array, take the highest privilege role
    const roles = orgFromSlug.roles ?? [];
    const role: IdpRole | null = roles.includes("owner")
      ? "owner"
      : roles.includes("admin")
        ? "admin"
        : roles.includes("member")
          ? "member"
          : null;

    return {
      // Org name comes from JWT claims, not DB
      workspaceName: orgFromSlug.name ?? orgFromSlug.slug,
      organizationId: orgFromSlug.id,
      role,
      isOwner: isOwner(role),
      hasAdminPrivileges: isAdminOrOwner(role),
      isAuthenticated,
      // Pass session for Gatekeeper API calls
      session,
    };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  return <Outlet />;
}
