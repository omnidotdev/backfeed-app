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
import { FiEdit } from "react-icons/fi";
import { LuCheck, LuClockAlert } from "react-icons/lu";

import { DestructiveAction } from "components/core";
import { sortBenefits } from "components/pricing/PricingCard/PricingCard";
import { useDeleteOrganizationMutation } from "generated/graphql";
import {
  createSubscription,
  revokeSubscription,
  updateSubscription,
} from "lib/actions";
import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";
import { toaster } from "lib/util";

import type { BenefitCustomProperties } from "@polar-sh/sdk/models/components/benefitcustomproperties.js";
import type { Product } from "@polar-sh/sdk/models/components/product.js";
import type { ProductPrice } from "@polar-sh/sdk/models/components/productprice.js";
import type { DestructiveActionProps } from "components/core";
import type { OrganizationFragment } from "generated/graphql";
import type { CustomerState } from "../Subscription/Subscriptions";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;

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

  const { mutateAsync: deleteOrganization } = useDeleteOrganizationMutation({
    // NB: when an organization is deleted, we want to invalidate all queries as any of them could have data for said org associated with the user
    onSettled: async (_d, _e, _v, _r, { client }) => client.invalidateQueries(),
  });

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    destructiveInput: deleteOrganizationDetails.destruciveAction.prompt,
    action: {
      label: deleteOrganizationDetails.destruciveAction.actionLabel,
      onClick: () =>
        toaster.promise(
          async () => {
            if (subscriptionId) {
              const revokedSubscription = await revokeSubscription({
                subscriptionId,
              });

              if (!revokedSubscription)
                throw new Error("Error revoking subscription");
            }

            await deleteOrganization({ rowId: organization.rowId });
          },
          {
            loading: {
              title: "Deleting organization...",
            },
            success: {
              title: "Successfully deleted organization.",
            },
            error: {
              title: "Error",
              description:
                "Sorry, there was an issue with deleting your organization. Please try again.",
            },
          },
        ),
    },
  };

  return (
    <HStack py={2} justify="end">
      <Drawer
        open={isOpen}
        onOpenChange={onToggle}
        trigger={
          <Button
            color="white"
            backgroundColor="brand.senary"
            fontSize="md"
            disabled={!customer?.defaultPaymentMethodId}
          >
            <Icon src={FiEdit} h={5} w={5} />
          </Button>
        }
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
                <TabTrigger
                  value={SubscriptionRecurringInterval.Month}
                  flex={1}
                >
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
            further subscription changes can be made, please enroll your
            workspace on the free tier to properly link the workspace with our
            payment provider. A credit card is not required for this action.
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

      <DestructiveAction {...DELETE_ORGANIZATION}>
        <Text whiteSpace="wrap" fontWeight="medium">
          The organization will be{" "}
          <sigil.span color="red">permanently</sigil.span> deleted, including
          its projects, posts and comments. Any subscription associated with the
          organization will be immediately{" "}
          <sigil.span color="red">revoked</sigil.span>.
        </Text>
      </DestructiveAction>
    </HStack>
  );
};

export default SubscriptionActions;
