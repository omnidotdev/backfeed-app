"use client";

import { Button, Flex, Grid, Icon, Stack } from "@omnidev/sigil";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import { OverflowText } from "components/core";
import { DashboardMetric } from "components/dashboard";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Organization ID for page routing. */
  id: string | undefined;
  /** Name of the organization. */
  name: string | null | undefined;
  /** Type of the organization. */
  type: string | null | undefined;
  /** Total number of projects. */
  totalProjects: number | undefined;
  /** Total number of users. */
  totalUsers: number | undefined;
}

/**
 * Organization card.
 */
const OrganizationCard = ({
  id,
  name,
  type,
  totalProjects,
  totalUsers,
  ...rest
}: Props) => (
  <Flex
    position="relative"
    direction="column"
    bgColor="background.subtle"
    borderRadius="lg"
    boxShadow="xs"
    p={8}
    {...rest}
  >
    <Link href={`/organizations/${id}`}>
      <Button
        position="absolute"
        top={0}
        right={0}
        p={2}
        variant="icon"
        color={{ base: "foreground.muted", _hover: "brand.primary" }}
        bgColor="transparent"
      >
        <Icon src={FiArrowUpRight} w={5} h={5} />
      </Button>
    </Link>

    <Stack gap={6} h="100%" justify="space-between">
      <Stack minH={{ base: 16, md: 24 }}>
        <OverflowText
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight="semibold"
          lineHeight={1.2}
          lineClamp={2}
        >
          {name}
        </OverflowText>

        <OverflowText
          fontSize={{ base: "xs", lg: "sm" }}
          color="foreground.subtle"
          lineClamp={2}
        >
          {type}
        </OverflowText>
      </Stack>

      <Grid columns={2} w="full" alignItems="start">
        <DashboardMetric
          type="Members"
          value={totalUsers}
          icon={HiOutlineUserGroup}
          isLoading={isLoading}
          isError={isError}
        />

        <DashboardMetric
          type="Projects"
          value={totalProjects}
          icon={HiOutlineFolder}
          isLoading={isLoading}
          isError={isError}
        />
      </Grid>
    </Stack>
  </Flex>
);

export default OrganizationCard;
