import { Center } from "@omnidev/sigil";
import { notFound, redirect } from "next/navigation";

import { getAuthSession } from "lib/util";

import type { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

/**
 * Payment confirmation page.
 * TODO: handle restricted access
 */
const PaymentConfirmationPage = async ({ searchParams }: Props) => {
  const session = await getAuthSession();

  if (!session) notFound();

  if (session.user.productId) redirect("/");

  const { checkoutId } = await searchParams;

  return (
    <Center mt={12}>
      Thank you! Your checkout is now being processed. Checkout ID: {checkoutId}
    </Center>
  );
};

export default PaymentConfirmationPage;
