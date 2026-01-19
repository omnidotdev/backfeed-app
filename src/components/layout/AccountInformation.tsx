import {
  Avatar,
  Button,
  Collapsible,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
  Stack,
  Text,
} from "@omnidev/sigil";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { HiChevronUpDown } from "react-icons/hi2";
import { useOnClickOutside } from "usehooks-ts";

import { token } from "@/generated/panda/tokens";
import signOut from "@/lib/auth/signOut";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import useViewportSize from "@/lib/hooks/useViewportSize";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { RefObject } from "react";

/**
 * User account information.
 */
const AccountInformation = () => {
  const { session } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();
  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const userActions = useRef<HTMLDivElement>(null);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const { setIsOpen: setIsMobileSidebarOpen } = useDialogStore({
    type: DialogType.MobileSidebar,
  });

  const handleProfileClick = () => {
    setIsMobileProfileOpen(false);
    setIsMobileSidebarOpen(false);
    navigate({
      to: "/profile/$userId/account",
      params: { userId: session?.user.identityProviderId! },
    });
  };

  useOnClickOutside(userActions as RefObject<HTMLElement>, () =>
    setIsMobileProfileOpen(false),
  );

  const handleLogout = async () => {
    try {
      // await fetch("/api/auth/federated-logout", {
      //   method: "POST",
      // });

      await signOut();
    } catch (err) {
      if (isDevEnv) console.error(err);
    }
  };

  if (isSmallViewport) {
    return (
      <Menu
        trigger={
          <Button variant="ghost">
            <Avatar
              imageSrc={session?.user?.image ?? undefined}
              name={session?.user?.username}
            />
          </Button>
        }
        triggerProps={{
          px: 0,
          rounded: "full",
        }}
        positioning={{
          shift: 32,
        }}
      >
        <MenuItemGroup minW={32}>
          <MenuItemGroupLabel>{session?.user?.username}</MenuItemGroupLabel>

          <MenuSeparator />

          <MenuItem value="profile" onClick={handleProfileClick}>
            <HStack gap={2}>
              <Icon src={FiUser} size="sm" />

              {app.auth.profile.label}
            </HStack>
          </MenuItem>

          <MenuSeparator />

          <MenuItem value="logout" onClick={handleLogout}>
            <HStack gap={2} color="primary">
              <Icon src={FiLogOut} size="sm" color="primary" />

              {app.auth.signOut.label}
            </HStack>
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    );
  }

  return (
    <Stack ref={userActions} justifyContent="end">
      <Collapsible open={isMobileProfileOpen}>
        <Stack>
          <Button onClick={handleProfileClick}>
            <HStack gap={2}>
              <Icon src={FiUser} />

              {app.auth.profile.label}
            </HStack>
          </Button>

          <Button
            variant="outline"
            onClick={handleLogout}
            borderColor="primary"
          >
            <HStack gap={2} color="primary">
              <Icon src={FiLogOut} size="sm" color="primary" />

              {app.auth.signOut.label}
            </HStack>
          </Button>
        </Stack>
      </Collapsible>

      <Button
        justifyContent="space-between"
        variant="ghost"
        outline="1px solid"
        outlineColor="background.subtle"
        size="xl"
        onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
      >
        <HStack justifyContent="space-between" w="full">
          <HStack alignItems="center">
            <Avatar
              imageSrc={session?.user?.image ?? undefined}
              name={session?.user?.name}
            />

            <Stack gap={1} textAlign="left">
              <Text lineHeight={1}>{session?.user?.name}</Text>
              <Text fontSize="xs" lineHeight={1} color="foreground.muted">
                {session?.user?.email}
              </Text>
            </Stack>
          </HStack>

          <Icon src={HiChevronUpDown} size="xl" />
        </HStack>
      </Button>
    </Stack>
  );
};

export default AccountInformation;
