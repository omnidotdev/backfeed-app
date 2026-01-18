import {
  Button,
  Drawer,
  HStack,
  Icon,
  Stack,
  useDisclosure,
} from "@omnidev/sigil";
import { LuPanelLeftOpen } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import ProfileNavigation from "@/components/profile/ProfileNavigation";

import type { PropsWithChildren } from "react";

/**
 * Sidebar for profile page. Uses drawer/modal pattern to prevent layout shift.
 */
const ProfileSidebar = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();

  const {
    isOpen: isDrawerOpen,
    onClose: onCloseDrawer,
    onToggle: onToggleDrawer,
  } = useDisclosure({
    defaultIsOpen: false,
  });

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
        <ProfileNavigation
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
      <Stack position="relative" w="full" px={{ base: 0, lg: 4 }} h="full">
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
        </HStack>
        {children}
      </Stack>
    </>
  );
};

export default ProfileSidebar;
