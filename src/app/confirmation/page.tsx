import { auth } from "auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * Checkout confirmation page.
 */
const CheckoutConfirmationPage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  redirect(`/profile/${session.user?.hidraId}`);
};

export default CheckoutConfirmationPage;
