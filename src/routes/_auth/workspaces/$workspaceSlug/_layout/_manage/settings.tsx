import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import WorkspaceSettings from "@/components/workspace/WorkspaceSettings";
import { Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { membersOptions } from "@/lib/options/members";
import { workspaceOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";
import { getPrices } from "@/server/functions/prices";
import { getSubscription } from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/_layout/_manage/settings",
)({
  loader: async ({
    context: { queryClient, subscriptionId, workspaceId, workspaceName },
  }) => {
    const [prices, subscription] = await Promise.all([
      getPrices(),
      getSubscription({ data: { subscriptionId } }),
      queryClient.ensureQueryData({
        ...membersOptions({ workspaceId, roles: [Role.Owner] }),
        revalidateIfStale: true,
      }),
    ]);

    return { prices, subscription, workspaceName };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: `${loaderData?.workspaceName} Settings` }),
  }),
  component: WorkspaceSettingsPage,
});

function WorkspaceSettingsPage() {
  const { workspaceSlug } = Route.useParams();
  const { prices, subscription } = Route.useLoaderData();

  const { data: workspace } = useQuery({
    ...workspaceOptions({ name: workspaceSlug }),
    select: (data) => data?.workspaceByName,
  });

  return (
    <Page
      header={{
        title: `${workspace?.name} ${app.workspaceSettingsPage.breadcrumb}`,
      }}
      pt={0}
    >
      <WorkspaceSettings
        prices={prices as ExpandedProductPrice[]}
        workspace={{
          ...workspace!,
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
