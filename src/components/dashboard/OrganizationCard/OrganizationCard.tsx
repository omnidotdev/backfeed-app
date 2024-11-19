import { Button, Flex, Grid, Icon, Skeleton, Text } from "@omnidev/sigil";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import { DashboardMetric } from "components/dashboard";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Organization ID for page routing. */
  id: string;
  /** Name of the organization. */
  name: string;
  /** Type of the organization. */
  type: string;
  /** Whether the organization data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the organization data encountered an error. */
  isError?: boolean;
}

/**
 * Organization card.
 */
const OrganizationCard = ({
  id,
  name,
  type,
  isLoaded = true,
  isError = false,
  ...rest
}: Props) => (
  <Skeleton isLoaded={isLoaded}>
    <Flex
      position="relative"
      direction="column"
      borderColor="border.subtle"
      bgColor="background.subtle"
      borderRadius="lg"
      boxShadow="xs"
      p={8}
      {...rest}
    >
      <Link href={`/${id}`}>
        <Button
          position="absolute"
          top={1}
          right={1}
          p={2}
          variant="icon"
          color={{ base: "foreground.muted", _hover: "brand.primary" }}
          bgColor="transparent"
        >
          <Icon src={FiArrowUpRight} w={5} h={5} />
        </Button>
      </Link>

      <Flex direction="column">
        <Text
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight="semibold"
          lineHeight={1.2}
        >
          {isError ? "Error" : name}
        </Text>

        <Text fontSize={{ base: "xs", lg: "sm" }} color="foreground.subtle">
          {isError ? "Error" : type}
        </Text>
      </Flex>

      <Grid columns={2} mt={6} alignItems="start">
        <DashboardMetric
          type="Members"
          value={isError ? 0 : 420}
          icon={HiOutlineUserGroup}
        />

        <DashboardMetric
          type="Projects"
          value={isError ? 0 : 69}
          icon={HiOutlineFolder}
        />
      </Grid>
    </Flex>
  </Skeleton>
);

export default OrganizationCard;
