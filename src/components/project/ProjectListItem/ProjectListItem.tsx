"use client";

import { Button, Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { Link, OverflowText } from "components/core";
import { useAuth, useOrganizationMembership } from "lib/hooks";
import { setSingularOrPlural } from "lib/util";

import type { Project } from "generated/graphql";

interface Props {
  project: Partial<Project>;
}

/**
 * Project list item.
 */
const ProjectListItem = ({
  project: { slug, organization, name, description, posts },
}: Props) => {
  const { user } = useAuth();

  const { isAdmin } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: organization?.rowId,
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
    <Stack
      p={4}
      boxShadow="card"
      borderRadius="sm"
      w="full"
      maxW="100%"
      mx="auto"
      h={40}
      justify="space-between"
      position="relative"
    >
      <Stack gap={0}>
        <HStack alignItems="center" justify="space-between">
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

          {isAdmin && (
            <Flex position="absolute" right={0} top={0} m={2}>
              <Link
                href={`${`/organizations/${organization?.slug}/projects/${slug}/settings`}`}
              >
                <Button variant="ghost" px="2">
                  <Icon src={LuSettings} w={5} h={5} color="foreground.muted" />
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
  );
};

export default ProjectListItem;
