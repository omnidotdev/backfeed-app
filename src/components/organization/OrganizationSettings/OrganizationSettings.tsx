"use client";

import { createListCollection } from "@ark-ui/react";
import { Button, Combobox, Divider, Icon, Stack } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";

import { DangerZoneAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateOrganization } from "components/organization";
import {
  Role,
  useCreateMemberMutation,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useMembersQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";
import { useTransferOwnershipMutation } from "lib/hooks/mutations";

import type { DestructiveActionProps } from "components/core";
import type { Organization } from "generated/graphql";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;
const transferOwnershipDetails =
  app.organizationSettingsPage.cta.transferOwnership;
const joinOrganizationDetails =
  app.organizationSettingsPage.cta.joinOrganization;

interface Props {
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Whether the application is currently running in a development environment. */
  developmentFlag: boolean;
}

/** Organization settings. */
const OrganizationSettings = ({ organizationId, developmentFlag }: Props) => {
  const [newOwnerMembershipId, setNewOwnerMembershipId] = useState("");

  const queryClient = useQueryClient();

  const router = useRouter();

  const { user } = useAuth();

  const { data: numberOfOwners } = useMembersQuery(
    {
      organizationId,
      roles: [Role.Owner],
    },
    {
      select: (data) => data.members?.totalCount,
    }
  );

  // NB: does not need to be prefetched from the server as the data is hidden within the transfer ownership destructive action dialog upon initial render.
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
    }
  );

  const { isOwner, isMember, membershipId } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const onSettled = () =>
    queryClient.invalidateQueries({
      queryKey: useOrganizationRoleQuery.getKey({
        userId: user?.rowId!,
        organizationId,
      }),
    });

  const { mutate: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
    }),
    { mutate: leaveOrganization, isPending: isLeaveOrganizationPending } =
      useLeaveOrganizationMutation({
        onSettled,
      }),
    { mutate: transferOwnership } = useTransferOwnershipMutation({
      organizationId,
    }),
    { mutate: joinOrganization, isPending: isJoinOrganizationPending } =
      useCreateMemberMutation({
        onSettled,
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
      onClick: () => deleteOrganization({ rowId: organizationId }),
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
      disabled: isJoinOrganizationPending,
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
      <UpdateOrganization />

      {/* NB: if the user is not currently a member, the only action that would be available is to join the organization, which we are currently putting behind a feature flag (only allowed in development). */}
      {(isCurrentMember || developmentFlag) && (
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
          outline="1px solid"
          outlineColor={isCurrentMember ? "omni.ruby" : "omni.emerald"}
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
              w="fit"
              placeSelf="flex-end"
              disabled={isLeaveOrganizationPending}
              onClick={() =>
                joinOrganization({
                  input: {
                    member: {
                      userId: user?.rowId!,
                      organizationId,
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
      )}
    </Stack>
  );
};

export default OrganizationSettings;
