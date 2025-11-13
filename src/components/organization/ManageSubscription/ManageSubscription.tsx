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
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { LuCheck, LuClockAlert, LuPencil } from "react-icons/lu";

import { sortBenefits } from "components/pricing/PricingCard/PricingCard";
import { createSubscription, updateSubscription } from "lib/actions";
import { useSearchParams } from "lib/hooks";
import { toaster } from "lib/util";

import type { DrawerProps } from "@omnidev/sigil";
import type { BenefitCustomProperties } from "@polar-sh/sdk/models/components/benefitcustomproperties.js";
import type { Product } from "@polar-sh/sdk/models/components/product.js";
import type { ProductPrice } from "@polar-sh/sdk/models/components/productprice.js";
import type {
  CustomerState,
  OrganizationRow,
} from "components/profile/Subscription/Subscriptions";

const getPrice = (price: ProductPrice) =>
  price.amountType !== "fixed" ? 0 : price.priceAmount / 100;

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
      disabled={!customer?.paymentMethods.length}
    >
      <Icon src={LuPencil} h={5} w={5} />
    </Button>
  ),
  ...rest
}: Props) => {
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

  const { mutateAsync: upsertSubscription, isPending } = useMutation({
    mutationKey: [
      "UpsertSubscription",
      {
        subscriptionId,
        productId: selectedProduct?.id,
        organizationId: organization.rowId,
      },
    ],
    mutationFn: async () => {
      if (subscriptionId) {
        await updateSubscription({
          subscriptionId,
          productId: selectedProduct?.id!,
        });
      } else {
        await createSubscription({
          organizationId: organization.rowId,
        });
      }
    },
    onSuccess: () => onClose(),
    onSettled: async (_d, _e, _v, _r, { client }) => client.invalidateQueries(),
  });

  const handleUpsertSubscription = () =>
    toaster.promise(upsertSubscription, {
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
    });

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onToggle}
      trigger={trigger}
      title="Manage Subscription"
      description="Update subscription tier to unlock new benefits."
      footer={
        <Button
          w="full"
          disabled={
            (!selectedProduct && !!subscriptionId) ||
            selectedProduct?.id === currentProduct.id ||
            isPending
          }
          onClick={handleUpsertSubscription}
        >
          {subscriptionId ? "Update" : "Create"} Subscription
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
            value={getPrice(
              selectedProduct?.prices[0] ?? currentProduct.prices[0],
            )}
            style="currency"
            currency="USD"
          />

          {(
            selectedProduct
              ? selectedProduct.prices[0].amountType === "free"
              : currentProduct.prices[0].amountType === "free"
          )
            ? "/forever"
            : `/${selectedProduct?.recurringInterval ?? currentProduct.recurringInterval}`}
        </Text>
      </HStack>
    </Drawer>
  );
};

export default ManageSubscription;
