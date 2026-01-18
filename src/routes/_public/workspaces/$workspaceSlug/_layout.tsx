import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { isAdminOrOwner, isOwner } from "@/lib/permissions";
import { fetchOrganizationBySlug } from "@/server/functions/organization";

import type { IdpRole } from "@/lib/permissions";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout",
)({
  beforeLoad: async ({ context: { session }, params: { workspaceSlug } }) => {
    const isAuthenticated = !!session?.user?.rowId;

    // For authenticated users, resolve org from JWT claims
    const orgFromClaims = session?.organizations?.find(
      (org) => org.slug === workspaceSlug,
    );

    if (orgFromClaims) {
      // Role comes from JWT organization claims
      // roles is an array, take the highest privilege role
      const roles = orgFromClaims.roles ?? [];
      const role: IdpRole | null = roles.includes("owner")
        ? "owner"
        : roles.includes("admin")
          ? "admin"
          : roles.includes("member")
            ? "member"
            : null;

      return {
        workspaceName: orgFromClaims.name ?? orgFromClaims.slug,
        organizationId: orgFromClaims.id,
        role,
        isOwner: isOwner(role),
        hasAdminPrivileges: isAdminOrOwner(role),
        isAuthenticated,
        session,
      };
    }

    // For unauthenticated users (or users not in this org), fetch from IDP
    const publicOrg = await fetchOrganizationBySlug({
      data: { slug: workspaceSlug },
    });

    if (!publicOrg) throw notFound();

    return {
      workspaceName: publicOrg.name ?? publicOrg.slug,
      organizationId: publicOrg.id,
      role: null,
      isOwner: false,
      hasAdminPrivileges: false,
      isAuthenticated,
      session,
    };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  return <Outlet />;
}
