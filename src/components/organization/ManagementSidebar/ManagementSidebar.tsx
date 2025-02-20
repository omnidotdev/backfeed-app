"use client";

import {
  Button,
  Drawer,
  HStack,
  Icon,
  Stack,
  useDisclosure,
} from "@omnidev/sigil";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

import { Breadcrumb } from "components/core";
import { ManagementNavigation } from "components/organization";
import { useOrganizationQuery } from "generated/graphql";
import { app } from "lib/config";
import { useDebounceValue } from "lib/hooks";
import { capitalizeFirstLetter } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import type { PropsWithChildren } from "react";

/**
 * Sidebar for organization management. Used for navigation between organization management pages.
 */
const ManagementSidebar = ({ children }: PropsWithChildren) => {
  // Used in favor of `useBreakpointValue` as the fallback to `base` breaks logic for initializing the open state of the sidebar
  const isLargeDisplay = useMediaQuery("(min-width: 1025px)");

  const segment = useSelectedLayoutSegment();

  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data?.organizationBySlug,
    }
  );

  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "organization-management-sidebar",
    true
  );

  const onToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const {
    isOpen: isDrawerOpen,
    onClose: onCloseDrawer,
    onToggle: onToggleDrawer,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const [debouncedIsOpen] = useDebounceValue({
    value: isSidebarOpen,
    delay: 100,
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization?.name ?? organizationSlug,
      href: `/organizations/${organizationSlug}`,
    },
    {
      label: capitalizeFirstLetter(segment!),
    },
  ];

  const isOpen = isLargeDisplay ? isSidebarOpen : isDrawerOpen;

  useEffect(() => {
    if (isLargeDisplay && isDrawerOpen) {
      onCloseDrawer();
    }
  }, [isLargeDisplay, isDrawerOpen, onCloseDrawer]);

  return (
    <>
      {isLargeDisplay ? (
        <Stack
          position="relative"
          h="full"
          w={isSidebarOpen ? "xs" : 14}
          borderRightWidth="1px"
          borderColor="border.subtle"
          transition="all 200ms ease-in-out"
          gap={0}
        >
          {/* TODO: update `top` position for ManagementSidebar on the `sticky` positioned element when banner is removed */}
          <ManagementNavigation
            position="sticky"
            gap={0}
            top={40}
            zIndex="sticky"
            organizationSlug={organizationSlug}
            organizationName={organization?.name!}
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
            organizationSlug={organizationSlug}
            organizationName={organization?.name!}
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
        {/* TODO: update `top` position for ManagementSidebar on the `sticky` positioned element when banner is removed */}
        <HStack
          position="sticky"
          top={40}
          zIndex="sticky"
          py={2}
          ml={{ base: 0, lg: -4 }}
          minH={14}
          bgColor="background.default"
          gap={2}
        >
          <Button
            variant="icon"
            bgColor={{ base: "transparent", _hover: "background.subtle" }}
            color="foreground.default"
            aria-label="Toggle Sidebar"
            onClick={isLargeDisplay ? onToggleSidebar : onToggleDrawer}
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
    </>
  );
};

export default ManagementSidebar;
