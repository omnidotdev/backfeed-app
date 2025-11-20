"use client";

import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuSeparator,
} from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronDown, LuPlus } from "react-icons/lu";

import { CreateOrganization } from "components/organization";
import { CreatePaidSubscription } from "components/pricing";
import { Role, Tier, useOrganizationsQuery } from "generated/graphql";
import { createCheckoutSession } from "lib/actions";
import { BASE_URL } from "lib/config";
import { useDialogStore } from "lib/hooks/store";
import { capitalizeFirstLetter } from "lib/util";
import { DialogType } from "store";

import type { ButtonProps } from "@omnidev/sigil";
import type { CustomerState } from "components/profile/Subscription/Subscriptions";
import type { Session } from "next-auth";
import type { IconType } from "react-icons";

interface Props extends ButtonProps {
  /** Signed in user. */
  user: Session["user"];
  /** Product ID. */
  productId: string;
  /** Price ID. */
  priceId: string;
  /** Subscription tier. */
  tier: Tier;
  /** Customer details. */
  customer?: CustomerState;
  /** Action icon. */
  actionIcon?: IconType;
}

const TierCallToAction = ({
  user,
  productId,
  priceId,
  tier,
  customer,
  actionIcon,
  ...rest
}: Props) => {
  const [isPaidSubscriptionDialogOpen, setIsPaidSubscriptionDialogOpen] =
    useState(false);

  const router = useRouter();

  const { setIsOpen: setIsCreateOrganizationOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user.rowId,
      excludeRoles: [Role.Member, Role.Admin],
    },
    {
      select: (data) =>
        data?.organizations?.nodes?.map((org) => {
          const subscription = customer?.subscriptions.find(
            (sub) => sub.id === org?.subscriptionId,
          );

          return {
            ...org,
            status: subscription?.status ?? "incomplete",
          };
        }) ?? [],
    },
  );

  if (tier === Tier.Free) {
    return (
      <>
        <Button onClick={() => setIsCreateOrganizationOpen(true)} {...rest}>
          Create a Free Organization
        </Button>
        <CreateOrganization disableHotKey />
      </>
    );
  }

  if (tier === Tier.Enterprise) {
    return <Button {...rest}>Contact sales</Button>;
  }

  return (
    <>
      <Menu
        trigger={
          <Button {...rest}>
            {actionIcon && <Icon src={actionIcon} h={4} w={4} />}
            Continue with {capitalizeFirstLetter(tier)}
            <Icon src={LuChevronDown} h={4} w={4} />
          </Button>
        }
        positioning={{ sameWidth: true, strategy: "fixed" }}
      >
        <MenuItemGroup>
          {organizations?.length ? (
            organizations?.map((org) => {
              const isDisabled = org?.tier === tier;

              return (
                <MenuItem
                  key={org?.rowId}
                  value={org?.rowId!}
                  disabled={isDisabled}
                  _disabled={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                    bgColor: "transparent",
                  }}
                  onClick={async () => {
                    // TODO: figure out why this is required. `onClick` still fires even if `disabled` prop is true, this is a fallback solution
                    if (isDisabled) return;

                    // NB: if the subscription for the organization has been canceled or the org does not currently have a subId, we must create a new subscription.
                    if (org.status === "canceled" || !org.subscriptionId) {
                      const checkoutUrl = await createCheckoutSession({
                        checkout: {
                          type: "create",
                          successUrl: `${BASE_URL}/profile/${user?.hidraId}/organizations`,
                          organizationId: org.rowId!,
                          priceId,
                        },
                      });

                      router.push(checkoutUrl);
                    } else {
                      const checkoutUrl = await createCheckoutSession({
                        checkout: {
                          type: "update",
                          subscriptionId: org.subscriptionId,
                          returnUrl: `${BASE_URL}/pricing`,
                          product: {
                            id: productId,
                            priceId,
                          },
                        },
                      });

                      router.push(checkoutUrl);
                    }
                  }}
                >
                  {org?.name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem
              value="empty"
              disabled
              cursor="default"
              bgColor={{ _hover: "transparent" }}
            >
              No current organizations to manage
            </MenuItem>
          )}
        </MenuItemGroup>

        <MenuSeparator />

        <MenuItem
          value="create"
          onClick={() => setIsPaidSubscriptionDialogOpen(true)}
        >
          <HStack>
            <Icon src={LuPlus} />
            Create Organization
          </HStack>
        </MenuItem>
      </Menu>

      <CreatePaidSubscription
        priceId={priceId}
        isOpen={isPaidSubscriptionDialogOpen}
        setIsOpen={setIsPaidSubscriptionDialogOpen}
      />
    </>
  );
};

export default TierCallToAction;
