"use client";

import { Button, Divider, Icon, Stack } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
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
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { BiTransfer } from "react-icons/bi";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";

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
    { mutate: joinOrganization, isPending: isJoinOrganizationPending } =
      useCreateMemberMutation({
        onSuccess,
      });

  const isCurrentMember =
    !isLeaveOrganizationPending && (isMember || isJoinOrganizationPending);

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
      "aria-label": `${deleteOrganizationDetails.destruciveAction.actionLabel} organization`,
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
      "aria-label": `${leaveOrganizationDetails.destruciveAction.actionLabel} organization`,
      disabled:
        isJoinOrganizationPending ||
        // If the user is the only owner, they cannot leave the organization without transferring ownership, or permanently deleting it
        (isOwner && (numberOfOwners == null || numberOfOwners === 1)),
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
      onClick: () => {
        // TODO: Implement transferOwnership
      },
    },
    triggerProps: {
      "aria-label": `${transferOwnershipDetails.actionLabel} of organization`,
      w: 32,
    },
  };

  return (
    <Stack gap={6}>
      <UpdateOrganization />

      <SectionContainer
        title={isCurrentMember ? "Danger Zone" : joinOrganizationDetails.title}
        description={
          isCurrentMember
            ? "Below are destructive actions that are irreversible and cannot be undone."
            : joinOrganizationDetails.description
        }
        border="1px solid"
        borderColor={isCurrentMember ? "omni.ruby" : "omni.emerald"}
      >
        <Divider />

        {isCurrentMember && (
          <DangerZoneAction
            title={leaveOrganizationDetails.title}
            description={leaveOrganizationDetails.description}
            actionProps={LEAVE_ORGANIZATION}
          />
        )}

        {isOwner && (
          <Stack gap={6}>
            <DangerZoneAction
              title={transferOwnershipDetails.title}
              description={transferOwnershipDetails.description}
              actionProps={TRANSFER_OWNERSHIP}
            />

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
