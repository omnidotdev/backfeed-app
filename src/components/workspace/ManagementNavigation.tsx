import {
  getRouteApi,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import OverflowText from "@/components/core/OverflowText";
import { AvatarFallback, AvatarRoot } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

const manageRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/_manage",
);

interface NavigationItem {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
  /** Click handler. */
  onClick?: () => void;
  /** Whether the item is disabled. */
  disabled?: boolean;
}

interface Props extends ComponentProps<"div"> {
  /** Boolean indicating whether the sidebar is open. */
  isOpen: boolean;
  /** Callback function to close the sidebar. */
  onClose?: () => void;
  /** Boolean indicating whether text elements should be truncated. */
  truncateText?: boolean;
}

const navButton =
  "h-auto w-full justify-start whitespace-nowrap rounded-none py-6 text-left hover:bg-neutral-200/40 data-[active]:bg-neutral-300/40 dark:hover:bg-neutral-800/40 dark:data-[active]:bg-neutral-100/10";

/**
 * Management navigation component.
 */
const ManagementNavigation = ({
  isOpen,
  onClose,
  truncateText = false,
  className,
  ...rest
}: Props) => {
  const { role, workspaceName } = manageRoute.useRouteContext();
  const { workspaceSlug } = manageRoute.useParams();
  const navigate = useNavigate();
  const segment = useRouterState({
    select: (state) => {
      const currentLocation = state.isLoading
        ? state.resolvedLocation
        : state.location;
      return currentLocation?.pathname.split("/").at(-1);
    },
  });

  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: app.workspaceMembersPage.breadcrumb,
      icon: HiOutlineUserGroup,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/workspaces/$workspaceSlug/members",
          params: { workspaceSlug },
        });
      },
    },
    // TODO: re-enable when per-seat pricing is implemented
    {
      label: app.workspaceInvitationsPage.breadcrumb,
      icon: FiUserPlus,
      disabled: true,
    },
    {
      label: app.workspaceSettingsPage.breadcrumb,
      icon: LuSettings,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/workspaces/$workspaceSlug/settings",
          params: { workspaceSlug },
        });
      },
      disabled: !role,
    },
  ];

  return (
    <div className={cn("flex flex-col", className)} {...rest}>
      <div className="flex w-full items-center gap-2 bg-[var(--colors-brand-primary-50)] p-4 dark:bg-[var(--colors-brand-primary-950)]">
        {/* TODO: update with workspace image */}
        <AvatarRoot size="xs">
          <AvatarFallback>{workspaceName?.[0]?.toUpperCase()}</AvatarFallback>
        </AvatarRoot>

        {isOpen && (
          <OverflowText className="whitespace-nowrap text-center font-semibold text-sm">
            {workspaceName}
          </OverflowText>
        )}
      </div>

      {SIDEBAR_NAVIGATION.filter(({ disabled }) => !disabled).map(
        ({ label, icon: NavIcon, onClick }) => (
          <Button
            key={label}
            variant="ghost"
            className={cn(navButton, !isOpen && "justify-center")}
            onClick={onClick}
            // Need to flip to undefined if not on the current segment because `data-active` still picks up "false" as a truthy value
            data-active={label.toLowerCase() === segment || undefined}
            aria-label={label}
          >
            <NavIcon className="size-5" />

            {(isOpen || !truncateText) && <span>{label}</span>}
          </Button>
        ),
      )}
    </div>
  );
};

export default ManagementNavigation;
