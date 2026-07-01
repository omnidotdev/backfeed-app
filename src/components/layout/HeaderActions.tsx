import { useRouteContext } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { useIsClient } from "usehooks-ts";

import LogoLink from "@/components/core/LogoLink";
import AccountInformation from "@/components/layout/AccountInformation";
import NotificationBell from "@/components/layout/NotificationBell";
import OrganizationSwitcher from "@/components/layout/OrganizationSwitcher";
import SidebarNavigation from "@/components/layout/SidebarNavigation";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  SheetCloseTrigger,
  SheetContent,
  SheetRoot,
  SheetTrigger,
} from "@/components/ui/sheet";
import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import useViewportSize from "@/lib/hooks/useViewportSize";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

/**
 * Header actions.
 */
const HeaderActions = () => {
  const isClient = useIsClient();
  const { session } = useRouteContext({ from: "__root__" });

  // Use current URL as return destination after authentication
  const handleSignIn = useCallback(() => {
    const redirectUrl = window.location.href;
    signIn({ redirectUrl });
  }, []);

  const handleSignUp = useCallback(() => {
    const redirectUrl = window.location.href;
    signIn({ redirectUrl, action: "sign-up" });
  }, []);

  const isSmallViewport = useViewportSize({
    minWidth: "40rem",
  });

  const { isOpen: isMobileSidebarOpen, setIsOpen: setIsMobileSidebarOpen } =
    useDialogStore({
      type: DialogType.MobileSidebar,
    });

  useEffect(() => {
    if (isSmallViewport) {
      setIsMobileSidebarOpen(false);
    }
  }, [isSmallViewport, setIsMobileSidebarOpen]);

  // Render placeholder with fixed dimensions to prevent layout shift during hydration
  if (!isClient) {
    return (
      <div className="flex h-10 min-w-48 items-center justify-end gap-2">
        <ThemeToggle />
      </div>
    );
  }

  if (isSmallViewport) {
    return (
      <div className="flex min-w-48 items-center justify-end gap-2">
        <ThemeToggle />

        {session ? (
          <div className="flex items-center gap-2">
            <NotificationBell />
            <OrganizationSwitcher />
            <AccountInformation />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 dark:text-[var(--colors-brand-primary-400)]"
              onClick={handleSignIn}
            >
              {app.auth.signIn.label}
            </Button>

            <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-w-48 items-center justify-end gap-2">
      <ThemeToggle />

      <div className="flex items-center gap-2">
        {session && <NotificationBell />}
        {session && <OrganizationSwitcher />}

        <SheetRoot
          open={isMobileSidebarOpen}
          onOpenChange={({ open }) => setIsMobileSidebarOpen(open)}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="bg-background-subtle p-0 hover:bg-muted/80"
            >
              <RiMenu3Fill className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="p-4 shadow-md">
            <div className="flex justify-between">
              <ThemeToggle />

              <SheetCloseTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-muted"
                  aria-label="Close Mobile Sidebar"
                >
                  <FiX />
                </Button>
              </SheetCloseTrigger>
            </div>

            <div className="flex h-full flex-1 flex-col justify-between">
              <div className="mt-4 flex flex-col items-center">
                <LogoLink
                  width={60}
                  className="flex-col"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />

                <SidebarNavigation />
              </div>

              {session ? (
                <AccountInformation />
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 dark:text-[var(--colors-brand-primary-400)]"
                    onClick={handleSignIn}
                  >
                    {app.auth.signIn.label}
                  </Button>

                  <Button onClick={handleSignUp}>
                    {app.auth.signUp.label}
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </SheetRoot>
      </div>
    </div>
  );
};

export default HeaderActions;
