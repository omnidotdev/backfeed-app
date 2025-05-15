"use client";

import { HStack, Icon, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import { Link, OverflowText } from "components/core";
import { setSingularOrPlural } from "lib/util";

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
      type: "user",
      icon: HiOutlineUserGroup,
      value: organization?.members?.totalCount,
    },
    {
      type: "project",
      icon: HiOutlineFolder,
      value: organization?.projects?.totalCount,
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
      h={36}
      justify="space-between"
      position="relative"
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
              >{`Updated ${dayjs(organization.updatedAt).fromNow()}`}</Text>
            </Stack>
          </Link>
        </Stack>
      </HStack>

      <HStack gap={4} mt={4} justifySelf="flex-end" flexWrap="wrap">
        {AGGREGATES.map(({ icon, value = 0, type }) => (
          <HStack key={type} gap={1} flexWrap="wrap">
            <Icon src={icon} w={5} h={5} color="foreground.subtle" />

            <Text
              fontSize="sm"
              color="foreground.subtle"
              fontVariant="tabular-nums"
            >
              {value} {setSingularOrPlural({ value, label: type })}
            </Text>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default OrganizationListItem;
