import { Button, HStack, Stack, Text } from "@omnidev/sigil";
import { SubscriptionStatus } from "@polar-sh/sdk/models/components/subscriptionstatus";
import dayjs from "dayjs";
import { match } from "ts-pattern";

import { polar } from "lib/polar";
import { getAuthSession } from "lib/server";
import { capitalizeFirstLetter } from "lib/util";

import type { ProductPriceRecurringFixed } from "@polar-sh/sdk/models/components/productpricerecurringfixed";

/**
 * Current subscription status and management.
 */
const CustomerPortal = async () => {
  const session = await getAuthSession();

  if (!session?.user?.customerId) {
    return <Button disabled>Click Me. You won't.</Button>;
  }

  const subsciptions = await polar.subscriptions.list({
    customerId: session?.user?.customerId!,
    // active: true,
  });

  const handleCancelSubscription = async () => {
    "use server";

    // TODO
  };

  return (
    <Stack w="full" p={4}>
      {subsciptions.result.items.map((subscription) => {
        const product = subscription.product;
        const price = subscription.price as ProductPriceRecurringFixed;
        const isActive = subscription.status === SubscriptionStatus.Active;

        const statusColor = match(subscription.status)
          .with(SubscriptionStatus.Active, () =>
            subscription.endsAt ? "yellow" : "green"
          )
          .with(SubscriptionStatus.Canceled, () => "red")
          .with(SubscriptionStatus.Trialing, () => "yellow")
          .otherwise(() => "gray");

        return (
          <Stack
            key={subscription.id}
            position="relative"
            boxShadow="lg"
            p={4}
            opacity={isActive ? 1 : 0.5}
            rounded="md"
          >
            <Text position="absolute" top={4} right={4} color={statusColor}>
              {capitalizeFirstLetter(subscription.status)}
            </Text>
            <Text>{product.name}</Text>
            <Text>
              Price: ${price.priceAmount / 100}/{price.recurringInterval}
            </Text>
            <HStack justify="space-between">
              <Text>
                {isActive
                  ? subscription.endsAt
                    ? "Ending Date: "
                    : "Renewal Date: "
                  : "Ended On: "}
                {dayjs(
                  subscription.endsAt ?? subscription.currentPeriodEnd
                ).format("MMMM D, YYYY")}
              </Text>
              <HStack visibility={isActive ? "visible" : "hidden"}>
                <Button onClick={handleCancelSubscription} colorPalette="red">
                  Cancel
                </Button>
                <Button colorPalette="neutral">Manage</Button>
              </HStack>
            </HStack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CustomerPortal;
