"use client";

import { HStack, Text, sigil } from "@omnidev/sigil";
import { SubscriptionStatus } from "@polar-sh/sdk/models/components/subscriptionstatus.js";

import { DestructiveAction } from "components/core";
import { ManageSubscription } from "components/organization";
import { useDeleteOrganizationMutation } from "generated/graphql";
import { revokeSubscription } from "lib/actions";
import { app } from "lib/config";
import { toaster } from "lib/util";

import type { Product } from "@polar-sh/sdk/models/components/product.js";
import type {
  CustomerState,
  OrganizationRow,
} from "../Subscription/Subscriptions";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;

interface Props {
  /** Organization details. */
  organization: OrganizationRow;
  /** List of available backfeed products. */
  products: Product[];
  /** Customer details. */
  customer?: CustomerState;
}

/**
 * Actions a user may perform for an organization level subscription.
 */
const SubscriptionActions = ({ organization, products, customer }: Props) => {
  const subscriptionId = organization.subscriptionId;

  const { mutateAsync: deleteOrganization } = useDeleteOrganizationMutation({
    // NB: when an organization is deleted, we want to invalidate all queries as any of them could have data for said org associated with the user
    onSettled: async (_d, _e, _v, _r, { client }) => client.invalidateQueries(),
  });

  return (
    <HStack py={2}>
      <ManageSubscription
        organization={organization}
        products={products}
        customer={customer}
      />

      <DestructiveAction
        triggerProps={{ px: 0, backgroundColor: "transparent", color: "red" }}
        title={deleteOrganizationDetails.destruciveAction.title}
        description={deleteOrganizationDetails.destruciveAction.description}
        destructiveInput={deleteOrganizationDetails.destruciveAction.prompt}
        action={{
          label: deleteOrganizationDetails.destruciveAction.actionLabel,
          onClick: () =>
            toaster.promise(
              async () => {
                if (
                  subscriptionId &&
                  organization.subscriptionStatus !==
                    SubscriptionStatus.Canceled
                ) {
                  const revokedSubscription = await revokeSubscription({
                    subscriptionId,
                  });

                  if (!revokedSubscription)
                    throw new Error("Error revoking subscription");
                }

                await deleteOrganization({ rowId: organization.rowId });
              },
              {
                loading: {
                  title: "Deleting organization...",
                },
                success: {
                  title: "Successfully deleted organization.",
                },
                error: {
                  title: "Error",
                  description:
                    "Sorry, there was an issue with deleting your organization. Please try again.",
                },
              },
            ),
        }}
      >
        <Text whiteSpace="wrap" fontWeight="medium">
          The organization will be{" "}
          <sigil.span color="red">permanently</sigil.span> deleted, including
          its projects, posts and comments. Any subscription associated with the
          organization will be immediately{" "}
          <sigil.span color="red">revoked</sigil.span>.
        </Text>
      </DestructiveAction>
    </HStack>
  );
};

export default SubscriptionActions;
