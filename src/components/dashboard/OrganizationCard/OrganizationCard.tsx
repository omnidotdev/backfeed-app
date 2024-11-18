import { Button, Flex, Grid, Icon, Skeleton, Text } from "@omnidev/sigil";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import Link from "next/link";

import { OrganizationMetric } from "components/dashboard";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Name of the organization. */
  name: string;
  /** Type of the organization. */
  type: string;
  /** Whether the organization data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the organization data encountered an error. */
  isError?: boolean;
  /** Organization slug for page routing */
  slug: string;
}

/**
 * Organization card.
 */
const OrganizationCard = ({
  name,
  type,
  isLoaded = true,
  isError,
  slug,
  ...rest
}: Props) => (
  <Skeleton isLoaded={isLoaded}>
    <Flex
      position="relative"
      direction="column"
      borderColor="border.subtle"
      borderRadius="lg"
      boxShadow="xs"
      p={8}
      {...rest}
    >
      <Link href={`/organization/${slug}`}>
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
        <OrganizationMetric
          type="Members"
          value={isError ? 0 : 420}
          icon={HiOutlineUserGroup}
        />

        <OrganizationMetric
          type="Projects"
          value={isError ? 0 : 69}
          icon={HiOutlineFolder}
        />
      </Grid>
    </Flex>
  </Skeleton>
);

export default OrganizationCard;
