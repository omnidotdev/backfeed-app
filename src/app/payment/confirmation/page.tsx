import { Center } from "@omnidev/sigil";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { getSdk } from "lib/graphql";
import { polar } from "lib/polar";
import { getAuthSession } from "lib/server";
import { getSearchParams } from "lib/util";

import type { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

/**
 * Payment confirmation page.
 */
const PaymentConfirmationPage = async ({ searchParams }: Props) => {
  const { checkoutId } = await getSearchParams.parse(searchParams);

  const session = await getAuthSession();

  if (!session) redirect("/");

  after(async () => {
    const { customerId, productId } = await polar.checkouts.custom.get({
      id: checkoutId,
    });

    if (!customerId) return;

    const sdk = await getSdk();

    await sdk.UpdateUser({
      hidraId: session.user.hidraId!,
      patch: {
        customerId,
        productId: productId ?? null,
      },
    });
  });

  // TODO: add redirect notice for customer.
  return (
    <Center mt={12}>
      Thank you! Your checkout is now being processed. Checkout ID: {checkoutId}
    </Center>
  );
};

export default PaymentConfirmationPage;
