import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import WorkspaceSettings from "@/components/workspace/WorkspaceSettings";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";
import { getEntitlements } from "@/server/functions/entitlements";
import { getPrices } from "@/server/functions/prices";
import { getSubscription } from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/_layout/~/_manage/settings",
)({
  loader: async ({ context: { organizationId, workspaceName } }) => {
    // Members are managed via IDP (Gatekeeper), billing via Aether.
    // Entitlements are fetched alongside the subscription so a comped or
    // manually-granted tier (no Stripe subscription) still renders correctly.
    const [prices, subscription, entitlements] = await Promise.all([
      getPrices(),
      getSubscription({ data: { organizationId } }).catch(() => null),
      getEntitlements({
        data: {
          entityType: "backfeed/organization",
          entityId: organizationId,
          productId: "backfeed",
        },
      }).catch(() => null),
    ]);

    return { prices, subscription, entitlements, workspaceName };
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
            to: "/@{$workspaceSlug}",
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
