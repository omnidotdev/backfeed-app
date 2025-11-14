import { notFound } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

import { auth } from "auth";
import { Page } from "components/layout";
import { Account } from "components/profile";
import { icon } from "generated/panda/recipes";
import { AUTH_ISSUER, app } from "lib/config";
import { getSdk } from "lib/graphql";

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
            // `className` used to apply default recipe styles as `Icon` is not compatible in RSCs
            icon: <FaRegEdit className={icon()} />,
            // TODO remove this split once `NEXT_PUBLIC_AUTH_ISSUER` set to base URL (https://linear.app/omnidev/issue/OMNI-254/move-apiauth-paths-to-base-path-or-subpath-eg-auth)
            href: AUTH_ISSUER!.split("/api")[0],
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
