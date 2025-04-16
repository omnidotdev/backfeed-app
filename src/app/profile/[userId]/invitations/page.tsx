import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { OrganizationInvites } from "components/profile";
import { app } from "lib/config";
import { getQueryClient } from "lib/util";

/**
 * Profile invitations page.
 */
const ProfileInvitationsPage = async () => {
  const session = await auth();

  if (!session) notFound();

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        metadata={{
          title: app.profileInvitationsPage.breadcrumb,
        }}
        header={{
          title: app.profileInvitationsPage.breadcrumb,
          description: app.profileInvitationsPage.description,
        }}
        pt={0}
      >
        <OrganizationInvites email={session?.user?.email!} />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileInvitationsPage;
