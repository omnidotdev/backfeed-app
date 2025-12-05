import { Button, Flex, Grid, Icon, Stack } from "@omnidev/sigil";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import OverflowText from "@/components/core/OverflowText";
import DashboardMetric from "@/components/dashboard/DashboardMetric";

import type { FlexProps } from "@omnidev/sigil";
import type { Organization } from "@/generated/graphql";

interface Props extends FlexProps {
  /** Organization details. */
  organization: Partial<Organization>;
}

/**
 * Organization card.
 */
const OrganizationCard = ({ organization, ...rest }: Props) => (
  <Flex
    position="relative"
    direction="column"
    bgColor="card-item"
    borderRadius="lg"
    p={6}
    {...rest}
  >
    <Button
      position="absolute"
      top={0}
      right={0}
      p={2}
      variant="icon"
      color={{ base: "foreground.muted", _groupHover: "brand.primary" }}
      bgColor="transparent"
    >
      <Icon src={FiArrowUpRight} w={5} h={5} />
    </Button>

    <Stack gap={6} h="100%" justify="space-between">
      <Stack minH={{ base: 16, md: 24 }}>
        <OverflowText
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight="semibold"
          lineHeight={1.2}
          lineClamp={2}
        >
          {organization?.name}
        </OverflowText>
      </Stack>

      <Grid columns={2} w="full" alignItems="start">
        <DashboardMetric
          type="member"
          value={organization?.members?.totalCount}
          icon={HiOutlineUserGroup}
        />

        <DashboardMetric
          type="project"
          value={organization?.projects?.totalCount}
          icon={HiOutlineFolder}
        />
      </Grid>
    </Stack>
  </Flex>
);

export default OrganizationCard;
