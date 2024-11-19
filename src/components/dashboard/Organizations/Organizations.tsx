import {
  Button,
  Collapsible,
  Flex,
  Grid,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@omnidev/sigil";
import { FiChevronDown, FiChevronUp, FiPlusCircle } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { OrganizationCard } from "components/dashboard";
import { ErrorBoundary } from "components/layout";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

interface Organization {
  /** Organization ID. */
  id: string;
  /** Organization name. */
  name: string;
  /** Organization type. */
  type: string;
}

const allOrganizations: Organization[] = [
  {
    id: "8af2410c-b73b-453f-a5c9-4637f5cbaffe",
    name: "Tech Innovators Inc.",
    type: "Technology",
  },
  {
    id: "c630fc16-1bb7-474f-9405-89401cce301a",
    name: "Green Future Solutions Green Future Solutions Green Future Solutions ",
    type: "Environmental Services Environmental Services Environmental Services",
  },
  {
    id: "aff499bc-516f-436c-9d87-2edfe1043061",
    name: "EduSpark Academy",
    type: "Education",
  },
  {
    id: "f13625fe-c2f9-47b7-a2b0-4e2073289122",
    name: "HealthPlus Clinics",
    type: "Healthcare",
  },
  {
    id: "99411095-e652-444a-a37c-5579dd15f463",
    name: "Urban Architects Co.",
    type: "Architecture",
  },
  {
    id: "4ee643e8-4290-4182-bd69-513f623a7415",
    name: "Creative Minds Studio",
    type: "Design",
  },
  {
    id: "076ccbba-de01-45db-b0fb-586553baaa8f",
    name: "MarketTrail Consulting",
    type: "Consulting",
  },
  {
    id: "1f7014fe-b766-4879-ae3e-f0e619397585",
    name: "Global Reach Logistics",
    type: "Logistics",
  },
  {
    id: "06157ff2-0959-4edc-87c5-5a6db8c551de",
    name: "Peak Performance Sports",
    type: "Sports Management",
  },
];

/**
 * Organizations section.
 */
const Organizations = () => {
  const {
      isOpen: isOrganizationCollapseOpen,
      onToggle: onToggleOrganizationCollapse,
    } = useDisclosure(),
    { isLoading, isError } = useDataState();

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
        <Stack>
          <Flex align="center" gap={2}>
            <Icon src={LuBuilding2} w={5} h={5} color="foreground.subtle" />

            <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
              {app.dashboardPage.organizations.title}
            </Text>
          </Flex>

          <Text color="foreground.subtle" fontSize="sm">
            {app.dashboardPage.organizations.description}
          </Text>
        </Stack>

        <Button
          variant={{ base: "ghost", md: "outline" }}
          ml={4}
          color="brand.primary"
          borderColor="brand.primary"
        >
          <Icon
            src={FiPlusCircle}
            w={{ base: 6, md: 4 }}
            h={{ base: 6, md: 4 }}
          />

          <Text display={{ base: "none", md: "inline" }}>
            {app.dashboardPage.cta.newOrganization.label}
          </Text>
        </Button>
      </Flex>

      {isError ? (
        <ErrorBoundary message="Error fetching organizations" h={52} />
      ) : (
        <Grid gap={6} columns={{ base: 1, md: 3 }}>
          {isLoading ? (
            <SkeletonArray count={3} h={52} />
          ) : (
            pinnedOrganizations.map(({ id, name, type }) => (
              <OrganizationCard key={id} name={name} id={id} type={type} />
            ))
          )}
        </Grid>
      )}

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
            // !NB: this is important to keep this disabled when the data is being fetched or an error is encountered from the request.
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
        {/* NB: The 1px padding is necessary to prevent clipping of the card borders / box shadows. */}
        <Grid gap={6} columns={{ base: 1, md: 3 }} p="1px">
          {restOrganizations.map(({ name, type, id }) => (
            <OrganizationCard key={id} name={name} id={id} type={type} />
          ))}
        </Grid>
      </Collapsible>
    </Flex>
  );
};

export default Organizations;
