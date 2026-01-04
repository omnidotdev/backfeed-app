import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import WorkspaceInvites from "@/components/profile/WorkspaceInvites";
import app from "@/lib/config/app.config";
import { invitationsOptions } from "@/lib/options/invitations";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_auth/profile/$userId/_layout/invitations",
)({
  loader: async ({ context: { queryClient, user } }) => {
    await queryClient.ensureQueryData({
      ...invitationsOptions({ email: user?.email! }),
      revalidateIfStale: true,
    });
  },
  head: () => ({ meta: createMetaTags({ title: "Invitations" }) }),
  component: UserInvitationsPage,
});

function UserInvitationsPage() {
  return (
    <Page
      header={{
        title: app.profileInvitationsPage.breadcrumb,
        description: app.profileInvitationsPage.description,
      }}
      pt={0}
    >
      <WorkspaceInvites />
    </Page>
  );
}
