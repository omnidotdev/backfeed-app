import { Button, Flex, Grid, Icon, Skeleton, Text } from "@omnidev/sigil";
import { FiArrowUpRight } from "react-icons/fi";

import {
  OrganizationMembers,
  OrganizationProjects,
} from "components/dashboard";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  isLoaded?: boolean;
}

const OrganizationCard = ({ isLoaded = true, ...rest }: Props) => (
  <Skeleton isLoaded={isLoaded}>
    <Flex
      position="relative"
      direction="column"
      borderColor="border.subtle"
      borderRadius="lg"
      borderWidth="1px"
      px={6}
      py={7}
      {...rest}
    >
      <Button
        position="absolute"
        top={2}
        right={2}
        zIndex="sticky"
        p={2}
        variant="icon"
        color={{ base: "foreground.muted", _hover: "brand.primary" }}
        bgColor="transparent"
      >
        <Icon src={FiArrowUpRight} w={5} h={5} />
      </Button>

      <Flex direction="column">
        <Text fontSize="lg" fontWeight="semibold" lineHeight={1.2}>
          Organization Name
        </Text>

        <Text fontSize="sm" color="foreground.subtle">
          Company Type
        </Text>
      </Flex>

      <Grid columns={2} mt={6} alignItems="start">
        <OrganizationMembers />

        <OrganizationProjects />
      </Grid>
    </Flex>
  </Skeleton>
);

export default OrganizationCard;
