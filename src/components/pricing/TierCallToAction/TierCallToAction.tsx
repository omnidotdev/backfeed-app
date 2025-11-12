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
import { LuChevronDown, LuPlus } from "react-icons/lu";

import { Role, Tier, useOrganizationsQuery } from "generated/graphql";
import { updateSubscription } from "lib/actions";
import { useDialogStore } from "lib/hooks/store";
import { capitalizeFirstLetter, toaster } from "lib/util";
import { DialogType } from "store";

import type { ButtonProps } from "@omnidev/sigil";
import type { Session } from "next-auth";
import type { IconType } from "react-icons";

interface Props extends ButtonProps {
  /** Signed in user. */
  user: Session["user"];
  /** Product ID. */
  productId: string;
  /** Subscription tier. */
  tier: Tier;
  /** Action icon. */
  actionIcon?: IconType;
}

const TierCallToAction = ({
  user,
  productId,
  tier,
  actionIcon,
  ...rest
}: Props) => {
  const router = useRouter();

  const { setIsOpen: setIsCreateOrganizationOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { isOpen, onToggle, onClose } = useDisclosure();

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user.rowId,
      excludeRoles: [Role.Member, Role.Admin],
      excludeTiers: [tier],
    },
    {
      select: (data) => data?.organizations?.nodes ?? [],
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
      <Button onClick={() => setIsCreateOrganizationOpen(true)} {...rest}>
        Create a Free Organization
      </Button>
    );
  }

  if (tier === Tier.Enterprise) {
    return <Button {...rest}>Contact sales</Button>;
  }

  return (
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
        {organizations?.map((org) => (
          <MenuItem
            key={org?.rowId}
            value={org?.rowId!}
            disabled={!org?.subscriptionId || isPending}
            onClick={() =>
              handleUpdateSubscription({
                subscriptionId: org?.subscriptionId!,
                productId,
                organizationSlug: org?.slug!,
              })
            }
          >
            {org?.name}
          </MenuItem>
        ))}
      </MenuItemGroup>

      <MenuSeparator />

      <MenuItem value="create">
        <HStack>
          <Icon src={LuPlus} />
          Create Organization
        </HStack>
      </MenuItem>
    </Menu>
  );
};

export default TierCallToAction;
