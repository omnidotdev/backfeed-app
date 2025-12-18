import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { OrganizationInvites } from "components/profile";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.profileInvitationsPage.breadcrumb,
};

/**
 * Profile invitations page.
 */
const ProfileInvitationsPage = async () => {
  const session = await getAuthSession();

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
