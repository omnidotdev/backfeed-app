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
import {
  useLoaderData,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import { LuPencil, LuRepeat2, LuTrash2 } from "react-icons/lu";

import { BASE_URL } from "@/lib/config/env.config";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import {
  getCancelSubscriptionUrl,
  getCreateSubscriptionUrl,
  getManageSubscriptionUrl,
  renewSubscription,
} from "@/server/functions/subscriptions";

import type { OrganizationRow } from "@/components/profile/UserOrganizations";

interface Props {
  /** Organization details. */
  organization: OrganizationRow;
}

/**
 * Actions a user may perform for an organization-level subscription.
 */
const SubscriptionActions = ({ organization }: Props) => {
  const { session } = useRouteContext({
    from: "/_auth/profile/$userId/_layout/organizations",
  });
  const { prices } = useLoaderData({
    from: "/_auth/profile/$userId/_layout/organizations",
  });
  const navigate = useNavigate();

  const [isUpgradePlanMenuOpen, setIsUpgradePlanMenuOpen] = useState(false);

  const {
    mutateAsync: manageSubscription,
    isPending: isManageSubscriptionPending,
  } = useMutation({
    mutationFn: async () => {
      const checkoutUrl = await getManageSubscriptionUrl({
        data: {
          subscriptionId: organization.subscriptionId!,
          returnUrl: `${BASE_URL}/profile/${session?.user?.hidraId}/organizations`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  const {
    mutateAsync: createSubscription,
    isPending: isCreateSubscriptionPending,
  } = useMutation({
    mutationFn: async ({ priceId }: { priceId: string }) => {
      const checkoutUrl = await getCreateSubscriptionUrl({
        data: {
          organizationId: organization.rowId,
          priceId,
          successUrl: `${BASE_URL}/profile/${session?.user?.hidraId}/organizations`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  const {
    mutateAsync: handleCancelSubscription,
    isPending: isCancelSubscriptionPending,
  } = useMutation({
    mutationFn: async () => {
      const cancelUrl = await getCancelSubscriptionUrl({
        data: {
          subscriptionId: organization.subscriptionId!,
          returnUrl: `${BASE_URL}/profile/${session?.user?.hidraId}/organizations`,
        },
      });

      return cancelUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  const {
    mutateAsync: handleRenewSubscription,
    isPending: isRenewSubscriptionPending,
  } = useMutation({
    mutationFn: async () =>
      await renewSubscription({
        data: {
          subscriptionId: organization.subscriptionId!,
        },
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
              disabled={isRenewSubscriptionPending}
              onClick={async () => await handleRenewSubscription()}
            >
              <Icon src={LuRepeat2} h={5} w={5} />
            </Button>
          }
          triggerProps={{
            style: { all: "unset" },
            disabled: isRenewSubscriptionPending,
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
              disabled={isManageSubscriptionPending}
              onClick={async () => await manageSubscription()}
            >
              <Icon src={LuPencil} h={5} w={5} />
            </Button>
          }
          triggerProps={{
            style: { all: "unset" },
            disabled: isManageSubscriptionPending,
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
            disabled: isCreateSubscriptionPending,
          }}
          contentProps={{
            zIndex: "foreground",
            fontSize: "sm",
            display: isUpgradePlanMenuOpen ? "none" : undefined,
          }}
          trigger={
            <Menu
              open={isUpgradePlanMenuOpen}
              onOpenChange={({ open }) => setIsUpgradePlanMenuOpen(open)}
              trigger={
                <Button
                  asChild
                  color="brand.senary"
                  backgroundColor="transparent"
                  _disabled={{ opacity: 0.5 }}
                  fontSize="md"
                  px={0}
                  disabled={isCreateSubscriptionPending}
                >
                  <Icon src={FiArrowUpCircle} h={5} w={5} />
                </Button>
              }
              onSelect={({ value }) => createSubscription({ priceId: value })}
            >
              <MenuItemGroup minW={40}>
                <MenuItemGroupLabel>Basic</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.metadata.tier === "basic")
                  .map((price) => (
                    <MenuItem
                      key={price.id}
                      value={price.id}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.recurring?.interval)}ly
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /{price.recurring?.interval === "month" ? "mo" : "yr"}
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
              </MenuItemGroup>

              <MenuSeparator />

              <MenuItemGroup minW={40}>
                <MenuItemGroupLabel>Team</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.metadata.tier === "team")
                  .map((price) => (
                    <MenuItem
                      key={price.id}
                      value={price.id}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.recurring?.interval)}ly
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /{price.recurring?.interval === "month" ? "mo" : "yr"}
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
            isCancelSubscriptionPending ||
            !organization.subscriptionId ||
            organization.subscription.toBeCanceled,
        }}
        contentProps={{
          display:
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
