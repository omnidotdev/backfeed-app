import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { Role, Tier } from "@/generated/graphql";
import {
  workspaceOptions,
  workspaceRoleOptions,
} from "@/lib/options/workspaces";

const billingBypassOrgIds: string[] =
  import.meta.env.VITE_BILLING_BYPASS_ORG_IDS?.split(",")
    .map((s: string) => s.trim())
    .filter(Boolean) ?? [];

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout",
)({
  beforeLoad: async ({
    context: { queryClient, session },
    params: { workspaceSlug },
  }) => {
    // workspaceSlug in the URL is actually the org slug from JWT claims
    // Resolve it to organizationId to query the workspace
    const orgFromSlug = session?.organizations?.find(
      (org) => org.slug === workspaceSlug,
    );

    if (!orgFromSlug) throw notFound();

    const { workspaceByOrganizationId } = await queryClient.ensureQueryData({
      ...workspaceOptions({ organizationId: orgFromSlug.id }),
      revalidateIfStale: true,
    });

    if (!workspaceByOrganizationId) throw notFound();

    // Alias for backwards compatibility in the rest of the function
    const workspace = workspaceByOrganizationId;

    // For unauthenticated users, provide minimal context
    const isAuthenticated = !!session?.user?.rowId;

    let member = null;
    if (isAuthenticated) {
      const { memberByUserIdAndWorkspaceId } =
        await queryClient.ensureQueryData({
          ...workspaceRoleOptions({
            userId: session.user.rowId!,
            workspaceId: workspace.rowId,
          }),
          revalidateIfStale: true,
        });
      member = memberByUserIdAndWorkspaceId;
    }

    // Bypass tier limits for exempt workspaces
    const isBillingExempt = billingBypassOrgIds.includes(orgFromSlug.id);

    return {
      workspaceId: workspace.rowId,
      // Org name comes from JWT claims, not DB
      workspaceName: orgFromSlug.name ?? orgFromSlug.slug,
      organizationId: orgFromSlug.id,
      role: member?.role ?? null,
      subscriptionId: workspace.subscriptionId,
      isOwner: member?.role === Role.Owner,
      membershipId: member?.rowId ?? null,
      hasAdminPrivileges:
        member?.role === Role.Admin || member?.role === Role.Owner,
      hasBasicTierPrivileges: isBillingExempt || workspace.tier !== Tier.Free,
      hasTeamTierPrivileges:
        isBillingExempt || ![Tier.Free, Tier.Basic].includes(workspace.tier),
      isAuthenticated,
    };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  return <Outlet />;
}
