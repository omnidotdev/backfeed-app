import { notFound } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

import { Page } from "components/layout";
import { Account } from "components/profile";
import { icon } from "generated/panda/recipes";
import { AUTH_BASE_URL, app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.profileAccountPage.breadcrumb,
};

/**
 * Profile account page.
 */
const ProfileAccountPage = async ({
  params,
}: PageProps<"/profile/[userId]/account">) => {
  const { userId } = await params;

  const session = await getAuthSession();

  if (!session) notFound();

  if (session?.user?.identityProviderId !== userId) notFound();

  const sdk = getSdk({ session });

  const { userByIdentityProviderId: user } = await sdk.User({
    identityProviderId: session.user.identityProviderId!,
  });

  return (
    <Page
      header={{
        title: app.profileAccountPage.breadcrumb,
        description: app.profileAccountPage.description,
        cta: [
          {
            label: app.profileAccountPage.cta.updateProfile.label,
            // `className` used to apply default recipe styles as `Icon` is not compatible in RSCs
            icon: <FaRegEdit className={icon()} />,
            href: AUTH_BASE_URL!,
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
