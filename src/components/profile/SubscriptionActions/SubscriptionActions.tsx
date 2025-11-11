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
  useDisclosure,
} from "@omnidev/sigil";
import { SubscriptionRecurringInterval } from "@polar-sh/sdk/models/components/subscriptionrecurringinterval.js";
import { useMemo, useState } from "react";
import { LuCheck, LuClockAlert } from "react-icons/lu";

import { sortBenefits } from "components/pricing/PricingCard/PricingCard";
import { Tier } from "generated/graphql";
import { createSubscription, updateSubscription } from "lib/actions";
import { useSearchParams } from "lib/hooks";
import { toaster } from "lib/util";

import type { BenefitCustomProperties } from "@polar-sh/sdk/models/components/benefitcustomproperties.js";
import type { Product } from "@polar-sh/sdk/models/components/product.js";
import type { ProductPrice } from "@polar-sh/sdk/models/components/productprice.js";
import type { OrganizationFragment } from "generated/graphql";
import type { CustomerState } from "../Subscription/Subscriptions";

const getPrice = (price: ProductPrice) =>
  price.amountType !== "fixed" ? 0 : price.priceAmount / 100;

interface Props {
  /** Organization details. */
  organization: OrganizationFragment;
  /** List of available backfeed products. */
  products: Product[];
  /** Customer details. */
  customer?: CustomerState;
}

/**
 * Actions a user may perform for an organization level subscription.
 */
// TODO: create dialogs for actions to avoid customer portal API
const SubscriptionActions = ({ organization, products, customer }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const { isOpen, onToggle, onClose } = useDisclosure();

  const subscriptionId = organization.subscriptionId;

  const currentProduct =
    customer?.subscriptions?.find((sub) => sub.id === subscriptionId)
      ?.product ?? products[0];

  const [{ pricingModel }, setSearchParams] = useSearchParams();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.recurringInterval === pricingModel ||
          product.prices[0].amountType === "free",
      ),
    [products, pricingModel],
  );

  const handleUpdateSubscription = () =>
    toaster.promise(
      async () => {
        if (!selectedProduct) return;

        if (subscriptionId) {
          await updateSubscription({
            subscriptionId,
            productId: selectedProduct?.id,
          });
        } else {
          // TODO: discuss UX with this. Left for backwards compat (existing orgs that do not have a `subscriptionId`).
          // It is noted in the `createSubscription` server action that it is currently only possible to programmatically create `free` subscriptions as CC is not required.
          // With this in mind, the *only* available option when this branch of code is hit, is the free tier product.
          // Not positve on the cleanest way to show this in UI / what the UX should feel like
          await createSubscription({
            organizationId: organization.rowId,
          });
        }

        onClose();
      },
      {
        loading: { title: "Updating subscription..." },
        success: {
          title: "Success!",
          description: "Your subscription has been updated.",
        },
        error: {
          title: "Error",
          description:
            "Sorry, there was an issue with updating your subscription. Please try again.",
        },
      },
    );

  return (
    <HStack py={2} justify="end">
      <Drawer
        open={isOpen}
        onOpenChange={onToggle}
        trigger={
          <Button size="sm" disabled={!customer?.defaultPaymentMethodId}>
            Manage
          </Button>
        }
        title="Manage Subscription"
        description="Update subscription tier to unlock new benefits."
        footer={
          <Button
            w="full"
            disabled={
              !selectedProduct || selectedProduct.id === currentProduct.id
            }
            onClick={handleUpdateSubscription}
          >
            Update Subscription
          </Button>
        }
        bodyProps={{
          justifyContent: "space-between",
        }}
        closeTriggerProps={{
          px: 0,
        }}
      >
        <Flex direction="column" gap={12}>
          <TabsRoot
            variant="enclosed"
            defaultValue={SubscriptionRecurringInterval.Month}
            onValueChange={({ value }) =>
              setSearchParams({
                pricingModel: value as SubscriptionRecurringInterval,
              })
            }
          >
            <TabList>
              <TabTrigger value={SubscriptionRecurringInterval.Month} flex={1}>
                Monthly
              </TabTrigger>

              <TabTrigger value={SubscriptionRecurringInterval.Year} flex={1}>
                Yearly
              </TabTrigger>
              <TabIndicator />
            </TabList>

            <TabContent value={pricingModel}>
              <RadioGroupRoot
                orientation="vertical"
                defaultValue={currentProduct.id}
                onValueChange={({ value }) =>
                  setSelectedProduct(products.find((p) => p.id === value))
                }
              >
                {filteredProducts.map((product) => (
                  <RadioGroupItem key={product.id} value={product.id}>
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
                selectedProduct?.benefits ?? currentProduct.benefits,
              ).map((feature) => {
                const isComingSoon = (
                  feature.properties as BenefitCustomProperties
                ).note
                  ?.toLowerCase()
                  .includes("coming soon");

                return (
                  <GridItem key={feature.id} display="flex" gap={2}>
                    {/* ! NB: height should match the line height of the item (set at the `Grid` level). CSS has a modern `lh` unit, but that seemingly does not work, so this is a workaround. */}
                    <sigil.span h={6} display="flex" alignItems="center">
                      <Icon
                        src={isComingSoon ? LuClockAlert : LuCheck}
                        h={4}
                        w={4}
                        color={isComingSoon ? "yellow" : "brand.primary"}
                      />
                    </sigil.span>

                    {feature.description}
                  </GridItem>
                );
              })}
            </Grid>
          </Flex>
        </Flex>

        <HStack justify="space-between">
          <Text fontWeight="semibold" fontSize="lg">
            Price:
          </Text>

          <Text fontSize="lg">
            <Format.Number
              value={getPrice(
                selectedProduct?.prices[0] ?? currentProduct.prices[0],
              )}
              style="currency"
              currency="USD"
            />

            {!(selectedProduct
              ? selectedProduct.isRecurring
              : currentProduct.isRecurring)
              ? "/forever"
              : `/${selectedProduct?.recurringInterval ?? currentProduct.recurringInterval}`}
          </Text>
        </HStack>
      </Drawer>

      <Button
        variant="outline"
        size="sm"
        disabled={organization.tier === Tier.Free}
      >
        Cancel
      </Button>
    </HStack>
  );
};

export default SubscriptionActions;
