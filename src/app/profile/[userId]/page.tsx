import { Center } from "@omnidev/sigil";
import { redirect } from "next/navigation";

import { app } from "lib/config";
import { polar } from "lib/polar";
import { getAuthSession } from "lib/util";

export const metadata = {
  // TODO: extract `Profile` to app.config
  title: `Profile | ${app.name}`,
};

interface Props {
  /** Params for the profile page. */
  params: Promise<{ userId: string }>;
}

/**
 * User profile page.
 */
const ProfilePage = async ({ params }: Props) => {
  const { userId } = await params;

  // TODO: determine if `allSettled` is needed to handle errors gracefully
  const [session, result] = await Promise.all([
    getAuthSession(),
    polar.customers.getStateExternal({
      externalId: userId,
    }),
  ]);

  if (!session) redirect("/");

  // TODO: populate the profile page with customer data / handlers
  return <Center mt={12}>User Profile</Center>;
};

export default ProfilePage;
