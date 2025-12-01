"use client";

import { Button, Icon } from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CreateOrganization } from "components/organization";
import { CreatePaidSubscription } from "components/pricing";
import { Role, Tier, useOrganizationsQuery } from "generated/graphql";
import { useDialogStore } from "lib/hooks/store";
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
      <Button {...rest} onClick={() => setIsPaidSubscriptionDialogOpen(true)}>
        {actionIcon && <Icon src={actionIcon} h={4} w={4} />}
        Get Started
      </Button>

      <CreatePaidSubscription
        priceId={priceId}
        isOpen={isPaidSubscriptionDialogOpen}
        setIsOpen={setIsPaidSubscriptionDialogOpen}
      />
    </>
  );
};

export default TierCallToAction;
