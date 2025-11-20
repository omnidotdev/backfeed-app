"use client";

import { Format } from "@ark-ui/react";
import {
  Button,
  Drawer,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupRoot,
  TabContent,
  TabIndicator,
  TabList,
  TabTrigger,
  TabsRoot,
  Text,
  sigil,
} from "@omnidev/sigil";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LuCheck, LuClockAlert, LuPencil } from "react-icons/lu";

import { sortBenefits } from "components/pricing/PricingCard/PricingCard";
import {
  cancelSubscription,
  createCheckoutSession,
  renewSubscription,
} from "lib/actions";
import { BASE_URL } from "lib/config";
import { useAuth, useSearchParams } from "lib/hooks";

import type { DrawerProps } from "@omnidev/sigil";
import type { Product } from "components/pricing/PricingOverview/PricingOverview";
import type {
  CustomerState,
  OrganizationRow,
} from "components/profile/Subscription/Subscriptions";

interface Props extends DrawerProps {
  /** Organization details. */
  organization: OrganizationRow;
  /** List of available backfeed products. */
  products: Product[];
  /** Customer details. */
  customer?: CustomerState;
}

const ManageSubscription = ({
  organization,
  products,
  customer,
  trigger = (
    <Button
      color="brand.senary"
      backgroundColor="transparent"
      fontSize="md"
      px={0}
    >
      <Icon src={LuPencil} h={5} w={5} />
    </Button>
  ),
  ...rest
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAuth();

  const subscriptionId = organization.subscriptionId;

  const subscription = customer?.subscriptions?.find(
    (sub) => sub.id === subscriptionId,
  );

  const currentProduct = products.find(
    (product) =>
      product.id === subscription?.items.data[0].plan.product &&
      product.price.id === subscription?.items.data[0].plan.id,
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    currentProduct,
  );

  const [{ pricingModel }, setSearchParams] = useSearchParams();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) => product.price.recurring?.interval === pricingModel,
      ),
    [products, pricingModel],
  );

  return (
    <Drawer
      trigger={trigger}
      title="Manage Subscription"
      description="Update subscription tier to unlock new benefits."
      onExitComplete={() => {
        setSelectedProduct(currentProduct);
        setSearchParams({ pricingModel: "month" });
      }}
      footer={
        <Flex direction="column" w="full" gap={2}>
          <Button
            display={organization.toBeCanceled ? "inline-flex" : "none"}
            onClick={async () =>
              await renewSubscription({ subscriptionId: subscriptionId! })
            }
          >
            Renew Subscription
          </Button>
          <Button
            display={organization.toBeCanceled ? "none" : "inline-flex"}
            disabled={
              !selectedProduct ||
              selectedProduct.price.id === currentProduct?.price.id
            }
            onClick={async () => {
              if (
                // NB: this `canceled` check is for safe measure. When a subscription *is* canceled, the `subscriptionId` is cleared from the database.
                organization.subscriptionStatus === "canceled" ||
                !subscriptionId
              ) {
                const checkoutUrl = await createCheckoutSession({
                  checkout: {
                    type: "create",
                    successUrl: pathname.includes(organization.slug)
                      ? `${BASE_URL}/organizations/${organization.slug}/settings`
                      : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
                    organizationId: organization.rowId,
                    priceId: selectedProduct!.price.id,
                  },
                });

                router.push(checkoutUrl);
              } else {
                const checkoutUrl = await createCheckoutSession({
                  checkout: {
                    type: "update",
                    subscriptionId,
                    returnUrl: pathname.includes(organization.slug)
                      ? `${BASE_URL}/organizations/${organization.slug}/settings`
                      : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
                    product: {
                      id: selectedProduct!.id,
                      priceId: selectedProduct!.price.id,
                    },
                  },
                });

                router.push(checkoutUrl);
              }
            }}
          >
            {subscriptionId ? "Update Subscription" : "Upgrade"}
          </Button>
          <Button
            bgColor="brand.quinary"
            display={
              subscriptionId && !organization.toBeCanceled
                ? "inline-flex"
                : "none"
            }
            onClick={async () => {
              const cancelSubscriptionUrl = await cancelSubscription({
                subscriptionId: subscriptionId!,

                returnUrl: pathname.includes(organization.slug)
                  ? `${BASE_URL}/organizations/${organization.slug}/settings`
                  : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
              });

              router.push(cancelSubscriptionUrl);
            }}
          >
            Cancel Subscription
          </Button>
        </Flex>
      }
      bodyProps={{
        justifyContent: "space-between",
      }}
      closeTriggerProps={{
        px: 0,
      }}
      {...rest}
    >
      <Flex direction="column" gap={12}>
        <TabsRoot
          variant="enclosed"
          value={pricingModel}
          onValueChange={({ value }) =>
            setSearchParams({
              pricingModel: value as "month" | "year",
            })
          }
        >
          <TabList>
            <TabTrigger
              value="month"
              flex={1}
              disabled={organization.toBeCanceled}
            >
              Monthly
            </TabTrigger>

            <TabTrigger
              value="year"
              flex={1}
              disabled={organization.toBeCanceled}
            >
              Yearly
            </TabTrigger>
            <TabIndicator />
          </TabList>

          <TabContent value={pricingModel}>
            <RadioGroupRoot
              orientation="vertical"
              value={selectedProduct?.price.id ?? ""}
              onValueChange={({ value }) =>
                setSelectedProduct(products.find((p) => p.price.id === value)!)
              }
              gap={4}
              disabled={organization.toBeCanceled}
            >
              {filteredProducts.map((product) => (
                <RadioGroupItem key={product.price.id} value={product.price.id}>
                  <RadioGroupItemControl />

                  <RadioGroupItemText>{product.name}</RadioGroupItemText>

                  <RadioGroupItemHiddenInput />
                </RadioGroupItem>
              ))}
            </RadioGroupRoot>
          </TabContent>
        </TabsRoot>

        {!!selectedProduct && (
          <Flex direction="column" gap={4}>
            <Text fontWeight="semibold" fontSize="xl">
              Selected Product Benefits:
            </Text>

            <Grid w="full" lineHeight={1.5}>
              {sortBenefits(selectedProduct.marketing_features).map(
                (feature) => {
                  const isComingSoon = feature.name?.includes("coming soon");

                  return (
                    <GridItem key={feature.name} display="flex" gap={2}>
                      {/* ! NB: height should match the line height of the item (set at the `Grid` level). CSS has a modern `lh` unit, but that seemingly does not work, so this is a workaround. */}
                      <sigil.span h={6} display="flex" alignItems="center">
                        <Icon
                          src={isComingSoon ? LuClockAlert : LuCheck}
                          h={4}
                          w={4}
                          color={isComingSoon ? "yellow" : "brand.primary"}
                        />
                      </sigil.span>

                      {feature.name?.split(" (coming soon)")[0]}
                    </GridItem>
                  );
                },
              )}
            </Grid>
          </Flex>
        )}
      </Flex>

      {selectedProduct && (
        <HStack justify="space-between">
          <Text fontWeight="semibold" fontSize="lg">
            Price:
          </Text>

          <Text fontSize="lg">
            <Format.Number
              value={selectedProduct.price.unit_amount! / 100}
              style="currency"
              currency="USD"
            />
            /{selectedProduct.price.recurring?.interval}
          </Text>
        </HStack>
      )}
    </Drawer>
  );
};

export default ManageSubscription;
