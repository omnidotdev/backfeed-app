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
  "/_public/workspaces/$workspaceSlug/_layout/_manage/settings",
)({
  loader: async ({ context: { queryClient, workspaceId, workspaceName } }) => {
    const [prices, subscription] = await Promise.all([
      getPrices(),
      getSubscription({ data: { workspaceId } }),
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
  const { prices } = Route.useLoaderData();
  const { organizationId, workspaceName } = Route.useRouteContext();

  const { data: workspace } = useQuery({
    ...workspaceOptions({ organizationId }),
    select: (data) => data?.workspaceByOrganizationId,
  });

  return (
    <Page
      header={{
        title: `${workspaceName} ${app.workspaceSettingsPage.breadcrumb}`,
      }}
      pt={0}
    >
      <WorkspaceSettings
        prices={prices as ExpandedProductPrice[]}
        workspace={workspace!}
      />
    </Page>
  );
}
