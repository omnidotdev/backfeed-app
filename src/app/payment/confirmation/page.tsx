import { Center } from "@omnidev/sigil";
import { notFound, redirect } from "next/navigation";

import { getAuthSession } from "lib/util";

import { getSdk } from "lib/graphql";
import { polar } from "lib/polar";
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

  if (session.user.customerId) redirect("/");

  const { checkoutId } = await searchParams;

  const checkout = await polar.checkouts.custom.get({
    id: checkoutId as string,
  });

  const sdk = await getSdk();

  if (checkout.customerId) {
    await sdk.UpdateUser({
      hidraId: session.user.hidraId!,
      patch: {
        customerId: checkout.customerId,
        productId: checkout.productId,
      },
    });
  }

  return (
    <Center mt={12}>
      Thank you! Your checkout is now being processed. Checkout ID: {checkoutId}
    </Center>
  );
};

export default PaymentConfirmationPage;
