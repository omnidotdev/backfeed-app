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
import {
  HiOutlineFolder,
  HiOutlineTrash,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { OverflowText } from "components/core";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";
import type { MouseEvent } from "react";

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
const OrganizationListItem = ({ name, type }: Organization) => {
  const { isLoading, isError } = useDataState({ timeout: 500 });

  const {
    isOpen: isDeleteOrganizationOpen,
    onClose: onCloseDeleteOrganization,
    onOpen: onOpenDeleteOrganization,
  } = useDisclosure();

  const handleDeleteOrganizationDialogState = (
    e: MouseEvent<HTMLButtonElement>,
    type: "close" | "open" = "close"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    type === "open" ? onOpenDeleteOrganization() : onCloseDeleteOrganization();
  };

  const DELETE_ORGANIZATION_DIALOG_ACTIONS: DeleteOrganizationAction[] = [
    {
      label: app.organizationsPage.dialogs.deleteOrganization.cta.delete.label,
      // TODO: handle delete organization
      onClick: handleDeleteOrganizationDialogState,
      bgColor: "danger",
    },
    {
      label: app.organizationsPage.dialogs.deleteOrganization.cta.cancel.label,
      onClick: handleDeleteOrganizationDialogState,
      variant: "outline",
    },
  ];

  return (
    <Stack
      p={4}
      boxShadow="sm"
      borderWidth="1px"
      borderColor={{ base: "transparent", _hover: "border.subtle" }}
      borderRadius="sm"
      maxW="100%"
      mx="auto"
      h={36}
    >
      <HStack alignItems="flex-start" justify="space-between">
        {/* ! NB: explicit maxW prevents overflow from pushing the dialog trigger outside of the container on smaller viewports */}
        <Stack maxW="65svw">
          <OverflowText fontWeight="semibold" whiteSpace="nowrap">
            {name}
          </OverflowText>

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
          onInteractOutside={handleDeleteOrganizationDialogState}
          trigger={
            <Button
              variant="ghost"
              p={1}
              role="group"
              bgColor="transparent"
              onClick={(e) => handleDeleteOrganizationDialogState(e, "open")}
            >
              <Icon
                src={HiOutlineTrash}
                w={5}
                h={5}
                color={{
                  base: "omni.ruby",
                  _groupHover: {
                    base: "omni.ruby.300",
                    _dark: "omni.ruby.800",
                  },
                }}
              />
            </Button>
          }
          closeTriggerProps={{
            onClick: handleDeleteOrganizationDialogState,
          }}
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
