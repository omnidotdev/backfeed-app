import { Center } from "@omnidev/sigil";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { getSdk } from "lib/graphql";
import { polar } from "lib/polar";
import { getAuthSession } from "lib/server";
import { getSearchParams } from "lib/util";

import type { Checkout } from "@polar-sh/sdk/models/components/checkout";
import type { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

/**
 * Payment confirmation page.
 */
const PaymentConfirmationPage = async ({ searchParams }: Props) => {
  let checkout: Checkout | null = null;

  const { checkoutId } = await getSearchParams.parse(searchParams);

  const session = await getAuthSession();

  if (!session) redirect("/");

  after(async () => {
    if (session.user.customerId) return;

    checkout = await polar.checkouts.custom.get({
      id: checkoutId,
    });

    if (!checkout.customerId) return;

    const sdk = await getSdk();

    await sdk.UpdateUser({
      hidraId: session.user.hidraId!,
      patch: {
        customerId: checkout.customerId,
        productId: checkout.productId,
      },
    });
  });

  return (
    <Center mt={12}>
      Thank you! Your checkout is now being processed. Checkout ID: {checkoutId}
      {/* TODO: add checkout details */}
    </Center>
  );
};

export default PaymentConfirmationPage;
