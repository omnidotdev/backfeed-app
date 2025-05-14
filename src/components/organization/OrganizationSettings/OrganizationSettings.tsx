"use client";

import { createListCollection } from "@ark-ui/react";
import { Combobox, Divider, Stack } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { RiUserSharedLine } from "react-icons/ri";

import { DangerZoneAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateOrganization } from "components/organization";
import {
  Role,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useMembersQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";
import { useTransferOwnershipMutation } from "lib/hooks/mutations";

import type { DestructiveActionProps } from "components/core";
import type { Organization } from "generated/graphql";
import { revalidatePath } from "lib/actions";
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
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Whether the transfer ownership functionality is enabled. */
  isOwnershipTransferEnabled: boolean;
}

/** Organization settings. */
const OrganizationSettings = ({
  user,
  organizationId,
  isOwnershipTransferEnabled,
}: Props) => {
  const [newOwnerMembershipId, setNewOwnerMembershipId] = useState("");

  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: numberOfOwners } = useMembersQuery(
    {
      organizationId,
      roles: [Role.Owner],
    },
    {
      select: (data) => data.members?.totalCount,
    },
  );

  // NB: does not need to be prefetched from the server as the data is hidden within the transfer ownership destructive action dialog upon initial render.
  // TODO: include variable(s) to filter out members that are an owner of another org *if* they have a basic tier subscription
  const { data: members } = useMembersQuery(
    {
      organizationId,
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
    organizationId,
  });

  const { mutateAsync: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
      // NB: when an organization is deleted, we want to invalidate all queries as any of them could have data for said org associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    }),
    { mutateAsync: leaveOrganization } = useLeaveOrganizationMutation({
      onMutate: () => router.replace("/"),
      // NB: when a user leaves an organization, we want to invalidate all queries as any of them could have data for said org associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    }),
    { mutate: transferOwnership } = useTransferOwnershipMutation({
      organizationId,
    });

  const isOnlyOwner = isOwner && numberOfOwners === 1;

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    triggerLabel: deleteOrganizationDetails.destruciveAction.actionLabel,
    destructiveInput: deleteOrganizationDetails.destruciveAction.prompt,
    action: {
      label: deleteOrganizationDetails.destruciveAction.actionLabel,
      onClick: async () => {
        await deleteOrganization({ rowId: organizationId });

        revalidatePath("/", "layout");
      },
    },
  };

  const LEAVE_ORGANIZATION: DestructiveActionProps = {
    title: leaveOrganizationDetails.destruciveAction.title,
    description: leaveOrganizationDetails.destruciveAction.description,
    triggerLabel: leaveOrganizationDetails.destruciveAction.actionLabel,
    icon: RiUserSharedLine,
    action: {
      label: leaveOrganizationDetails.destruciveAction.actionLabel,
      onClick: async () => {
        await leaveOrganization({
          rowId: membershipId!,
        });

        revalidatePath("/", "layout");
      },
    },
  };

  const TRANSFER_OWNERSHIP: DestructiveActionProps = {
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
            {/* TODO: remove `isOwnershipTransferEnabled` flag when functionality for ownership transfers is resolved. */}
            {isOnlyOwner && isOwnershipTransferEnabled && (
              <DangerZoneAction
                title={transferOwnershipDetails.title}
                description={transferOwnershipDetails.description}
                actionProps={TRANSFER_OWNERSHIP}
              />
            )}

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
