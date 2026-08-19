import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import WorkspaceSettings from "@/components/workspace/WorkspaceSettings";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";
import { getPrices } from "@/server/functions/prices";
import { getSubscription } from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/settings",
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
  const { workspaceName, workspaceLogo } = Route.useRouteContext();
  const { workspaceSlug } = Route.useParams();

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: workspaceName,
            image: workspaceLogo,
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
          },
          { label: app.workspaceSettingsPage.breadcrumb },
        ],
        title: `${workspaceName} ${app.workspaceSettingsPage.breadcrumb}`,
      }}
    >
      <WorkspaceSettings prices={prices as ExpandedProductPrice[]} />
    </Page>
  );
}
