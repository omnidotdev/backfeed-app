"use client";

import { Button, HStack } from "@omnidev/sigil";
import { useRouter } from "next/navigation";

import { Tier } from "generated/graphql";
import { API_BASE_URL } from "lib/config";
import { BACKFEED_PRODUCT_IDS } from "lib/polar";

import type { OrganizationFragment } from "generated/graphql";
import type { Session } from "next-auth";
import type { CustomerState } from "../Subscription/Subscriptions";

interface Props {
  /** Organization details. */
  organization: OrganizationFragment;
  /** User details. */
  user: Session["user"];
  /** Customer details. */
  customer?: CustomerState;
}

/**
 * Actions a user may perform for an organization level subscription.
 */
// TODO: create dialogs for actions to avoid customer portal API
const SubscriptionActions = ({ organization, user, customer }: Props) => {
  const router = useRouter();

  const subscriptionId = organization.subscriptionId;

  const product = customer?.subscriptions?.find(
    (sub) => sub.id === subscriptionId,
  )?.product;

  return (
    <HStack py={2} justify="end">
      <Button
        size="sm"
        disabled={!customer?.defaultPaymentMethodId}
        // TODO: FIX BEFORE MERGING. This currently *always* creates a new subscription, rather than upsert.
        onClick={() => {
          router.push(
            `${API_BASE_URL}/checkout?customerExternalId=${user.hidraId!}${BACKFEED_PRODUCT_IDS.filter(
              (id) => id !== product?.id,
            )
              .map((id) => `&products=${id}`)
              .join(
                "",
              )}&metadata=${encodeURIComponent(JSON.stringify({ organizationId: organization.rowId }))}`,
          );
        }}
      >
        Manage
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={organization.tier === Tier.Free}
      >
        Cancel
      </Button>
    </HStack>
  );
};

export default SubscriptionActions;
