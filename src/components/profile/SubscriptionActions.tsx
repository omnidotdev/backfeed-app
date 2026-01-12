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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useLoaderData,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import { LuPencil, LuRepeat2, LuTrash2 } from "react-icons/lu";

import { Tier } from "@/generated/graphql";
import { BASE_URL } from "@/lib/config/env.config";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import {
  getBillingPortalUrl,
  getCreateSubscriptionUrl,
  getSubscription,
  renewSubscription,
} from "@/server/functions/subscriptions";

import type { WorkspaceRow } from "@/components/profile/UserWorkspaces";

interface Props {
  /** Workspace details. */
  workspace: WorkspaceRow;
}

/**
 * Actions a user may perform for a workspace-level subscription.
 */
const SubscriptionActions = ({ workspace }: Props) => {
  const { session } = useRouteContext({
    from: "/_auth/profile/$userId/_layout/workspaces",
  });
  const { prices } = useLoaderData({
    from: "/_auth/profile/$userId/_layout/workspaces",
  });
  const navigate = useNavigate();

  const [isUpgradePlanMenuOpen, setIsUpgradePlanMenuOpen] = useState(false);

  // Fetch subscription details for this workspace (only if not free tier)
  const { data: subscription } = useQuery({
    queryKey: ["subscription", workspace.rowId],
    queryFn: () => getSubscription({ data: { workspaceId: workspace.rowId } }),
    enabled: workspace.tier !== Tier.Free,
  });

  const hasSubscription = !!subscription;
  const toBeCanceled = !!subscription?.cancelAt;

  const { mutateAsync: openBillingPortal, isPending: isBillingPortalPending } =
    useMutation({
      mutationFn: async () => {
        const portalUrl = await getBillingPortalUrl({
          data: {
            workspaceId: workspace.rowId,
            returnUrl: `${BASE_URL}/profile/${session?.user?.identityProviderId}/workspaces`,
          },
        });

        return portalUrl;
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
          workspaceId: workspace.rowId,
          priceId,
          successUrl: `${BASE_URL}/profile/${session?.user?.identityProviderId}/workspaces`,
        },
      });

      return checkoutUrl;
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
          workspaceId: workspace.rowId,
        },
      }),
  });

  return (
    <HStack py={2} justify="center">
      {toBeCanceled ? (
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
      ) : hasSubscription ? (
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
              disabled={isBillingPortalPending}
              onClick={async () => await openBillingPortal()}
            >
              <Icon src={LuPencil} h={5} w={5} />
            </Button>
          }
          triggerProps={{
            style: { all: "unset" },
            disabled: isBillingPortalPending,
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
              isBillingPortalPending ||
              !workspace.subscriptionId ||
              workspace.subscription.toBeCanceled
            }
            onClick={async () => await openBillingPortal()}
          >
            <Icon src={LuTrash2} h={5} w={5} />
          </Button>
        }
        triggerProps={{
          style: { all: "unset" },
          disabled: isBillingPortalPending || !hasSubscription || toBeCanceled,
        }}
        contentProps={{
          display:
            isBillingPortalPending || !hasSubscription || toBeCanceled
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
