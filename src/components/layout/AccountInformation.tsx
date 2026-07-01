import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { HiChevronUpDown } from "react-icons/hi2";
import { LuExternalLink } from "react-icons/lu";
import { useOnClickOutside } from "usehooks-ts";

import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleRoot,
} from "@/components/ui/collapsible";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import signOut from "@/lib/auth/signOut";
import app from "@/lib/config/app.config";
import { CONSOLE_URL, isDevEnv } from "@/lib/config/env.config";
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
    minWidth: "40rem",
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
      await signOut();
    } catch (err) {
      if (isDevEnv) console.error(err);
    }
  };

  const initial = session?.user?.username?.[0]?.toUpperCase();

  if (isSmallViewport) {
    return (
      <MenuRoot positioning={{ shift: 32 }}>
        <MenuTrigger asChild>
          <Button variant="ghost" className="rounded-full px-0">
            <AvatarRoot size="md">
              <AvatarImage src={session?.user?.image ?? undefined} alt="" />
              <AvatarFallback>{initial}</AvatarFallback>
            </AvatarRoot>
          </Button>
        </MenuTrigger>

        <MenuPositioner>
          <MenuContent className="min-w-32">
            <MenuItemGroup>
              <MenuItemGroupLabel>{session?.user?.username}</MenuItemGroupLabel>

              <MenuSeparator />

              <MenuItem value="profile" onClick={handleProfileClick}>
                <FiUser />
                {app.auth.profile.label}
              </MenuItem>

              {CONSOLE_URL && (
                <>
                  <MenuSeparator />

                  <MenuItem value="manage-account" asChild>
                    <a
                      href={CONSOLE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LuExternalLink />
                      Manage account
                    </a>
                  </MenuItem>
                </>
              )}

              <MenuSeparator />

              <MenuItem
                value="logout"
                onClick={handleLogout}
                className="text-primary [&_svg]:text-primary dark:text-[var(--colors-brand-primary-400)] dark:[&_svg]:text-[var(--colors-brand-primary-400)]"
              >
                <FiLogOut />
                {app.auth.signOut.label}
              </MenuItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuPositioner>
      </MenuRoot>
    );
  }

  return (
    <div ref={userActions} className="flex flex-col justify-end">
      <CollapsibleRoot open={isMobileProfileOpen}>
        <CollapsibleContent>
          <div className="flex flex-col gap-2">
            <Button onClick={handleProfileClick}>
              <FiUser />
              {app.auth.profile.label}
            </Button>

            {CONSOLE_URL && (
              <a href={CONSOLE_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full">
                  <LuExternalLink />
                  Manage account
                </Button>
              </a>
            )}

            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-primary text-primary [&_svg]:text-primary dark:text-[var(--colors-brand-primary-400)] dark:[&_svg]:text-[var(--colors-brand-primary-400)]"
            >
              <FiLogOut />
              {app.auth.signOut.label}
            </Button>
          </div>
        </CollapsibleContent>
      </CollapsibleRoot>

      <Button
        variant="ghost"
        className="h-auto justify-between py-3 outline outline-background-subtle"
        onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <AvatarRoot size="md">
              <AvatarImage src={session?.user?.image ?? undefined} alt="" />
              <AvatarFallback>{initial}</AvatarFallback>
            </AvatarRoot>

            <div className="flex flex-col gap-1 text-left">
              <span className="leading-none">{session?.user?.name}</span>
              <span className="text-muted-foreground text-xs leading-none">
                {session?.user?.email}
              </span>
            </div>
          </div>

          <HiChevronUpDown className="size-6" />
        </div>
      </Button>
    </div>
  );
};

export default AccountInformation;
