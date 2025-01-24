"use client";

import { Button, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import dayjs from "dayjs";

import { Link, OverflowText } from "components/core";

import type { Organization } from "generated/graphql";

interface Props {
  /** Organization details. */
  organization: Partial<Organization>;
}

/**
 * Organization list item.
 */
const OrganizationListItem = ({ organization }: Props) => {
  const AGGREGATES = [
    {
      type: "Users",
      icon: HiOutlineUserGroup,
      value: organization?.userOrganizations?.totalCount,
    },
    {
      type: "Projects",
      icon: HiOutlineFolder,
      value: organization?.projects?.totalCount,
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
      h={36}
      justify="space-between"
    >
      <HStack alignItems="flex-start" justify="space-between">
        {/* ! NB: explicit maxW prevents overflow from pushing the dialog trigger outside of the container on smaller viewports */}
        <Stack maxW="65svw">
          <Link href={`/organizations/${organization?.slug}`} role="group">
            <Stack gap={1}>
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
                {organization?.name}
              </OverflowText>

              <Text
                fontSize="sm"
                color="foreground.muted"
              >{`Updated: ${dayjs(organization.updatedAt).fromNow()}`}</Text>
            </Stack>
          </Link>
        </Stack>

        <Link href={`${`/organizations/${organization.slug}/settings`}`}>
          <Button variant="ghost" px="2">
            <Icon src={LuSettings} w={5} h={5} color="foreground.muted" />
          </Button>
        </Link>
      </HStack>

      <HStack gap={4} mt={4} justifySelf="flex-end">
        {AGGREGATES.map(({ icon, value = 0, type }) => (
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

export default OrganizationListItem;
