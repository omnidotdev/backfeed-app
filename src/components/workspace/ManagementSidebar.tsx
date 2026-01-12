import {
  Button,
  Drawer,
  HStack,
  Icon,
  Stack,
  useDisclosure,
} from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  useRouteContext,
  useRouterState,
} from "@tanstack/react-router";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { useDebounceValue, useIsClient, useLocalStorage } from "usehooks-ts";

import Breadcrumb from "@/components/core/Breadcrumb";
import ManagementNavigation from "@/components/workspace/ManagementNavigation";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import useViewportSize from "@/lib/hooks/useViewportSize";
import { workspaceOptions } from "@/lib/options/workspaces";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { PropsWithChildren } from "react";
import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

/**
 * Sidebar for workspace management. Used for navigation between workspace management pages.
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

  const { organizationId, workspaceName } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage",
  });

  const isLargeViewport = useViewportSize({
    minWidth: token("breakpoints.lg"),
  });

  const isClient = useIsClient();

  useQuery({
    ...workspaceOptions({
      organizationId,
    }),
    select: (data) => data?.workspaceByOrganizationId,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "workspace-management-sidebar",
    true,
  );

  const onToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const {
    isOpen: isDrawerOpen,
    onClose: onCloseDrawer,
    onToggle: onToggleDrawer,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const [debouncedIsOpen] = useDebounceValue(isSidebarOpen, 100);

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/workspaces",
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

  const isOpen = isLargeViewport ? isSidebarOpen : isDrawerOpen;

  if (!isClient) return null;

  return (
    <HStack h="full" w="full" gap={0}>
      {/* TODO: extract ternary part into a separate component. Use early returns there, and import above to separate logic from rendering. */}
      {isLargeViewport ? (
        <Stack
          ref={() => {
            if (isDrawerOpen) {
              onCloseDrawer();
            }
          }}
          position="relative"
          h="full"
          w={isSidebarOpen ? "xs" : 16}
          borderRightWidth="1px"
          borderColor="border.subtle"
          transition="all 200ms ease-in-out"
          gap={0}
        >
          <ManagementNavigation
            position="sticky"
            gap={0}
            top="header"
            zIndex="sticky"
            isOpen={debouncedIsOpen}
            truncateText={!debouncedIsOpen}
          />
        </Stack>
      ) : (
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
      )}

      <Stack
        position="relative"
        w="full"
        placeSelf="flex-start"
        px={{ base: 0, lg: 4 }}
      >
        <HStack
          position="sticky"
          top="header"
          zIndex="foreground"
          py={2}
          ml={{ base: 0, lg: -4 }}
          minH={14}
          gap={2}
          style={{ backdropFilter: "blur(12px)" }}
        >
          <Button
            variant="icon"
            bgColor={{ base: "transparent", _hover: "background.subtle" }}
            color="foreground.default"
            aria-label="Toggle Sidebar"
            onClick={isLargeViewport ? onToggleSidebar : onToggleDrawer}
            ml={2}
          >
            <Icon
              src={isOpen ? LuPanelLeftClose : LuPanelLeftOpen}
              h={5}
              w={5}
            />
          </Button>

          <Breadcrumb breadcrumbs={breadcrumbs} />
        </HStack>
        {children}
      </Stack>
    </HStack>
  );
};

export default ManagementSidebar;
