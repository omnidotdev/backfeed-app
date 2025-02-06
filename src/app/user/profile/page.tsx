import { Stack } from "@omnidev/sigil";
import { redirect } from "next/navigation";

import { CustomerPortal } from "components/profile";
import { getAuthSession } from "lib/server";

/**
 * User profile page. This page holds information for the user that is derived from the IDP as well as any subscriptions.
 * TODO: flesh out this page.
 */
const ProfilePage = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/");

  return (
    <Stack align="center" mt={12} gap={8}>
      Profile
      <CustomerPortal />
    </Stack>
  );
};

export default ProfilePage;
