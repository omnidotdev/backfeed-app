import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useSidebarNavigationItems from "@/lib/hooks/useSidebarNavigationItems";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import cn from "@/lib/utils";

const navButton = "w-full justify-between rounded-none bg-background-subtle";

/**
 * Sidebar navigation.
 */
const SidebarNavigation = () => {
  const routes = useSidebarNavigationItems();
  const { setIsOpen: setIsMobileSidebarOpen } = useDialogStore({
    type: DialogType.MobileSidebar,
  });

  const [isWorkspaceContentOpen, setIsWorkspaceContentOpen] = useState(true);
  const [isProjectContentOpen, setIsProjectContentOpen] = useState(true);

  return (
    <div className="mt-4 flex w-full flex-1 flex-col gap-2">
      {routes.map(
        ({
          to,
          params,
          label,
          isActive,
          isCollapsible,
          children,
          icon: Icon,
        }) =>
          isCollapsible ? (
            <CollapsibleRoot
              key={label}
              unmountOnExit
              open={isWorkspaceContentOpen}
              onOpenChange={() => {
                setIsWorkspaceContentOpen((open) => !open);
                if (isProjectContentOpen) setIsProjectContentOpen(false);
              }}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(navButton, isActive && "text-primary")}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon className="size-4" />}
                    <span className="text-left">{label}</span>
                  </span>

                  <span
                    className={cn(
                      "transition-transform",
                      isWorkspaceContentOpen && "rotate-90",
                    )}
                  >
                    <FiChevronRight />
                  </span>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="flex w-full gap-2">
                  <div className="ml-2.5 w-px self-stretch bg-border" />

                  <div className="flex w-full flex-1 flex-col gap-2 py-2 pb-0">
                    {children
                      ?.filter(({ isVisible }) => isVisible)
                      .map(
                        ({
                          to,
                          params,
                          label,
                          isActive,
                          isCollapsible,
                          children,
                          icon: ChildIcon,
                        }) =>
                          isCollapsible ? (
                            <CollapsibleRoot
                              key={label}
                              unmountOnExit
                              open={isProjectContentOpen}
                              onOpenChange={() =>
                                setIsProjectContentOpen((open) => !open)
                              }
                            >
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    navButton,
                                    isActive && "text-primary",
                                  )}
                                >
                                  <span className="flex items-center gap-2">
                                    {ChildIcon && (
                                      <ChildIcon className="size-4" />
                                    )}
                                    <span className="text-left">{label}</span>
                                  </span>

                                  <span
                                    className={cn(
                                      "transition-transform",
                                      isProjectContentOpen && "rotate-90",
                                    )}
                                  >
                                    <FiChevronRight />
                                  </span>
                                </Button>
                              </CollapsibleTrigger>

                              <CollapsibleContent>
                                <div className="flex w-full gap-2">
                                  <div className="w-7 self-stretch" />

                                  <div className="flex w-full flex-1 flex-col gap-2 p-2">
                                    {children
                                      ?.filter(
                                        ({ isVisible, to }) =>
                                          isVisible && !!to,
                                      )
                                      .map(
                                        ({ to, params, label, isActive }) => (
                                          <div key={label} className="block">
                                            <Link
                                              to={to}
                                              params={params}
                                              onClick={() =>
                                                setIsMobileSidebarOpen(false)
                                              }
                                            >
                                              <Button
                                                disabled={isActive}
                                                variant="ghost"
                                                tabIndex={-1}
                                                className={cn(
                                                  "w-full justify-start",
                                                  isActive && "text-primary",
                                                )}
                                              >
                                                {label}
                                              </Button>
                                            </Link>
                                          </div>
                                        ),
                                      )}
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </CollapsibleRoot>
                          ) : (
                            <div key={label} className="block">
                              {to && (
                                <Link
                                  to={to}
                                  params={params}
                                  onClick={() => setIsMobileSidebarOpen(false)}
                                >
                                  <Button
                                    disabled={isActive}
                                    variant="ghost"
                                    tabIndex={-1}
                                    className={cn(
                                      "w-full justify-start",
                                      isActive && "text-primary",
                                    )}
                                  >
                                    {label}
                                  </Button>
                                </Link>
                              )}
                            </div>
                          ),
                      )}
                  </div>
                </div>
              </CollapsibleContent>
            </CollapsibleRoot>
          ) : (
            <div key={label} className="block">
              {to && (
                <Link
                  to={to}
                  params={params}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <Button
                    disabled={isActive}
                    variant="ghost"
                    tabIndex={-1}
                    className={cn(
                      "w-full justify-start bg-background-subtle hover:bg-muted/80",
                      isActive && "text-primary",
                    )}
                  >
                    {label}
                  </Button>
                </Link>
              )}
            </div>
          ),
      )}
    </div>
  );
};

export default SidebarNavigation;
