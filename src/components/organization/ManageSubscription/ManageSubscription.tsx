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
import { Tier } from "generated/graphql";
import { createCheckoutSession } from "lib/actions";
import { BASE_URL } from "lib/config";
import { useAuth, useSearchParams } from "lib/hooks";

import type { DrawerProps } from "@omnidev/sigil";
import type { Product } from "components/pricing/PricingOverview/PricingOverview";
import type {
  CustomerState,
  OrganizationRow,
} from "components/profile/Subscription/Subscriptions";
import type Stripe from "stripe";

const getPrice = (price: Stripe.Price) => price.unit_amount! / 100;

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

  const subscriptionProduct = customer?.subscriptions?.find(
    (sub) => sub.id === subscriptionId,
    // @ts-expect-error TODO: fix
  )?.product;

  const currentProduct =
    // NB: if a subscription gets canceled, the `tier` in the db is updated to `Free`, however, the `subscriptionId` will still point to a product that may or may not be a `Free` tier product. We conditionally fallback to `Free` tier here to align UI with intent.
    organization.tier === Tier.Free
      ? products[0]
      : (subscriptionProduct ?? products[0]);

  const [selectedProduct, setSelectedProduct] =
    useState<Product>(currentProduct);

  const [{ pricingModel }, setSearchParams] = useSearchParams();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.price.recurring?.interval === pricingModel ||
          product.price.unit_amount === 0,
      ),
    [products, pricingModel],
  );

  return (
    <Drawer
      trigger={trigger}
      title="Manage Subscription"
      description="Update subscription tier to unlock new benefits."
      footer={
        <Button
          w="full"
          disabled={
            selectedProduct.id === currentProduct.id &&
            // NB: if a subscription has been canceled, we want to allow users to renew with any available product, so we do not disable this CTA
            organization.subscriptionStatus !== "canceled"
          }
          onClick={async () => {
            if (organization.subscriptionStatus === "canceled") {
              const checkoutUrl = await createCheckoutSession({
                checkout: {
                  type: "create",
                  successUrl: pathname.includes(organization.slug)
                    ? `${BASE_URL}/organizations/${organization.slug}/settings`
                    : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
                  organizationId: organization.rowId,
                  priceId: selectedProduct.price.id,
                },
              });

              router.push(checkoutUrl);
            } else {
              const checkoutUrl = await createCheckoutSession({
                checkout: {
                  type: "update",
                  subscriptionId: subscriptionId!,
                  returnUrl: pathname.includes(organization.slug)
                    ? `${BASE_URL}/organizations/${organization.slug}/settings`
                    : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
                  product: {
                    id: selectedProduct.id,
                    priceId: selectedProduct.price.id,
                  },
                },
              });

              router.push(checkoutUrl);
            }
          }}
        >
          {subscriptionId
            ? organization.subscriptionStatus === "canceled"
              ? "Renew"
              : "Update"
            : "Create"}{" "}
          Subscription
        </Button>
      }
      bodyProps={{
        justifyContent: "space-between",
      }}
      closeTriggerProps={{
        px: 0,
      }}
      {...rest}
    >
      {subscriptionId ? (
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
              <TabTrigger value="month" flex={1}>
                Monthly
              </TabTrigger>

              <TabTrigger value="year" flex={1}>
                Yearly
              </TabTrigger>
              <TabIndicator />
            </TabList>

            <TabContent value={pricingModel}>
              <RadioGroupRoot
                orientation="vertical"
                defaultValue={currentProduct.price.id}
                onValueChange={({ value }) =>
                  setSelectedProduct(
                    products.find((p) => p.price.id === value)!,
                  )
                }
              >
                {filteredProducts.map((product) => (
                  <RadioGroupItem
                    key={product.price.id}
                    value={product.price.id}
                  >
                    <RadioGroupItemControl />

                    <RadioGroupItemText>{product.name}</RadioGroupItemText>

                    <RadioGroupItemHiddenInput />
                  </RadioGroupItem>
                ))}
              </RadioGroupRoot>
            </TabContent>
          </TabsRoot>

          <Flex direction="column" gap={4}>
            <Text fontWeight="semibold" fontSize="xl">
              Selected Product Benefits:
            </Text>

            <Grid w="full" lineHeight={1.5}>
              {sortBenefits(
                selectedProduct?.marketing_features ??
                  currentProduct.marketing_features,
              ).map((feature) => {
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

                    {feature.name}
                  </GridItem>
                );
              })}
            </Grid>
          </Flex>
        </Flex>
      ) : (
        // TODO: discuss. Left for backwards compat (existing orgs that do not have a `subscriptionId` currently, handled in upsert).
        <Text whiteSpace="wrap">
          We recently migrated to organization level subscriptions. Before
          further subscription changes can be made, please enroll your workspace
          on the free tier to properly link the workspace with our payment
          provider. A credit card is not required for this action.
        </Text>
      )}

      <HStack justify="space-between">
        <Text fontWeight="semibold" fontSize="lg">
          Price:
        </Text>

        <Text fontSize="lg">
          <Format.Number
            value={getPrice(selectedProduct?.price ?? currentProduct.price)}
            style="currency"
            currency="USD"
          />
          {selectedProduct.price.unit_amount === 0
            ? "/forever"
            : `/${selectedProduct.price.recurring?.interval}`}
        </Text>
      </HStack>
    </Drawer>
  );
};

export default ManageSubscription;
