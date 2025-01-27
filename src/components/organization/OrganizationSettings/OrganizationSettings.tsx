"use client";

import { Button, Divider, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";

import { DestructiveAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateOrganization } from "components/organization";
import {
  Role,
  useCreateUserOrganizationMutation,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useOrganizationQuery,
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

// TODO: discuss joining an organization. Should this be invite only?

/** Organization settings. */
const OrganizationSettings = () => {
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

  const { isOwner, isMember } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: organization?.rowId,
  });

  const { mutate: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
    }),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation(),
    { mutate: joinOrganization, isPending: isJoinOrganizationPending } =
      useCreateUserOrganizationMutation();

  const isCurrentMember = isMember || isJoinOrganizationPending;

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    triggerLabel: deleteOrganizationDetails.destruciveAction.actionLabel,
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
          organizationId: organization?.rowId!,
          userId: user?.rowId!,
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
              onClick={() =>
                joinOrganization({
                  input: {
                    userOrganization: {
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
