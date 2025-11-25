"use client";

import { Button, HStack, Icon } from "@omnidev/sigil";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { LuPencil, LuTrash2 } from "react-icons/lu";

import { cancelSubscription, createCheckoutSession } from "lib/actions";
import { BASE_URL } from "lib/config";
import { useAuth } from "lib/hooks";

import type { OrganizationRow } from "components/profile";

interface Props {
  /** Organization details. */
  organization: OrganizationRow;
}

/**
 * Actions a user may perform for an organization level subscription.
 */
const SubscriptionActions = ({ organization }: Props) => {
  const pathname = usePathname(),
    router = useRouter();

  const { user, isLoading: isAuthenticationLoading } = useAuth();

  const { mutateAsync: manageSubscription } = useMutation({
    mutationFn: async () => {
      // TODO: fix for current `Free` tier (no sub ID). Need to provide means to select product. This currently fails.
      if (!organization.subscriptionId) {
        const checkoutUrl = await createCheckoutSession({
          checkout: {
            type: "create",
            successUrl: pathname.includes(organization.slug)
              ? `${BASE_URL}/organizations/${organization.slug}/settings`
              : `${BASE_URL}/profile/${user?.hidraId}/organizations`,
            organizationId: organization.rowId,
            priceId: "",
          },
        });

        return checkoutUrl;
      } else {
        const checkoutUrl = await createCheckoutSession({
          checkout: {
            type: "update",
            subscriptionId: organization.subscriptionId,
            returnUrl: `${BASE_URL}/profile/${user?.hidraId}/organizations`,
          },
        });

        return checkoutUrl;
      }
    },
    onSuccess: (url) => router.push(url),
  });

  const { mutateAsync: handleCancelSubscription } = useMutation({
    mutationFn: async () => {
      const cancelUrl = await cancelSubscription({
        subscriptionId: organization.subscriptionId!,
        returnUrl: `${BASE_URL}/profile/${user?.hidraId}/organizations`,
      });

      return cancelUrl;
    },
    onSuccess: (url) => router.push(url),
  });

  return (
    <HStack py={2}>
      <Button
        color="brand.senary"
        backgroundColor="transparent"
        fontSize="md"
        px={0}
        disabled={isAuthenticationLoading}
        onClick={async () => await manageSubscription()}
      >
        <Icon src={LuPencil} h={5} w={5} />
      </Button>

      <Button
        color="red"
        backgroundColor="transparent"
        _disabled={{ opacity: 0.5 }}
        fontSize="md"
        px={0}
        disabled={isAuthenticationLoading || !organization.subscriptionId}
        onClick={async () => await handleCancelSubscription()}
      >
        <Icon src={LuTrash2} h={5} w={5} />
      </Button>
    </HStack>
  );
};

export default SubscriptionActions;
