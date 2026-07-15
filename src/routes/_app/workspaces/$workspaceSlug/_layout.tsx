import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { isAdminOrOwner, isOwner } from "@/lib/permissions";
import {
  fetchOrganizationBySlug,
  getOrganizationBySlug,
} from "@/server/functions/organizations";

import type { IdpRole } from "@/lib/permissions";

export const Route = createFileRoute("/_app/workspaces/$workspaceSlug/_layout")(
  {
    beforeLoad: async ({ context: { session }, params: { workspaceSlug } }) => {
      const isAuthenticated = !!session;

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
          workspaceLogo: orgFromClaims.logo ?? null,
          organizationId: orgFromClaims.id,
          role,
          isOwner: isOwner(role),
          hasAdminPrivileges: isAdminOrOwner(role),
          isAuthenticated,
          session,
        };
      }

      // A just-created workspace is not yet in the JWT claims (they are hydrated
      // from a short-lived cache), so for authenticated users fall back to a
      // live authenticated Gatekeeper lookup before the public read. Lets the
      // owner land on the new workspace immediately, with privileges catching up
      // once claims refresh on the next load.
      if (isAuthenticated) {
        const authedOrg = await getOrganizationBySlug({
          data: { slug: workspaceSlug },
        });

        if (authedOrg) {
          return {
            workspaceName: authedOrg.name ?? authedOrg.slug,
            workspaceLogo: authedOrg.logo ?? null,
            organizationId: authedOrg.id,
            role: null,
            isOwner: false,
            hasAdminPrivileges: false,
            isAuthenticated,
            session,
          };
        }
      }

      // For unauthenticated users (or users not in this org), fetch from IDP
      const publicOrg = await fetchOrganizationBySlug({
        data: { slug: workspaceSlug },
      });

      if (!publicOrg) throw notFound();

      return {
        workspaceName: publicOrg.name ?? publicOrg.slug,
        workspaceLogo: publicOrg.logo ?? null,
        organizationId: publicOrg.id,
        role: null,
        isOwner: false,
        hasAdminPrivileges: false,
        isAuthenticated,
        session,
      };
    },
    component: WorkspaceLayout,
  },
);

function WorkspaceLayout() {
  return <Outlet />;
}
