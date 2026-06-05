import { useState } from "react";
import { LuPanelLeftOpen } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { SheetContent, SheetRoot } from "@/components/ui/sheet";
import ManagementNavigation from "@/components/workspace/ManagementNavigation";

import type { PropsWithChildren } from "react";

/**
 * Sidebar for workspace management. Uses drawer/modal pattern to prevent layout shift.
 */
const ManagementSidebar = ({ children }: PropsWithChildren) => {
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
        <SheetContent
          side="left"
          className="items-center justify-between overflow-hidden pb-6"
        >
          <ManagementNavigation
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
      </SheetRoot>

      {/* Main content - full width, no sidebar space reserved */}
      <div className="relative flex w-full flex-col px-0 lg:px-4">
        <div className="sticky top-[5rem] z-50 flex min-h-14 items-center gap-2 backdrop-blur-md">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open Sidebar"
            onClick={() => setIsDrawerOpen(true)}
            className="ml-2"
          >
            <LuPanelLeftOpen className="size-5" />
          </Button>
        </div>
        {children}
      </div>
    </>
  );
};

export default ManagementSidebar;
