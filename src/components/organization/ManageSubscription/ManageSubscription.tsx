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
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LuCheck, LuClockAlert, LuPencil } from "react-icons/lu";

import { sortBenefits } from "components/pricing/PricingCard/PricingCard";
import { Tier } from "generated/graphql";
import {
  createCheckoutSession,
  createSubscription,
  updateSubscription,
} from "lib/actions";
import { BASE_URL } from "lib/config";
import { useAuth, useSearchParams } from "lib/hooks";
import { toaster } from "lib/util";

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

  const { isOpen, onToggle, onClose } = useDisclosure();

  const [{ pricingModel }, setSearchParams] = useSearchParams();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          // TODO: fix. We need to separate concerns here. Have to apply the correct price
          product.price.recurring?.interval === pricingModel ||
          product.price.unit_amount === 0,
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
            (selectedProduct.id === currentProduct.id &&
              // NB: if a subscription has been canceled, we want to allow users to renew with any available product, so we do not disable this CTA
              organization.subscriptionStatus !== "canceled") ||
            isPending
          }
          onClick={async () => {
            // NB: if the subscription for the organization has been canceled or the user has no payment methods on file, we must go through the checkout flow to create a new subscription. This isnt necessary for `Free` tier subs, but it is required for paid tier.
            if (
              organization.subscriptionStatus === "canceled" ||
              !customer?.invoice_settings.default_payment_method ||
              // TODO: verify if the below check is needed with Stripe. The hope is that the management flow in general can be simplified
              // NB: this additional check is here due to a bug where using `subscriptions.update` when handling a free --> paid subscription change will set the status of the subscription to `past_due`. See: https://discord.com/channels/1078611507115470849/1437815007747248189 for more context
              // Creating a checkout session and supplying the `subscriptionId` to update seems to work as a workaround for the above.
              // Note: The subscription must be on a free pricing plan in order to pass `subscriptionId` in this manner. See: https://polar.sh/docs/api-reference/checkouts/create-session
              subscriptionProduct?.prices?.[0]?.amountType === "free"
            ) {
              const session = await createCheckoutSession({
                products: [selectedProduct.id],
                externalCustomerId: user?.hidraId!,
                customerEmail: user?.email,
                metadata: { backfeedOrganizationId: organization.rowId },
                subscriptionId:
                  // Must be upgrading a free tier sub (see note above), and the subscription must *not* be currently canceled
                  subscriptionProduct?.prices?.[0]?.amountType === "free" &&
                  organization.subscriptionStatus !== "canceled"
                    ? subscriptionId
                    : undefined,
                successUrl: pathname.includes(organization.slug)
                  ? `${BASE_URL}/organizations/${organization.slug}/settings`
                  : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
                returnUrl: pathname.includes(organization.slug)
                  ? `${BASE_URL}/organizations/${organization.slug}/settings`
                  : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
              });

              // @ts-expect-error TODO: fix
              router.push(session.url);
            } else {
              handleUpsertSubscription();
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
                defaultValue={currentProduct.id}
                onValueChange={({ value }) =>
                  setSelectedProduct(products.find((p) => p.id === value)!)
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

          {/** TODO: fix below */}
          {/* {( */}
          {/*   selectedProduct */}
          {/*     ? selectedProduct.prices[0].amountType === "free" */}
          {/*     : currentProduct.prices[0].amountType === "free" */}
          {/* ) */}
          {/*   ? "/forever" */}
          {/*   : `/${selectedProduct?.recurringInterval ?? currentProduct.recurringInterval}`} */}
        </Text>
      </HStack>
    </Drawer>
  );
};

export default ManageSubscription;
