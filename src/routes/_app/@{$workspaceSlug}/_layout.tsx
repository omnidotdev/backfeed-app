import { publicWorkspaceLinks } from "@omnidotdev/providers/workspace-links";
import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { isAdminOrOwner, isOwner } from "@/lib/permissions";
import {
  fetchOrganizationBySlug,
  fetchOrganizationMemberRoles,
  getOrganizationBySlug,
} from "@/server/functions/organizations";

import type { IdpRole } from "@/lib/permissions";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/_layout")({
  beforeLoad: async ({ context: { session }, params: { workspaceSlug } }) => {
    const isAuthenticated = !!session;
    // The IDP user id; equals a Gatekeeper member row's `userId`.
    const userIdpId = session?.user?.identityProviderId;

    // Resolve the workspace: prefer the JWT claim (carries name/logo/links and
    // the caller's role), then a live authenticated lookup (e.g. a just-created
    // workspace not yet in the claim), then an unauthenticated public read.
    const orgFromClaims = session?.organizations?.find(
      (org) => org.slug === workspaceSlug,
    );

    let org:
      | {
          id: string;
          name?: string | null;
          slug: string;
          logo?: string | null;
        }
      | null
      | undefined = orgFromClaims;

    // Role from the claim (highest privilege), when present.
    let role: IdpRole | null = null;
    if (orgFromClaims) {
      const roles = orgFromClaims.roles ?? [];
      role = roles.includes("owner")
        ? "owner"
        : roles.includes("admin")
          ? "admin"
          : roles.includes("member")
            ? "member"
            : null;
    }

    if (!org && isAuthenticated) {
      org = await getOrganizationBySlug({ data: { slug: workspaceSlug } });
    }
    if (!org) {
      org = await fetchOrganizationBySlug({ data: { slug: workspaceSlug } });
    }
    if (!org) throw notFound();

    // The JWT claim can lag or be missing the workspace entirely (a just-granted
    // role, claim truncation, or a degraded session with no org claims), which
    // would wrongly hide owner/admin controls. When the claim doesn't already
    // confer privileges, confirm the caller's role live via the service-token
    // member lookup so owners/admins are never locked out of their own
    // workspace. Skipped for anonymous visitors and already-privileged users.
    if (isAuthenticated && userIdpId && !isAdminOrOwner(role)) {
      const { data: privilegedRoles } = await fetchOrganizationMemberRoles({
        data: { organizationId: org.id },
      });
      const mine = privilegedRoles.find(
        (member) => member.userId === userIdpId,
      );
      if (mine) role = mine.role as IdpRole;
    }

    return {
      workspaceName: org.name ?? org.slug,
      workspaceLogo: org.logo ?? null,
      workspaceLinks: publicWorkspaceLinks((org as { links?: unknown }).links),
      organizationId: org.id,
      role,
      isOwner: isOwner(role),
      hasAdminPrivileges: isAdminOrOwner(role),
      isAuthenticated,
      session,
    };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  return <Outlet />;
}
