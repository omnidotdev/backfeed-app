import {
  getRouteApi,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { PiCreditCardLight, PiUserCircle } from "react-icons/pi";

import OverflowText from "@/components/core/OverflowText";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

const profileLayoutRoute = getRouteApi("/_app/profile/$userId/_layout");

interface NavigationItem {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
  /** Click handler. */
  onClick: () => void;
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
const ProfileNavigation = ({
  isOpen,
  onClose,
  truncateText = false,
  className,
  ...rest
}: Props) => {
  const { session } = profileLayoutRoute.useRouteContext();
  const { userId } = profileLayoutRoute.useParams();
  const navigate = useNavigate();
  const segment = useRouterState({
    select: (state) => {
      const currentLocation = state.isLoading
        ? state.resolvedLocation
        : state.location;
      return currentLocation?.pathname.split("/").at(-1);
    },
  });

  // Invitations are now managed via Gatekeeper IDP
  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: app.profileAccountPage.breadcrumb,
      icon: PiUserCircle,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/profile/$userId/account",
          params: { userId },
        });
      },
    },
    {
      label: app.profileWorkspacesPage.breadcrumb,
      icon: PiCreditCardLight,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/profile/$userId/workspaces",
          params: { userId },
        });
      },
    },
  ];

  return (
    <div className={cn("flex h-full w-full flex-col", className)} {...rest}>
      <div className="flex w-full items-center gap-2 bg-[var(--colors-brand-primary-50)] p-4 dark:bg-[var(--colors-brand-primary-950)]">
        <AvatarRoot size="xs">
          <AvatarImage src={session?.user?.image ?? undefined} alt="" />
          <AvatarFallback>
            {session?.user?.username?.[0]?.toUpperCase()}
          </AvatarFallback>
        </AvatarRoot>

        {isOpen && (
          <OverflowText className="whitespace-nowrap text-center text-sm">
            {session?.user?.username ?? ""}
          </OverflowText>
        )}
      </div>

      {SIDEBAR_NAVIGATION.map(({ label, icon: NavIcon, onClick }) => (
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
      ))}
    </div>
  );
};

export default ProfileNavigation;
