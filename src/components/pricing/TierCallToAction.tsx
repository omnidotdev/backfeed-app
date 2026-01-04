import { Button, Icon } from "@omnidev/sigil";
import { useState } from "react";

import CreatePaidSubscription from "@/components/pricing/CreatePaidSubscription";
import CreateWorkspace from "@/components/workspace/CreateWorkspace";
import { Tier } from "@/generated/graphql";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props extends ButtonProps {
  /** Price ID. */
  priceId: string;
  /** Subscription tier. */
  tier: Tier;
  /** Action icon. */
  actionIcon?: IconType;
}

const TierCallToAction = ({ priceId, tier, actionIcon, ...rest }: Props) => {
  const [isPaidSubscriptionDialogOpen, setIsPaidSubscriptionDialogOpen] =
    useState(false);

  const { setIsOpen: setIsCreateWorkspaceOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  if (tier === Tier.Free) {
    return (
      <>
        <Button onClick={() => setIsCreateWorkspaceOpen(true)} {...rest}>
          Create a Free Workspace
        </Button>

        <CreateWorkspace isHotkeyEnabled={false} />
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
