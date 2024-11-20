import { Button, Flex, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import { DashboardMetric } from "components/dashboard";
import { useDataState } from "lib/hooks";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Organization ID for page routing. */
  id: string;
  /** Name of the organization. */
  name: string;
  /** Type of the organization. */
  type: string;
}

/**
 * Organization card.
 */
const OrganizationCard = ({ id, name, type, ...rest }: Props) => {
  // !NB: this is to represent where we would want to fetch the aggregate data (total members and projects). This will keep the top level `organizationsQuery` clean.
  const { isLoading, isError } = useDataState({ timeout: 800 });

  return (
    <Flex
      position="relative"
      direction="column"
      bgColor="background.subtle"
      borderRadius="lg"
      boxShadow="xs"
      p={8}
      {...rest}
    >
      <Link href={`/${id}`}>
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
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            fontWeight="semibold"
            lineHeight={1.2}
            lineClamp={2}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Text>

          <Text
            fontSize={{ base: "xs", lg: "sm" }}
            color="foreground.subtle"
            lineClamp={2}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {type}
          </Text>
        </Stack>

        <Grid columns={2} w="full" alignItems="start">
          <DashboardMetric
            type="Members"
            value={420}
            icon={HiOutlineUserGroup}
            isLoading={isLoading}
            isError={isError}
          />

          <DashboardMetric
            type="Projects"
            value={69}
            icon={HiOutlineFolder}
            isLoading={isLoading}
            isError={isError}
          />
        </Grid>
      </Stack>
    </Flex>
  );
};

export default OrganizationCard;
