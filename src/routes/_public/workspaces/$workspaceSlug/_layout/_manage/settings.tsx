import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import WorkspaceSettings from "@/components/workspace/WorkspaceSettings";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";
import { getPrices } from "@/server/functions/prices";
import { getSubscription } from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/_manage/settings",
)({
  loader: async ({ context: { organizationId, workspaceName } }) => {
    // Members are managed via IDP (Gatekeeper), billing via Aether
    const [prices, subscription] = await Promise.all([
      getPrices(),
      getSubscription({ data: { organizationId } }),
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
  const { workspaceName } = Route.useRouteContext();

  return (
    <Page
      header={{
        title: `${workspaceName} ${app.workspaceSettingsPage.breadcrumb}`,
      }}
      pt={0}
    >
      <WorkspaceSettings prices={prices as ExpandedProductPrice[]} />
    </Page>
  );
}
