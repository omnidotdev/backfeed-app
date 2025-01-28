"use client";

import { Divider, HStack, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { RiUserSharedLine } from "react-icons/ri";

import { DestructiveAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateOrganization } from "components/organization";
import {
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useOrganizationQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;

const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;

/** Organization settings. */
const OrganizationSettings = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const { user } = useAuth();
  const router = useRouter();

  // NB: used to mock ownership
  const isOrganizationOwner = true;

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data.organizationBySlug,
    }
  );

  const { mutate: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
    }),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation({
      onMutate: () => router.replace("/"),
    });

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    triggerLabel: deleteOrganizationDetails.destruciveAction.actionLabel,
    destructiveInput:
      deleteOrganizationDetails.destruciveAction.destructiveInputPrompt,
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
          userId: user?.hidraId!,
        }),
    },
    triggerProps: {
      "aria-label": `${leaveOrganizationDetails.destruciveAction.actionLabel} organization`,
    },
  };

  const DESTRUCTIVE_ACTION = isOrganizationOwner
    ? DELETE_ORGANIZATION
    : LEAVE_ORGANIZATION;

  return (
    <Stack gap={6}>
      <UpdateOrganization />

      <SectionContainer
        title={
          isOrganizationOwner
            ? deleteOrganizationDetails.title
            : leaveOrganizationDetails.title
        }
        description={
          isOrganizationOwner
            ? deleteOrganizationDetails.description
            : leaveOrganizationDetails.description
        }
        border="1px solid"
        borderColor="omni.ruby"
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

          <DestructiveAction {...DESTRUCTIVE_ACTION} />
        </HStack>
      </SectionContainer>
    </Stack>
  );
};

export default OrganizationSettings;
