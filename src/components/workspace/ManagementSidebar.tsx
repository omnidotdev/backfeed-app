import {
  Button,
  Drawer,
  HStack,
  Icon,
  Stack,
  useDisclosure,
} from "@omnidev/sigil";
import {
  useParams,
  useRouteContext,
  useRouterState,
} from "@tanstack/react-router";
import { LuPanelLeftOpen } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import Breadcrumb from "@/components/core/Breadcrumb";
import ManagementNavigation from "@/components/workspace/ManagementNavigation";
import app from "@/lib/config/app.config";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { PropsWithChildren } from "react";
import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

/**
 * Sidebar for workspace management. Uses drawer/modal pattern to prevent layout shift.
 */
const ManagementSidebar = ({ children }: PropsWithChildren) => {
  const segment = useRouterState({
    select: (state) => {
      const currentLocation = state.isLoading
        ? state.resolvedLocation
        : state.location;
      return currentLocation?.pathname.split("/").at(-1);
    },
  });

  const { workspaceSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage",
  });

  const { workspaceName } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage",
  });

  const isClient = useIsClient();

  const {
    isOpen: isDrawerOpen,
    onClose: onCloseDrawer,
    onToggle: onToggleDrawer,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/dashboard",
    },
    {
      label: workspaceName ?? workspaceSlug,
      to: "/workspaces/$workspaceSlug",
      params: { workspaceSlug },
    },
    {
      label: capitalizeFirstLetter(segment)!,
    },
  ];

  if (!isClient) return null;

  return (
    <>
      {/* Drawer overlay sidebar - no layout shift */}
      <Drawer
        placement="left"
        open={isDrawerOpen}
        onOpenChange={onToggleDrawer}
        bodyProps={{
          p: 0,
          pb: 6,
          borderLeftRadius: "full",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          gap: 6,
        }}
        positionerProps={{
          width: { base: "80%", sm: "sm" },
        }}
      >
        <ManagementNavigation
          isOpen={isDrawerOpen}
          onClose={onCloseDrawer}
          gap={4}
          w="full"
        />

        <Stack w="full" px={6}>
          <Button variant="ghost" onClick={onCloseDrawer}>
            Close
          </Button>
        </Stack>
      </Drawer>

      {/* Main content - full width, no sidebar space reserved */}
      <Stack position="relative" w="full" px={{ base: 0, lg: 4 }}>
        <HStack
          position="sticky"
          top="header"
          zIndex="foreground"
          py={2}
          minH={14}
          gap={2}
          style={{ backdropFilter: "blur(12px)" }}
        >
          <Button
            variant="icon"
            bgColor={{ base: "transparent", _hover: "background.subtle" }}
            color="foreground.default"
            aria-label="Open Sidebar"
            onClick={onToggleDrawer}
            ml={2}
          >
            <Icon src={LuPanelLeftOpen} h={5} w={5} />
          </Button>

          <Breadcrumb breadcrumbs={breadcrumbs} />
        </HStack>
        {children}
      </Stack>
    </>
  );
};

export default ManagementSidebar;
