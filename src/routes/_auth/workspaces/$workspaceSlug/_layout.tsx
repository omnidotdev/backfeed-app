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
  "/_auth/workspaces/$workspaceSlug/_layout",
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

    const { memberByUserIdAndWorkspaceId: member } =
      await queryClient.ensureQueryData({
        ...workspaceRoleOptions({
          userId: session?.user?.rowId!,
          workspaceId: workspaceByName.rowId,
        }),
        revalidateIfStale: true,
      });

    // Bypass tier limits for exempt workspaces
    const isBillingExempt = billingBypassSlugs.includes(workspaceSlug);

    return {
      workspaceId: workspaceByName.rowId,
      workspaceName: workspaceByName.name,
      role: member?.role,
      subscriptionId: workspaceByName.subscriptionId,
      isOwner: member?.role === Role.Owner,
      membershipId: member?.rowId,
      hasAdminPrivileges:
        member?.role === Role.Admin || member?.role === Role.Owner,
      hasBasicTierPrivileges:
        isBillingExempt || workspaceByName.tier !== Tier.Free,
      hasTeamTierPrivileges:
        isBillingExempt ||
        ![Tier.Free, Tier.Basic].includes(workspaceByName.tier),
    };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  return <Outlet />;
}
