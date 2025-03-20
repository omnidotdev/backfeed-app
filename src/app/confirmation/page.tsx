import { redirect } from "next/navigation";

import { getAuthSession } from "lib/util";

/**
 * Checkout confirmation page.
 */
const CheckoutConfirmationPage = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/");

  redirect(`/profile/${session.user?.rowId}`);
};

export default CheckoutConfirmationPage;
