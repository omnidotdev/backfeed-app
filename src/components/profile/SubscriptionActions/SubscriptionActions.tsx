"use client";

import { Format } from "@ark-ui/react";
import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
  Text,
  Tooltip,
} from "@omnidev/sigil";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LuPencil, LuPlus, LuRepeat2, LuTrash2 } from "react-icons/lu";

import {
  cancelSubscription,
  createCheckoutSession,
  renewSubscription,
} from "lib/actions";
import { BASE_URL } from "lib/config";
import { useAuth } from "lib/hooks";
import { capitalizeFirstLetter } from "lib/util";

import type { Price } from "components/pricing/PricingOverview/PricingOverview";
import type { OrganizationRow } from "components/profile";

interface Props {
  /** Organization details. */
  organization: OrganizationRow;
  /** App subscription priceing options. */
  prices: Price[];
}

/**
 * Actions a user may perform for an organization-level subscription.
 */
const SubscriptionActions = ({ organization, prices }: Props) => {
  const router = useRouter();

  const { user, isLoading: isAuthenticationLoading } = useAuth();

  const {
    mutateAsync: manageSubscription,
    isPending: isManageSubscriptionPending,
  } = useMutation({
    mutationFn: async () => {
      const checkoutUrl = await createCheckoutSession({
        checkout: {
          type: "update",
          subscriptionId: organization.subscriptionId!,
          returnUrl: `${BASE_URL}/profile/${user?.hidraId}/organizations`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => router.push(url),
  });

  const {
    mutateAsync: createSubscription,
    isPending: isCreateSubscriptionPending,
  } = useMutation({
    mutationFn: async ({ priceId }: { priceId: string }) => {
      const checkoutUrl = await createCheckoutSession({
        checkout: {
          type: "create",
          organizationId: organization.rowId,
          priceId,
          successUrl: `${BASE_URL}/profile/${user?.hidraId}/organizations`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => router.push(url),
  });

  const {
    mutateAsync: handleCancelSubscription,
    isPending: isCancelSubscriptionPending,
  } = useMutation({
    mutationFn: async () => {
      const cancelUrl = await cancelSubscription({
        subscriptionId: organization.subscriptionId!,
        returnUrl: `${BASE_URL}/profile/${user?.hidraId}/organizations`,
      });

      return cancelUrl;
    },
    onSuccess: (url) => router.push(url),
  });

  const {
    mutateAsync: handleRenewSubscription,
    isPending: isRenewSubscriptionPending,
  } = useMutation({
    mutationFn: async () =>
      await renewSubscription({
        subscriptionId: organization.subscriptionId!,
      }),
  });

  return (
    <HStack py={2} justify="center">
      {organization.subscription.toBeCanceled ? (
        <Tooltip
          positioning={{
            placement: "top",
          }}
          hasArrow={false}
          closeOnClick={false}
          closeOnPointerDown={false}
          trigger={
            <Button
              asChild
              color="brand.senary"
              backgroundColor="transparent"
              _disabled={{ opacity: 0.5 }}
              fontSize="md"
              px={0}
              disabled={isAuthenticationLoading || isRenewSubscriptionPending}
              onClick={async () => await handleRenewSubscription()}
            >
              <Icon src={LuRepeat2} h={5} w={5} />
            </Button>
          }
          triggerProps={{
            style: { all: "unset" },
            disabled: isAuthenticationLoading || isRenewSubscriptionPending,
          }}
          contentProps={{
            zIndex: "foreground",
            fontSize: "sm",
          }}
        >
          Renew Subscription
        </Tooltip>
      ) : organization.subscriptionId ? (
        <Tooltip
          positioning={{
            placement: "top",
          }}
          hasArrow={false}
          closeOnClick={false}
          closeOnPointerDown={false}
          trigger={
            <Button
              asChild
              color="brand.senary"
              backgroundColor="transparent"
              _disabled={{ opacity: 0.5 }}
              fontSize="md"
              px={0}
              disabled={isAuthenticationLoading || isManageSubscriptionPending}
              onClick={async () => await manageSubscription()}
            >
              <Icon src={LuPencil} h={5} w={5} />
            </Button>
          }
          triggerProps={{
            style: { all: "unset" },
            disabled: isAuthenticationLoading || isManageSubscriptionPending,
          }}
          contentProps={{
            zIndex: "foreground",
            fontSize: "sm",
          }}
        >
          Manage Subscription
        </Tooltip>
      ) : (
        <Tooltip
          positioning={{
            placement: "top",
          }}
          hasArrow={false}
          triggerProps={{
            style: { all: "unset" },
            disabled: isAuthenticationLoading || isCreateSubscriptionPending,
          }}
          contentProps={{
            zIndex: "foreground",
            fontSize: "sm",
          }}
          trigger={
            <Menu
              trigger={
                <Button
                  asChild
                  color="brand.senary"
                  backgroundColor="transparent"
                  _disabled={{ opacity: 0.5 }}
                  fontSize="md"
                  px={0}
                  disabled={
                    isAuthenticationLoading || isCreateSubscriptionPending
                  }
                >
                  <Icon src={LuPlus} h={5} w={5} />
                </Button>
              }
              onSelect={({ value }) => createSubscription({ priceId: value })}
            >
              <MenuItemGroup minW={40}>
                <MenuItemGroupLabel>Monthly</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.recurring?.interval === "month")
                  .map((price) => (
                    <MenuItem
                      key={price.id}
                      value={price.id}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.metadata.tier)}
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /mo
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
              </MenuItemGroup>

              <MenuSeparator />

              <MenuItemGroup minW={40}>
                <MenuItemGroupLabel>Yearly</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.recurring?.interval === "year")
                  .map((price) => (
                    <MenuItem
                      key={price.id}
                      value={price.id}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.metadata.tier)}
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /yr
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
              </MenuItemGroup>
            </Menu>
          }
        >
          Upgrade Plan
        </Tooltip>
      )}

      <Tooltip
        positioning={{
          placement: "top",
        }}
        hasArrow={false}
        closeOnClick={false}
        closeOnPointerDown={false}
        trigger={
          <Button
            asChild
            color="red"
            backgroundColor="transparent"
            _disabled={{ opacity: 0.5 }}
            fontSize="md"
            px={0}
            disabled={
              isAuthenticationLoading ||
              isCancelSubscriptionPending ||
              !organization.subscriptionId ||
              organization.subscription.toBeCanceled
            }
            onClick={async () => await handleCancelSubscription()}
          >
            <Icon src={LuTrash2} h={5} w={5} />
          </Button>
        }
        triggerProps={{
          style: { all: "unset" },
          disabled:
            isAuthenticationLoading ||
            isCancelSubscriptionPending ||
            !organization.subscriptionId ||
            organization.subscription.toBeCanceled,
        }}
        contentProps={{
          display:
            isAuthenticationLoading ||
            isCancelSubscriptionPending ||
            !organization.subscriptionId ||
            organization.subscription.toBeCanceled
              ? "none"
              : undefined,
          zIndex: "foreground",
          fontSize: "sm",
        }}
      >
        Cancel Subscription
      </Tooltip>
    </HStack>
  );
};

export default SubscriptionActions;
