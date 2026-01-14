import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import UserWorkspaces from "@/components/profile/UserWorkspaces";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_auth/profile/$userId/_layout/workspaces",
)({
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
    </Page>
  );
}
