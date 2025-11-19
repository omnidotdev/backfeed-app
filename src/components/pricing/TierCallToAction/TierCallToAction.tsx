"use client";

import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuSeparator,
  useDisclosure,
} from "@omnidev/sigil";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronDown, LuPlus } from "react-icons/lu";

import { CreateOrganization } from "components/organization";
import { CreatePaidSubscription } from "components/pricing";
import { Role, Tier, useOrganizationsQuery } from "generated/graphql";
import { createCheckoutSession, updateSubscription } from "lib/actions";
import { BASE_URL } from "lib/config";
import { useDialogStore } from "lib/hooks/store";
import { capitalizeFirstLetter, toaster } from "lib/util";
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

  const { isOpen, onToggle, onClose } = useDisclosure();

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

  const { mutateAsync: updateOrganizationTier, isPending } = useMutation({
    mutationKey: ["UpdateSubscription"],
    mutationFn: async ({
      subscriptionId,
      productId,
      // NB: not used for the mutation, but used for proper routing in `onSuccess`
      organizationSlug: _organizationSlug,
    }: {
      subscriptionId: string;
      productId: string;
      organizationSlug: string;
    }) => {
      await updateSubscription({
        subscriptionId,
        productId,
      });
    },
    onSuccess: (_d, variables) => {
      onClose();

      router.push(`/organizations/${variables.organizationSlug}`);
    },
    onSettled: async (_d, _e, _v, _r, { client }) => client.invalidateQueries(),
  });

  const handleUpdateSubscription = ({
    subscriptionId,
    productId,
    organizationSlug,
  }: {
    subscriptionId: string;
    productId: string;
    organizationSlug: string;
  }) =>
    toaster.promise(
      async () =>
        await updateOrganizationTier({
          subscriptionId,
          productId,
          organizationSlug,
        }),
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
        open={isOpen}
        onOpenChange={onToggle}
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
              const isDisabled =
                !org?.subscriptionId || org?.tier === tier || isPending;

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

                    // NB: if the subscription for the organization has been canceled or the user has no payment methods on file, we must go through the checkout flow to create a new subscription. This isnt necessary for `Free` tier subs, but it is required for paid tier.
                    if (
                      org.status === "canceled" ||
                      !customer?.paymentMethods.length
                    ) {
                      const session = await createCheckoutSession({
                        products: [productId],
                        externalCustomerId: user?.hidraId!,
                        customerEmail: user?.email,
                        metadata: { backfeedOrganizationId: org.rowId! },
                        successUrl: `${BASE_URL}/profile/${user?.hidraId}/organizations`,
                        returnUrl: `${BASE_URL}/pricing`,
                      });

                      // @ts-expect-error TODO: fix
                      router.push(session.url);
                    } else {
                      handleUpdateSubscription({
                        subscriptionId: org?.subscriptionId!,
                        productId,
                        organizationSlug: org?.slug!,
                      });
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
        productId={productId}
        isOpen={isPaidSubscriptionDialogOpen}
        setIsOpen={setIsPaidSubscriptionDialogOpen}
      />
    </>
  );
};

export default TierCallToAction;
