import { Center } from "@omnidev/sigil";
import { redirect } from "next/navigation";

import { polar } from "lib/polar";
import { getAuthSession } from "lib/util";

interface Props {
  params: Promise<{ userId: string }>;
}

/**
 * User profile page.
 */
const ProfilePage = async ({ params }: Props) => {
  const { userId } = await params;

  const [session] = await Promise.all([getAuthSession()]);

  if (!session) redirect("/");

  const result = await polar.customers.getStateExternal({
    externalId: userId,
  });

  // TODO: populate the profile page with customer data / handlers
  return <Center mt={12}>User Profile</Center>;
};

export default ProfilePage;
