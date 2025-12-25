import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { Role, Tier } from "@/generated/graphql";
import {
  organizationOptions,
  organizationRoleOptions,
} from "@/lib/options/organizations";

const billingBypassSlugs: string[] =
  import.meta.env.VITE_BILLING_BYPASS_SLUGS?.split(",")
    .map((s: string) => s.trim())
    .filter(Boolean) ?? [];

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout",
)({
  beforeLoad: async ({
    context: { queryClient, session },
    params: { organizationSlug },
  }) => {
    const { organizationBySlug } = await queryClient.ensureQueryData({
      ...organizationOptions({ slug: organizationSlug }),
      revalidateIfStale: true,
    });

    if (!organizationBySlug) throw notFound();

    const { memberByUserIdAndOrganizationId: member } =
      await queryClient.ensureQueryData({
        ...organizationRoleOptions({
          userId: session?.user?.rowId!,
          organizationId: organizationBySlug.rowId,
        }),
        revalidateIfStale: true,
      });

    // Bypass tier limits for exempt organizations
    const isBillingExempt = billingBypassSlugs.includes(organizationSlug);

    return {
      organizationId: organizationBySlug.rowId,
      organizationName: organizationBySlug.name,
      role: member?.role,
      subscriptionId: organizationBySlug.subscriptionId,
      isOwner: member?.role === Role.Owner,
      membershipId: member?.rowId,
      hasAdminPrivileges:
        member?.role === Role.Admin || member?.role === Role.Owner,
      hasBasicTierPrivileges:
        isBillingExempt || organizationBySlug.tier !== Tier.Free,
      hasTeamTierPrivileges:
        isBillingExempt ||
        ![Tier.Free, Tier.Basic].includes(organizationBySlug.tier),
    };
  },
  component: OrganizationLayout,
});

function OrganizationLayout() {
  return <Outlet />;
}
