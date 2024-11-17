import { Button, Flex, Grid, Icon, Skeleton, Text } from "@omnidev/sigil";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import { OrganizationStatistic } from "components/dashboard";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  name: string;
  type: string;
  isLoaded?: boolean;
}

/**
 * Organization card.
 */
const OrganizationCard = ({ name, type, isLoaded = true, ...rest }: Props) => (
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
      <Button
        position="absolute"
        top={1}
        right={1}
        zIndex="sticky"
        p={2}
        variant="icon"
        color={{ base: "foreground.muted", _hover: "brand.primary" }}
        bgColor="transparent"
      >
        <Icon src={FiArrowUpRight} w={5} h={5} />
      </Button>

      <Flex direction="column">
        <Text
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight="semibold"
          lineHeight={1.2}
        >
          {name}
        </Text>

        <Text fontSize={{ base: "xs", lg: "sm" }} color="foreground.subtle">
          {type}
        </Text>
      </Flex>

      <Grid columns={2} mt={6} alignItems="start">
        <OrganizationStatistic
          type="Members"
          value={420}
          icon={HiOutlineUserGroup}
        />

        <OrganizationStatistic
          type="Projects"
          value={69}
          icon={HiOutlineFolder}
        />
      </Grid>
    </Flex>
  </Skeleton>
);

export default OrganizationCard;
