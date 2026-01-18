import { Button, Flex, HStack, Icon, Stack, Text, css } from "@omnidev/sigil";
import { Link, useRouteContext } from "@tanstack/react-router";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import OverflowText from "@/components/core/OverflowText";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

import type { Project } from "@/generated/graphql";

interface Props {
  /** Project details. */
  project: Partial<Project>;
  /** Workspace slug from organization context. */
  workspaceSlug: string;
}

/**
 * Project list item.
 */
const ProjectListItem = ({
  project: { slug, name, description, posts },
  workspaceSlug,
}: Props) => {
  const { hasAdminPrivileges } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/",
  });

  const AGGREGATES = [
    {
      type: "user",
      icon: HiOutlineUserGroup,
      value: posts?.aggregates?.distinctCount?.userId ?? 0,
    },
    {
      type: "response",
      icon: HiOutlineChatBubbleLeftRight,
      value: posts?.totalCount ?? 0,
    },
  ];

  return (
    <Link
      to="/workspaces/$workspaceSlug/projects/$projectSlug"
      params={{
        workspaceSlug,
        projectSlug: slug!,
      }}
      role="group"
    >
      <Stack
        p={4}
        bgColor="card-item"
        borderRadius="xl"
        borderWidth="1px"
        borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
        w="full"
        maxW="100%"
        mx="auto"
        h={40}
        justify="space-between"
        position="relative"
        cursor="pointer"
        className={css({
          transition: "all 0.2s ease",
          _groupHover: {
            bgColor: { base: "neutral.100", _dark: "neutral.800" },
          },
        })}
      >
        <Stack gap={0}>
          <HStack alignItems="center" justify="space-between">
            <Stack maxW="65svw">
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
            </Stack>

            {hasAdminPrivileges && (
              <Flex position="absolute" right={0} top={0} m={2}>
                <Link
                  to="/workspaces/$workspaceSlug/projects/$projectSlug/settings"
                  params={{
                    workspaceSlug,
                    projectSlug: slug!,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" px="2">
                    <Icon
                      src={LuSettings}
                      w={5}
                      h={5}
                      color="foreground.muted"
                    />
                  </Button>
                </Link>
              </Flex>
            )}
          </HStack>

          <OverflowText whiteSpace="nowrap" color="foreground.subtle" maxW="xl">
            {description}
          </OverflowText>
        </Stack>

        <HStack gap={4} mt={4} justifySelf="flex-end" flexWrap="wrap">
          {AGGREGATES.map(({ icon, value, type }) => (
            <HStack key={type} gap={1} flexWrap="wrap">
              <Icon src={icon} w={5} h={5} color="foreground.subtle" />

              <Text
                fontSize="sm"
                color="foreground.subtle"
                fontVariant="tabular-nums"
              >
                {value} {setSingularOrPlural({ value: +value, label: type })}
              </Text>
            </HStack>
          ))}
        </HStack>
      </Stack>
    </Link>
  );
};

export default ProjectListItem;
