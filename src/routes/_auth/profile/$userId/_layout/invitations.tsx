import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import OrganizationInvites from "@/components/profile/OrganizationInvites";
import app from "@/lib/config/app.config";
import { invitationsOptions } from "@/lib/options/invitations";

export const Route = createFileRoute(
  "/_auth/profile/$userId/_layout/invitations",
)({
  loader: async ({ context: { queryClient, user } }) => {
    await queryClient.ensureQueryData(
      invitationsOptions({ email: user?.email! }),
    );
  },
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
      <OrganizationInvites />
    </Page>
  );
}
