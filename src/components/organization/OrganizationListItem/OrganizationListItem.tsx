import {
  Button,
  Dialog,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@omnidev/sigil";
import Link from "next/link";
import {
  HiOutlineFolder,
  HiOutlineTrash,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { OverflowText } from "components/core";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";

interface DeleteOrganizationAction extends ButtonProps {
  /** Action label. */
  label: string;
}

export interface Organization {
  /** Organization ID. */
  id: string;
  /** Organization name. */
  name: string;
  /** Organization type. */
  type: string;
}

/** Mock aggregates for the organization. Will be replaced with real data, and fetched at this level in the future. */
const AGGREGATES = [
  {
    type: "Users",
    icon: HiOutlineUserGroup,
    value: 69,
  },
  {
    type: "Projects",
    icon: HiOutlineFolder,
    value: 420,
  },
];

/**
 * Organization list item.
 */
const OrganizationListItem = ({ id, name, type }: Organization) => {
  const { isLoading, isError } = useDataState({ timeout: 500 });

  const {
    isOpen: isDeleteOrganizationOpen,
    onClose: onCloseDeleteOrganization,
    onToggle: onToggleDeleteOrganization,
  } = useDisclosure();

  const DELETE_ORGANIZATION_DIALOG_ACTIONS: DeleteOrganizationAction[] = [
    {
      label: app.organizationsPage.dialogs.deleteOrganization.cta.delete.label,
      // TODO: handle delete organization
      onClick: onCloseDeleteOrganization,
      bgColor: "danger",
    },
    {
      label: app.organizationsPage.dialogs.deleteOrganization.cta.cancel.label,
      onClick: onCloseDeleteOrganization,
      variant: "outline",
    },
  ];

  return (
    <Stack
      p={4}
      boxShadow="sm"
      borderRadius="sm"
      w="full"
      maxW="100%"
      mx="auto"
      h={36}
    >
      <HStack alignItems="flex-start" justify="space-between">
        {/* ! NB: explicit maxW prevents overflow from pushing the dialog trigger outside of the container on smaller viewports */}
        <Stack maxW="65svw">
          <Link href={`/organizations/${id}`} role="group">
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
              {name}
            </OverflowText>
          </Link>

          <OverflowText color="foreground.subtle" maxW="xl" whiteSpace="nowrap">
            {type}
          </OverflowText>
        </Stack>

        {/* @ts-ignore TODO: figure out why this is throwing an error */}
        <Dialog
          title={app.organizationsPage.dialogs.deleteOrganization.title}
          description={
            app.organizationsPage.dialogs.deleteOrganization.description
          }
          open={isDeleteOrganizationOpen}
          onOpenChange={onToggleDeleteOrganization}
          trigger={
            <Button
              variant="ghost"
              p={1}
              bgColor="transparent"
              color={{
                base: "omni.ruby",
                _hover: {
                  base: "omni.ruby.700",
                  _dark: "omni.ruby.400",
                },
              }}
            >
              <Icon src={HiOutlineTrash} w={5} h={5} />
            </Button>
          }
        >
          <HStack>
            {DELETE_ORGANIZATION_DIALOG_ACTIONS.map(({ label, ...rest }) => (
              <Button key={label} flex={1} {...rest}>
                {label}
              </Button>
            ))}
          </HStack>
        </Dialog>
      </HStack>

      <HStack gap={4} mt={4} justifySelf="flex-end">
        {AGGREGATES.map(({ icon, value, type }) => (
          <HStack key={type} gap={1}>
            <Icon src={icon} w={5} h={5} color="foreground.subtle" />

            <Skeleton
              isLoaded={!isLoading}
              h={4}
              display="flex"
              alignItems="center"
              minW={6}
            >
              <Text
                fontSize="sm"
                color="foreground.subtle"
                fontVariant="tabular-nums"
              >
                {isError ? "Error" : value}
              </Text>
            </Skeleton>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default OrganizationListItem;
