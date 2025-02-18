"use client";

import { createListCollection } from "@ark-ui/react";
import { Button, Combobox, Divider, Icon, Stack } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";

import { SectionContainer } from "components/layout";
import { DangerZoneAction, UpdateOrganization } from "components/organization";
import {
  Role,
  useCreateMemberMutation,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useMembersQuery,
  useOrganizationQuery,
  useOrganizationRoleQuery,
  useUpdateMemberMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;
const transferOwnershipDetails =
  app.organizationSettingsPage.cta.transferOwnership;
const joinOrganizationDetails =
  app.organizationSettingsPage.cta.joinOrganization;

// TODO: refactor join organization functionality. This should be invite only. This may also require additional adjustments, i.e. locking down organization settings route.

/** Organization settings. */
const OrganizationSettings = () => {
  const [newOwnerMembershipId, setNewOwnerMembershipId] = useState("");

  const queryClient = useQueryClient();

  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const router = useRouter();

  const { user } = useAuth();

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data.organizationBySlug,
    }
  );

  const { data: numberOfOwners } = useMembersQuery(
    {
      organizationId: organization?.rowId!,
      roles: [Role.Owner],
    },
    {
      enabled: !!organization,
      select: (data) => data.members?.totalCount,
    }
  );

  const { data: members } = useMembersQuery(
    {
      organizationId: organization?.rowId!,
      excludeRoles: [Role.Owner],
    },
    {
      enabled: !!organization,
      select: (data) =>
        data.members?.nodes?.map((member) => ({
          label: `${member?.user?.firstName} ${member?.user?.lastName}`,
          value: member?.rowId,
        })),
    }
  );

  const { isOwner, isMember, membershipId } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: organization?.rowId,
  });

  const onSuccess = () =>
    queryClient.invalidateQueries(
      {
        queryKey: useOrganizationRoleQuery.getKey({
          userId: user?.rowId!,
          organizationId: organization?.rowId!,
        }),
      },
      { cancelRefetch: false }
    );

  const { mutate: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
    }),
    { mutate: leaveOrganization, isPending: isLeaveOrganizationPending } =
      useLeaveOrganizationMutation({
        onSuccess,
      }),
    { mutateAsync: updateMembership } = useUpdateMemberMutation({
      onSuccess,
    }),
    { mutate: joinOrganization, isPending: isJoinOrganizationPending } =
      useCreateMemberMutation({
        onSuccess,
      });

  const isCurrentMember =
    !isLeaveOrganizationPending && (isMember || isJoinOrganizationPending);

  const isOnlyOwner = isOwner && numberOfOwners === 1;

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    triggerLabel: deleteOrganizationDetails.destruciveAction.actionLabel,
    destructiveInput: deleteOrganizationDetails.destruciveAction.prompt,
    action: {
      label: deleteOrganizationDetails.destruciveAction.actionLabel,
      onClick: () => deleteOrganization({ rowId: organization?.rowId! }),
    },
    triggerProps: {
      w: 32,
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
    triggerProps: {
      disabled:
        isJoinOrganizationPending ||
        // If the user is the only owner, they cannot leave the organization without transferring ownership, or permanently deleting it
        isOnlyOwner,
      w: 32,
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
      onClick: async () => {
        await updateMembership({
          rowId: newOwnerMembershipId,
          patch: {
            role: Role.Owner,
          },
        });

        await updateMembership({
          rowId: membershipId!,
          patch: {
            role: Role.Member,
          },
        });
      },
    },
    triggerProps: {
      w: 32,
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
      <UpdateOrganization />

      <SectionContainer
        title={
          isCurrentMember
            ? app.organizationSettingsPage.dangerZone.title
            : joinOrganizationDetails.title
        }
        description={
          isCurrentMember
            ? app.organizationSettingsPage.dangerZone.description
            : joinOrganizationDetails.description
        }
        border="1px solid"
        borderColor={isCurrentMember ? "omni.ruby" : "omni.emerald"}
      >
        <Divider />

        {isCurrentMember && !isOnlyOwner && (
          <DangerZoneAction
            title={leaveOrganizationDetails.title}
            description={leaveOrganizationDetails.description}
            actionProps={LEAVE_ORGANIZATION}
          />
        )}

        {isOwner && (
          <Stack gap={6}>
            {isOnlyOwner && (
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

        {!isCurrentMember && (
          <Button
            fontSize="md"
            colorPalette="green"
            color="white"
            disabled={isLeaveOrganizationPending}
            onClick={() =>
              joinOrganization({
                input: {
                  member: {
                    userId: user?.rowId!,
                    organizationId: organization?.rowId!,
                    role: Role.Member,
                  },
                },
              })
            }
          >
            <Icon src={RiUserAddLine} />
            {joinOrganizationDetails.actionLabel}
          </Button>
        )}
      </SectionContainer>
    </Stack>
  );
};

export default OrganizationSettings;
