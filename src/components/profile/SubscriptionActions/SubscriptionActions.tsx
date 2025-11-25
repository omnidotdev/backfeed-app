"use client";

import { Button, HStack, Icon } from "@omnidev/sigil";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LuPencil, LuRepeat2, LuTrash2 } from "react-icons/lu";

import {
  cancelSubscription,
  createCheckoutSession,
  renewSubscription,
} from "lib/actions";
import { BASE_URL } from "lib/config";
import { useAuth } from "lib/hooks";

import type { OrganizationRow } from "components/profile";

interface Props {
  /** Organization details. */
  organization: OrganizationRow;
}

/**
 * Actions a user may perform for an organization-level subscription.
 */
const SubscriptionActions = ({ organization }: Props) => {
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
          returnUrl: `${BASE_URL}/profile/${user?.hidraId}/subscriptions`,
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
        returnUrl: `${BASE_URL}/profile/${user?.hidraId}/subscriptions`,
      });

      return cancelUrl;
    },
    onSuccess: (url) => router.push(url),
  });

  return (
    <HStack py={2}>
      {organization.subscription.toBeCanceled ? (
        <Button
          color="brand.senary"
          backgroundColor="transparent"
          _disabled={{ opacity: 0.5 }}
          fontSize="md"
          px={0}
          disabled={isAuthenticationLoading}
          onClick={async () =>
            await renewSubscription({
              subscriptionId: organization.subscriptionId!,
            })
          }
        >
          <Icon src={LuRepeat2} h={5} w={5} />
        </Button>
      ) : (
        <Button
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
      )}

      <Button
        color="red"
        backgroundColor="transparent"
        _disabled={{ opacity: 0.5 }}
        fontSize="md"
        px={0}
        disabled={
          isAuthenticationLoading ||
          isCancelSubscriptionPending ||
          organization.subscription.toBeCanceled
        }
        onClick={async () => await handleCancelSubscription()}
      >
        <Icon src={LuTrash2} h={5} w={5} />
      </Button>
    </HStack>
  );
};

export default SubscriptionActions;
