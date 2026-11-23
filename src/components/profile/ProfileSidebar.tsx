import { Button } from "@omnidotdev/thornberry/button";
import {
  SheetBackdrop,
  SheetContent,
  SheetPortal,
  SheetPositioner,
  SheetRoot,
} from "@omnidotdev/thornberry/sheet";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import ProfileNavigation from "@/components/profile/ProfileNavigation";

import type { PropsWithChildren } from "react";

/**
 * Sidebar for profile page. Uses drawer/modal pattern to prevent layout shift.
 */
const ProfileSidebar = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const onCloseDrawer = () => setIsDrawerOpen(false);

  if (!isClient) return null;

  return (
    <>
      {/* Drawer overlay sidebar - no layout shift */}
      <SheetRoot
        open={isDrawerOpen}
        onOpenChange={({ open }) => setIsDrawerOpen(open)}
      >
        <SheetPortal>
          <SheetBackdrop />
          <SheetPositioner>
            <SheetContent
              side="left"
              className="flex flex-col items-center justify-between gap-4 overflow-hidden pb-6"
            >
              <ProfileNavigation
                isOpen={isDrawerOpen}
                onClose={onCloseDrawer}
                className="w-full gap-4"
              />

              <div className="flex w-full flex-col px-6">
                <Button variant="ghost" onClick={onCloseDrawer}>
                  Close
                </Button>
              </div>
            </SheetContent>
          </SheetPositioner>
        </SheetPortal>
      </SheetRoot>

      {/* Main content - full width, no sidebar space reserved */}
      <div className="relative flex h-full w-full flex-col px-0 lg:px-4">
        <div className="sticky top-[5rem] z-50 flex min-h-14 items-center gap-2 backdrop-blur-md">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open Sidebar"
            onClick={() => setIsDrawerOpen(true)}
            className="ml-2"
          >
            <LuMenu className="size-6" />
          </Button>
        </div>
        {children}
      </div>
    </>
  );
};

export default ProfileSidebar;
