import {
  Button,
  Collapsible,
  Flex,
  Grid,
  Icon,
  Text,
  useDisclosure,
} from "@omnidev/sigil";
import { FiChevronDown, FiChevronUp, FiPlusCircle } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

import { OrganizationCard } from "components/dashboard";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

const ORGANIZATION = {
  name: "Organization Name",
  type: "Company Type",
};

/**
 * Organizations section.
 */
const Organizations = () => {
  const {
      isOpen: isOrganizationCollapseOpen,
      onToggle: onToggleOrganizationCollapse,
    } = useDisclosure(),
    { isLoading, isError } = useDataState();

  const allOrganizations = Array(9).fill(ORGANIZATION);
  const pinnedOrganizations = allOrganizations.slice(0, 3);
  const restOrganizations = allOrganizations.slice(3);

  return (
    <Flex
      direction="column"
      bgColor="background.default"
      w="100%"
      borderRadius="lg"
      boxShadow="lg"
      borderColor="border.subtle"
      p={6}
      gap={6}
    >
      <Flex justify="space-between">
        <Flex direction="column">
          <Flex align="center" gap={2}>
            <Icon src={LuBuilding2} w={5} h={5} color="foreground.subtle" />

            <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
              {app.dashboardPage.organizations.title}
            </Text>
          </Flex>

          <Text color="foreground.subtle" fontSize="sm">
            {app.dashboardPage.organizations.description}
          </Text>
        </Flex>

        <Button variant="outline" ml={4}>
          <Icon src={FiPlusCircle} w={4} h={4} />
          <Text display={{ base: "none", md: "inline" }}>New Organization</Text>
        </Button>
      </Flex>

      <Grid gap={6} alignItems="center" columns={{ base: 1, md: 3 }}>
        {pinnedOrganizations.map(({ name, type }, index) => (
          <OrganizationCard
            // biome-ignore lint/suspicious/noArrayIndexKey: index needed as key for the time being
            key={`${name}-${index}`}
            name={name}
            type={type}
            isLoaded={!isLoading}
            isError={isError}
          />
        ))}
      </Grid>

      {/* @ts-ignore TODO figure out why this is throwing an error */}
      <Collapsible
        trigger={
          <Button
            variant="icon"
            w="fit-content"
            bgColor="transparent"
            opacity={{
              base: { base: 1, _disabled: 0.8 },
              _hover: 0.8,
            }}
            placeSelf="center"
            my={-4}
            disabled={isLoading || isError}
          >
            <Icon
              src={isOrganizationCollapseOpen ? FiChevronUp : FiChevronDown}
              w={8}
              h={8}
              color="foreground.subtle"
              placeSelf="center"
            />
          </Button>
        }
        flexDirection="column-reverse"
        gap={6}
        open={isOrganizationCollapseOpen}
        onOpenChange={onToggleOrganizationCollapse}
      >
        {/* NB: The 1px padding is necessary to prevet clipping of the card borders / box shadows. */}
        <Grid gap={6} alignItems="center" columns={{ base: 1, md: 3 }} p="1px">
          {restOrganizations.map(({ name, type }, index) => (
            <OrganizationCard
              // biome-ignore lint/suspicious/noArrayIndexKey: index needed as key for the time being
              key={`${name}-${index}`}
              name={name}
              type={type}
              isLoaded={!isLoading}
            />
          ))}
        </Grid>
      </Collapsible>
    </Flex>
  );
};

export default Organizations;
