import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import UserWorkspaces from "@/components/profile/UserWorkspaces";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_app/profile/$userId/_layout/workspaces",
)({
  head: () => ({ meta: createMetaTags({ title: "User Workspaces" }) }),
  component: UserWorkspacesPage,
});

function UserWorkspacesPage() {
  const { user } = Route.useRouteContext();
  const { userId } = Route.useParams();

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: user?.username ?? user?.name ?? "Profile",
            to: "/profile/$userId/account",
            params: { userId },
          },
          { label: app.profileWorkspacesPage.breadcrumb },
        ],
        title: app.profileWorkspacesPage.breadcrumb,
        description: app.profileWorkspacesPage.description,
      }}
      className="pt-0"
    >
      <UserWorkspaces />
    </Page>
  );
}
