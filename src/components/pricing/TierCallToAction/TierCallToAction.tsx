"use client";

import { Button, Icon } from "@omnidev/sigil";
import { useState } from "react";

import { CreateOrganization } from "components/organization";
import { CreatePaidSubscription } from "components/pricing";
import { Tier } from "generated/graphql";
import { useDialogStore } from "lib/hooks/store";
import { capitalizeFirstLetter } from "lib/util";
import { DialogType } from "store";

import type { ButtonProps } from "@omnidev/sigil";
import type { CustomerState } from "components/profile/Subscription/Subscriptions";
import type { Session } from "next-auth";
import type { IconType } from "react-icons";

interface Props extends ButtonProps {
  /** Authenticated user. */
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

  const { setIsOpen: setIsCreateOrganizationOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  if (tier === Tier.Free) {
    return (
      <>
        <Button onClick={() => setIsCreateOrganizationOpen(true)} {...rest}>
          Create a Free Organization
        </Button>

        <CreateOrganization isHotkeyEnabled={false} />
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
        Continue with {capitalizeFirstLetter(tier)}
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
