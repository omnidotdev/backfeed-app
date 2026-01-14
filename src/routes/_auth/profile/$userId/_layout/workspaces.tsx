import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import UserWorkspaces from "@/components/profile/UserWorkspaces";
import CreateWorkspace from "@/components/workspace/CreateWorkspace";
import { WorkspaceOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { workspacesOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";
import { getPrices } from "@/server/functions/prices";

export const Route = createFileRoute(
  "/_auth/profile/$userId/_layout/workspaces",
)({
  loader: async ({ context: { queryClient, session } }) => {
    // Get user's org IDs for filtering workspaces
    const organizationIds = session?.organizations?.map((o) => o.id) ?? [];

    const [prices] = await Promise.all([
      getPrices(),
      queryClient.ensureQueryData({
        ...workspacesOptions({
          organizationIds,
          orderBy: [WorkspaceOrderBy.CreatedAtAsc],
        }),
        revalidateIfStale: true,
      }),
    ]);

    return { prices, organizationIds };
  },
  head: () => ({ meta: createMetaTags({ title: "User Workspaces" }) }),
  component: UserWorkspacesPage,
});

function UserWorkspacesPage() {
  return (
    <Page
      header={{
        title: app.profileWorkspacesPage.breadcrumb,
        description: app.profileWorkspacesPage.description,
      }}
      pt={0}
    >
      <UserWorkspaces />

      <CreateWorkspace />
    </Page>
  );
}
