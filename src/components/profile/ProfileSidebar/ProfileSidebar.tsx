"use client";

import {
  Button,
  Drawer,
  HStack,
  Icon,
  Stack,
  useDisclosure,
} from "@omnidev/sigil";
import { useSelectedLayoutSegment } from "next/navigation";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { useLocalStorage } from "usehooks-ts";

import { Breadcrumb } from "components/core";
import { ProfileNavigation } from "components/profile";
import { useAuth, useDebounceValue, useViewportSize } from "lib/hooks";
import { capitalizeFirstLetter } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import type { PropsWithChildren } from "react";

/**
 * Sidebar for profile page. Used for navigation between profile pages.
 */
const ProfileSidebar = ({ children }: PropsWithChildren) => {
  const isLargeViewport = useViewportSize({ minWidth: "64em" });
  const segment = useSelectedLayoutSegment();
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "profile-management-sidebar",
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

  const [debouncedIsOpen] = useDebounceValue({
    value: isSidebarOpen,
    delay: 100,
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: capitalizeFirstLetter(segment)!,
    },
  ];

  const isOpen = isLargeViewport ? isSidebarOpen : isDrawerOpen;

  return (
    <>
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
          <ProfileNavigation
            username={user?.username}
            email={user?.email!}
            isOpen={debouncedIsOpen}
            truncateText={!debouncedIsOpen}
            position="sticky"
            gap={0}
            top="header"
            zIndex="sticky"
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
          <ProfileNavigation
            username={user?.username}
            email={user?.email!}
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
        h="full"
      >
        <HStack
          position="sticky"
          top="header"
          zIndex="foreground"
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
    </>
  );
};

export default ProfileSidebar;
