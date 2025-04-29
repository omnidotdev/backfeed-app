import { notFound } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

import { auth } from "auth";
import { Page } from "components/layout";
import { Account } from "components/profile";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";

export const metadata = {
  title: app.profileAccountPage.breadcrumb,
};

interface Props {
  /** Params for the profile account page. */
  params: Promise<{ userId: string }>;
}

/**
 * Profile account page.
 */
const ProfileAccountPage = async ({ params }: Props) => {
  const { userId } = await params;

  const session = await auth();

  if (!session) notFound();

  if (session?.user?.hidraId !== userId) notFound();

  const sdk = getSdk({ session });

  const { userByHidraId: user } = await sdk.User({
    hidraId: session.user.hidraId!,
  });

  return (
    <Page
      header={{
        title: app.profileAccountPage.breadcrumb,
        description: app.profileAccountPage.description,
        cta: [
          {
            label: app.profileAccountPage.cta.updateProfile.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <FaRegEdit />,
            href: app.identityProviderUrl,
          },
        ],
      }}
      pt={0}
    >
      <Account user={user!} />
    </Page>
  );
};

export default ProfileAccountPage;
