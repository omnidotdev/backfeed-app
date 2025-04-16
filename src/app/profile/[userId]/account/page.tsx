import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuPencilLine } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { Account } from "components/profile";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getQueryClient } from "lib/util";

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

  if (session?.user?.rowId !== userId) notFound();

  const sdk = getSdk({ session });

  const { userByHidraId: user } = await sdk.User({
    hidraId: session.user.hidraId!,
  });

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        metadata={{
          title: app.profileAccountPage.breadcrumb,
        }}
        header={{
          title: app.profileAccountPage.breadcrumb,
          description: app.profileAccountPage.description,
          cta: [
            {
              label: app.profileAccountPage.cta.updateProfile.label,
              // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
              icon: <LuPencilLine />,
              externalHref: app.identityUrl,
            },
          ],
        }}
        pt={0}
      >
        <Account
          username={user?.username}
          firstName={user?.firstName}
          lastName={user?.lastName}
          email={user?.email}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileAccountPage;
