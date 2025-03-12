import { Center } from "@omnidev/sigil";
import { redirect } from "next/navigation";

import { CustomerPortal } from "components/profile";
import { app } from "lib/config";
import { polar } from "lib/polar";
import { getAuthSession } from "lib/util";

export const metadata = {
  title: `${app.profilePage.breadcrumb} | ${app.name}`,
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

  const [session, customer] = await Promise.allSettled([
    getAuthSession(),
    polar.customers.getStateExternal({
      externalId: userId,
    }),
  ]);

  if (!session) redirect("/");

  // TODO: handle case where customer is not found (no subscription)
  if (customer.status === "rejected") return "TODO";

  // TODO: populate the profile page with customer data / handlers
  return (
    <Center mt={12} display="flex" flexDirection="column" gap={2}>
      User Profile
      <CustomerPortal customer={customer.value} />
    </Center>
  );
};

export default ProfilePage;
