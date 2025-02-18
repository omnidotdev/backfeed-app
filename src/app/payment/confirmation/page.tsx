import { Button, Stack, Text } from "@omnidev/sigil";
import { notFound, redirect } from "next/navigation";
import { after } from "next/server";

import { Link } from "components/core";
import { SectionContainer } from "components/layout";
import { getSdk } from "lib/graphql";
import { polar } from "lib/polar";
import { getAuthSession, getSearchParams } from "lib/util";

import type { Checkout } from "@polar-sh/sdk/models/components/checkout";
import type { ProductPriceRecurringFixed } from "@polar-sh/sdk/models/components/productpricerecurringfixed";
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

  try {
    checkout = await polar.checkouts.get({
      id: checkoutId,
    });
  } catch (_error) {
    notFound();
  }

  const productPrice = checkout.productPrice as ProductPriceRecurringFixed;

  after(async () => {
    if (session.user.customerId || !checkout.customerId) return;

    const sdk = await getSdk();

    await sdk.UpdateUser({
      rowId: session.user.rowId!,
      patch: {
        customerId: checkout.customerId,
        productId: checkout.productId,
      },
    });
  });

  return (
    <Stack mt={12} align="center">
      <SectionContainer
        title="Checkout Details"
        description={`Thank you ${checkout.customerName} for subscribing to ${checkout.product.name}! Below you will find details of your purchase.`}
        mt={4}
      >
        <Stack gap={8}>
          <Text>
            <Text as="span" fontWeight="bold" mr={2}>
              Checkout ID:
            </Text>
            {checkoutId}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold" mr={2}>
              Price:
            </Text>
            {`$${productPrice.priceAmount / 100} / ${productPrice.recurringInterval}`}
          </Text>
          {/* TODO: extract to custom Address component that handles different address formats */}
          <Stack>
            <Text fontWeight="bold">Billing Address:</Text>
            <Text>{checkout.customerBillingAddress?.line1}</Text>
            <Text>{`${checkout.customerBillingAddress?.city}, ${checkout.customerBillingAddress?.state?.split("-")[1]} ${checkout.customerBillingAddress?.postalCode}`}</Text>
          </Stack>
          <Stack>
            <Text fontWeight="bold">Product Details:</Text>
            <ul
              style={{
                listStyle: "disc",
                marginLeft: 14,
              }}
            >
              {checkout.product.benefits.map((benefit) => (
                <li key={benefit.id}>{benefit.description}</li>
              ))}
            </ul>
          </Stack>
          <Link href="/user/profile">
            <Button w="full">View Profile</Button>
          </Link>
        </Stack>
      </SectionContainer>
    </Stack>
  );
};

export default PaymentConfirmationPage;
