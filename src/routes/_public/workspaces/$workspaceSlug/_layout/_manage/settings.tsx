import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import WorkspaceSettings from "@/components/workspace/WorkspaceSettings";
import app from "@/lib/config/app.config";
import { workspaceOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";
import { getPrices } from "@/server/functions/prices";
import { getSubscription } from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/_manage/settings",
)({
  loader: async ({ context: { workspaceId, workspaceName } }) => {
    // Members are now managed via IDP (Gatekeeper), not local DB
    const [prices, subscription] = await Promise.all([
      getPrices(),
      getSubscription({ data: { workspaceId } }),
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
    select: (data) => data?.workspaces?.nodes?.[0],
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
