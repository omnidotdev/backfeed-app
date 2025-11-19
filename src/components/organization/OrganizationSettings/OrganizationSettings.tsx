"use client";

import { createListCollection } from "@ark-ui/react";
import {
  Button,
  Combobox,
  Divider,
  Grid,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { RiUserSharedLine } from "react-icons/ri";

import { DangerZoneAction } from "components/core";
import { SectionContainer } from "components/layout";
import {
  ManageSubscription,
  UpdateOrganization,
} from "components/organization";
import {
  Role,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useMembersQuery,
} from "generated/graphql";
import { revokeSubscription } from "lib/actions";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";
import { useTransferOwnershipMutation } from "lib/hooks/mutations";
import { capitalizeFirstLetter, toaster } from "lib/util";

import type { DestructiveActionProps } from "components/core";
import type { Product } from "components/pricing/PricingOverview/PricingOverview";
import type {
  CustomerState,
  OrganizationRow,
} from "components/profile/Subscription/Subscriptions";
import type { Session } from "next-auth";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;
const transferOwnershipDetails =
  app.organizationSettingsPage.cta.transferOwnership;

interface Props {
  /** Authenticated user. */
  user: Session["user"];
  /** Organization details. */
  organization: OrganizationRow;
  /** Customer information derived from the signed in user. */
  customer: CustomerState | undefined;
  /** Backfeed subscription products. */
  products: Product[];
}

/** Organization settings. */
const OrganizationSettings = ({
  user,
  organization,
  customer,
  products,
}: Props) => {
  const subscription = customer?.subscriptions.find(
    (sub) => sub.metadata.organizationId === organization.rowId,
  );

  const [newOwnerMembershipId, setNewOwnerMembershipId] = useState("");

  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: numberOfOwners } = useMembersQuery(
    {
      organizationId: organization.rowId,
      roles: [Role.Owner],
    },
    {
      select: (data) => data.members?.totalCount,
    },
  );

  // NB: does not need to be prefetched from the server as the data is hidden within the transfer ownership destructive action dialog upon initial render.
  const { data: members } = useMembersQuery(
    {
      organizationId: organization.rowId,
      excludeRoles: [Role.Owner],
    },
    {
      select: (data) =>
        data.members?.nodes?.map((member) => ({
          label: `${member?.user?.firstName} ${member?.user?.lastName}`,
          value: member?.rowId,
        })),
    },
  );

  const { isOwner, membershipId } = useOrganizationMembership({
    userId: user.rowId,
    organizationId: organization.rowId,
  });

  const { mutateAsync: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
      // NB: when an organization is deleted, we want to invalidate all queries as any of them could have data for said org associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    }),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation({
      onMutate: () => router.replace("/"),
      // NB: when a user leaves an organization, we want to invalidate all queries as any of them could have data for said org associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    }),
    { mutate: transferOwnership } = useTransferOwnershipMutation({
      organizationId: organization.rowId,
    });

  const isOnlyOwner = isOwner && numberOfOwners === 1;

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    triggerLabel: deleteOrganizationDetails.destruciveAction.actionLabel,
    destructiveInput: deleteOrganizationDetails.destruciveAction.prompt,
    action: {
      label: deleteOrganizationDetails.destruciveAction.actionLabel,
      onClick: () =>
        toaster.promise(
          async () => {
            if (organization.subscriptionId) {
              const revokedSubscription = await revokeSubscription({
                subscriptionId: organization.subscriptionId,
              });

              // @ts-expect-error TODO: fix. Need to update `revokeSubscription`
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
    },
  };

  const LEAVE_ORGANIZATION: DestructiveActionProps = {
    title: leaveOrganizationDetails.destruciveAction.title,
    description: leaveOrganizationDetails.destruciveAction.description,
    triggerLabel: leaveOrganizationDetails.destruciveAction.actionLabel,
    icon: RiUserSharedLine,
    action: {
      label: leaveOrganizationDetails.destruciveAction.actionLabel,
      onClick: () =>
        leaveOrganization({
          rowId: membershipId!,
        }),
    },
  };

  const _TRANSFER_OWNERSHIP: DestructiveActionProps = {
    title: transferOwnershipDetails.title,
    description: transferOwnershipDetails.description,
    triggerLabel: transferOwnershipDetails.actionLabel,
    icon: BiTransfer,
    action: {
      label: transferOwnershipDetails.actionLabel,
      disabled: !newOwnerMembershipId.length,
      onClick: () =>
        transferOwnership({
          rowId: newOwnerMembershipId,
          patch: {
            role: Role.Owner,
          },
        }),
    },
    children: (
      <Combobox
        label={{ id: "member", singular: "Member", plural: "Members" }}
        collection={createListCollection({ items: members ?? [] })}
        placeholder="Search for or select a member..."
        colorPalette="red"
        clearTriggerProps={{
          display: newOwnerMembershipId ? "block" : "none",
        }}
        value={[newOwnerMembershipId]}
        onValueChange={({ value }) => {
          value.length
            ? setNewOwnerMembershipId(value[0])
            : setNewOwnerMembershipId("");
        }}
      />
    ),
  };

  return (
    <Stack gap={6}>
      <UpdateOrganization user={user} />

      {isOwner && (
        <SectionContainer
          title="Manage Subscription"
          description="Update your organization's subscription to unlock new benefits."
        >
          <Text>
            This organization is currently on the Backfeed{" "}
            <sigil.span color="brand.primary">
              {capitalizeFirstLetter(organization.tier)}
            </sigil.span>{" "}
            tier. Benefits included in this plan are:
          </Text>
          <Grid w="full" lineHeight={1.5}>
            {/** TODO: map over marketable features for product below. See `PricingCard` */}
          </Grid>
          <ManageSubscription
            organization={organization}
            products={products}
            customer={customer}
            trigger={<Button w="fit">Manage Subscription</Button>}
          />
        </SectionContainer>
      )}

      <SectionContainer
        title={app.organizationSettingsPage.dangerZone.title}
        description={app.organizationSettingsPage.dangerZone.description}
        outline="1px solid"
        outlineColor="omni.ruby"
      >
        <Divider />

        {!isOnlyOwner && (
          <DangerZoneAction
            title={leaveOrganizationDetails.title}
            description={leaveOrganizationDetails.description}
            actionProps={LEAVE_ORGANIZATION}
          />
        )}

        {isOwner && (
          <Stack gap={6}>
            {/* TODO: add ownership transfer when functionality is resolved. Added scope: must transfer subscription. */}

            <DangerZoneAction
              title={deleteOrganizationDetails.title}
              description={deleteOrganizationDetails.description}
              actionProps={DELETE_ORGANIZATION}
            />
          </Stack>
        )}
      </SectionContainer>
    </Stack>
  );
};

export default OrganizationSettings;
