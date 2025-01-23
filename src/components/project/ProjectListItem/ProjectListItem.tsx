"use client";

import { HStack, Icon, Stack, Text } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { DestructiveAction, Link, OverflowText } from "components/core";
import { useDeleteProjectMutation } from "generated/graphql";
import { app } from "lib/config";

import type { Project } from "generated/graphql";

const deleteProjectDetails = app.projectsPage.dialogs.deleteProject;

interface Props {
  project: Partial<Project>;
  /** ! TODO remove, just used to implement dynamic ownership check for now. */
  index: number;
}

/**
 * Project list item.
 */
const ProjectListItem = ({
  project: { slug, organization, name, description, posts, rowId },
  index,
}: Props) => {
  const { mutate: deleteProject } = useDeleteProjectMutation();

  const isOrganizationOwner = index % 2 === 0;

  const AGGREGATES = [
    {
      type: "Users",
      icon: HiOutlineUserGroup,
      value: posts?.aggregates?.distinctCount?.userId ?? 0,
    },
    {
      type: "Responses",
      icon: HiOutlineChatBubbleLeftRight,
      value: posts?.totalCount ?? 0,
    },
  ];

  return (
    <Stack
      p={4}
      boxShadow="sm"
      borderRadius="sm"
      w="full"
      maxW="100%"
      mx="auto"
      h={40}
      justify="space-between"
    >
      <Stack gap={0}>
        <HStack alignItems="center" justify="space-between" minH={10}>
          <Stack maxW="65svw">
            <Link
              href={`/organizations/${organization?.slug}/projects/${slug}`}
              role="group"
            >
              <OverflowText
                fontWeight="semibold"
                whiteSpace="nowrap"
                color={{
                  base: "brand.primary.700",
                  _groupHover: {
                    base: "brand.primary.800",
                    _dark: "brand.primary.600",
                  },
                }}
              >
                {name}
              </OverflowText>
            </Link>
          </Stack>

          {/* This may best be handled in the project settings page instead of directly on the projects list. Similar to what I did for the organizations list. */}
          {isOrganizationOwner && (
            <DestructiveAction
              title={deleteProjectDetails.title}
              description={deleteProjectDetails.description}
              action={{
                label: deleteProjectDetails.action.label,
                onClick: () => deleteProject({ rowId: rowId! }),
              }}
              triggerProps={{
                "aria-label": `${deleteProjectDetails.action.label} organization`,
              }}
              buttonProps={{
                colorPalette: "omni.ruby",
                variant: "outline",
                px: "2"
              }}
            />
          )}
        </HStack>

        <OverflowText whiteSpace="nowrap" color="foreground.subtle" maxW="xl">
          {description}
        </OverflowText>
      </Stack>

      <HStack gap={4} mt={4} justifySelf="flex-end">
        {AGGREGATES.map(({ icon, value, type }) => (
          <HStack key={type} gap={1}>
            <Icon src={icon} w={5} h={5} color="foreground.subtle" />

            <Text
              fontSize="sm"
              color="foreground.subtle"
              fontVariant="tabular-nums"
            >
              {value}
            </Text>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default ProjectListItem;
