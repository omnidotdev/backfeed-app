import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { Role, Tier } from "@/generated/graphql";
import {
  workspaceOptions,
  workspaceRoleOptions,
} from "@/lib/options/workspaces";

const billingBypassSlugs: string[] =
  import.meta.env.VITE_BILLING_BYPASS_SLUGS?.split(",")
    .map((s: string) => s.trim())
    .filter(Boolean) ?? [];

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout",
)({
  beforeLoad: async ({
    context: { queryClient, session },
    params: { workspaceSlug },
  }) => {
    const { workspaceByName } = await queryClient.ensureQueryData({
      ...workspaceOptions({ name: workspaceSlug }),
      revalidateIfStale: true,
    });

    if (!workspaceByName) throw notFound();

    // For unauthenticated users, provide minimal context
    const isAuthenticated = !!session?.user?.rowId;

    let member = null;
    if (isAuthenticated) {
      const { memberByUserIdAndWorkspaceId } =
        await queryClient.ensureQueryData({
          ...workspaceRoleOptions({
            userId: session.user.rowId!,
            workspaceId: workspaceByName.rowId,
          }),
          revalidateIfStale: true,
        });
      member = memberByUserIdAndWorkspaceId;
    }

    // Bypass tier limits for exempt workspaces
    const isBillingExempt = billingBypassSlugs.includes(workspaceSlug);

    return {
      workspaceId: workspaceByName.rowId,
      workspaceName: workspaceByName.name,
      role: member?.role ?? null,
      subscriptionId: workspaceByName.subscriptionId,
      isOwner: member?.role === Role.Owner,
      membershipId: member?.rowId ?? null,
      hasAdminPrivileges:
        member?.role === Role.Admin || member?.role === Role.Owner,
      hasBasicTierPrivileges:
        isBillingExempt || workspaceByName.tier !== Tier.Free,
      hasTeamTierPrivileges:
        isBillingExempt ||
        ![Tier.Free, Tier.Basic].includes(workspaceByName.tier),
      isAuthenticated,
    };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  return <Outlet />;
}
