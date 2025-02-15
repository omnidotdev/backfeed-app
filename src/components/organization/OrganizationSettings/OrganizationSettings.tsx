"use client";

import { Button, Divider, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";

import { DestructiveAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateOrganization } from "components/organization";
import {
  Role,
  useCreateMemberMutation,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useOrganizationQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;

const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;
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
      disabled: isJoinOrganizationPending,
    },
  };

  const DESTRUCTIVE_ACTION = isOwner ? DELETE_ORGANIZATION : LEAVE_ORGANIZATION;

  return (
    <Stack gap={6}>
      <UpdateOrganization />

      <SectionContainer
        title={
          isCurrentMember
            ? isOwner
              ? deleteOrganizationDetails.title
              : leaveOrganizationDetails.title
            : joinOrganizationDetails.title
        }
        description={
          isCurrentMember
            ? isOwner
              ? deleteOrganizationDetails.description
              : leaveOrganizationDetails.description
            : joinOrganizationDetails.description
        }
        border="1px solid"
        borderColor={isCurrentMember ? "omni.ruby" : "omni.emerald"}
      >
        <Divider />

        <HStack alignItems="center" justifyContent="space-between">
          <Stack gap={1}>
            <Text fontWeight="semibold">{organization?.name}</Text>

            <Text
              fontSize="sm"
              color="foreground.muted"
            >{`Updated: ${dayjs(organization?.updatedAt).fromNow()}`}</Text>
          </Stack>

          {isCurrentMember ? (
            <DestructiveAction {...DESTRUCTIVE_ACTION} />
          ) : (
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
        </HStack>
      </SectionContainer>
    </Stack>
  );
};

export default OrganizationSettings;
