import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import OrganizationSettings from "@/components/organization/OrganizationSettings";
import { Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { membersOptions } from "@/lib/options/members";
import { organizationOptions } from "@/lib/options/organizations";
import { getPrices } from "@/server/functions/prices";
import { getSubscription } from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/_manage/settings",
)({
  loader: async ({
    context: { queryClient, subscriptionId, organizationId },
  }) => {
    const [prices, subscription] = await Promise.all([
      getPrices(),
      getSubscription({ data: { subscriptionId } }),
      queryClient.ensureQueryData(
        membersOptions({ organizationId, roles: [Role.Owner] }),
      ),
    ]);

    return { prices, subscription };
  },
  component: OrganizationSettingsPage,
});

function OrganizationSettingsPage() {
  const { organizationSlug } = Route.useParams();
  const { prices, subscription } = Route.useLoaderData();

  const { data: organization } = useQuery({
    ...organizationOptions({ slug: organizationSlug }),
    select: (data) => data?.organizationBySlug,
  });

  return (
    <Page
      header={{
        title: `${organization?.name} ${app.organizationSettingsPage.breadcrumb}`,
      }}
      pt={0}
    >
      <OrganizationSettings
        prices={prices as ExpandedProductPrice[]}
        organization={{
          ...organization!,
          subscription: {
            subscriptionStatus: subscription?.status ?? "canceled",
            toBeCanceled: !!subscription?.cancelAt,
            currentPeriodEnd: subscription?.currentPeriodEnd,
          },
        }}
      />
    </Page>
  );
}
