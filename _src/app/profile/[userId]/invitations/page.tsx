import { notFound } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { OrganizationInvites } from "components/profile";
import { app } from "lib/config";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.profileInvitationsPage.breadcrumb,
};

/**
 * Profile invitations page.
 */
const ProfileInvitationsPage = async () => {
  const session = await auth();

  if (!session) notFound();

  return (
    <Page
      header={{
        title: app.profileInvitationsPage.breadcrumb,
        description: app.profileInvitationsPage.description,
      }}
      pt={0}
    >
      <OrganizationInvites email={session?.user?.email!} />
    </Page>
  );
};

export default ProfileInvitationsPage;
