import { redirect } from "next/navigation";

import { getAuthSession } from "lib/util";

export const dynamic = "force-dynamic";

/**
 * Checkout confirmation page.
 */
const CheckoutConfirmationPage = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/");

  redirect(`/profile/${session.user?.identityProviderId}`);
};

export default CheckoutConfirmationPage;
