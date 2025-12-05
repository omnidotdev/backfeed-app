import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { Role, Tier } from "@/generated/graphql";
import {
  organizationMetricsOptions,
  organizationOptions,
  organizationRoleOptions,
} from "@/lib/options/organizations";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout",
)({
  beforeLoad: async ({
    context: { queryClient, session },
    params: { organizationSlug },
  }) => {
    const { organizationBySlug } = await queryClient.ensureQueryData(
      organizationOptions({ slug: organizationSlug }),
    );

    if (!organizationBySlug) throw notFound();

    const [{ memberByUserIdAndOrganizationId: member }] = await Promise.all([
      queryClient.ensureQueryData(
        organizationRoleOptions({
          userId: session?.user?.rowId!,
          organizationId: organizationBySlug.rowId,
        }),
      ),
      queryClient.ensureQueryData(
        organizationMetricsOptions({
          organizationId: organizationBySlug.rowId,
        }),
      ),
    ]);

    return {
      organizationId: organizationBySlug.rowId,
      hasAdminPrivileges:
        member?.role === Role.Admin || member?.role === Role.Owner,
      hasBasicTierPrivileges: organizationBySlug.tier !== Tier.Free,
      hasTeamTierPrivileges: ![Tier.Free, Tier.Basic].includes(
        organizationBySlug.tier,
      ),
    };
  },
  component: OrganizationLayout,
});

function OrganizationLayout() {
  return <Outlet />;
}
