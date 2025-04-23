import { redirect } from "next/navigation";

import { auth } from "auth";

export const dynamic = "force-dynamic";

/**
 * Checkout confirmation page.
 */
const CheckoutConfirmationPage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  redirect(`/profile/${session.user?.hidraId}/subscription`);
};

export default CheckoutConfirmationPage;
