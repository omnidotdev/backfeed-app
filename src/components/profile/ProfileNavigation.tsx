import { Avatar, Badge, Button, Flex, Icon, Stack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouteContext,
  useRouterState,
} from "@tanstack/react-router";
import { PiCreditCardLight, PiUserCircle, PiUserPlus } from "react-icons/pi";

import OverflowText from "@/components/core/OverflowText";
import app from "@/lib/config/app.config";
import { invitationsOptions } from "@/lib/options/invitations";

import type { ButtonProps, StackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface NavigationItem extends ButtonProps {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
  /** Navigation badge indicator.  */
  badgeCount?: number;
}

interface Props extends StackProps {
  /** Boolean indicating whether the sidebar is open. */
  isOpen: boolean;
  /** Callback function to close the sidebar. */
  onClose?: () => void;
  /** Boolean indicating whether text elements should be truncated. */
  truncateText?: boolean;
}

/**
 * Management navigation component.
 */
const ProfileNavigation = ({
  isOpen,
  onClose,
  truncateText = false,
  ...rest
}: Props) => {
  const { session } = useRouteContext({ strict: false });
  const { userId } = useParams({ strict: false });
  const navigate = useNavigate();
  const segment = useRouterState({
    select: (state) => {
      const currentLocation = state.isLoading
        ? state.resolvedLocation
        : state.location;
      return currentLocation?.pathname.split("/").at(-1);
    },
  });

  const { data: usersTotalInvitations } = useQuery({
    ...invitationsOptions({
      email: session?.user?.email!,
    }),
    enabled: !!session?.user?.email,
    select: (data) => {
      const count = data?.invitations?.totalCount;
      return count && count > 0 ? count : undefined;
    },
  });

  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: app.profileAccountPage.breadcrumb,
      icon: PiUserCircle,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/profile/$userId/account",
          params: { userId: userId! },
        });
      },
    },
    {
      label: app.profileInvitationsPage.breadcrumb,
      badgeCount: usersTotalInvitations,
      icon: PiUserPlus,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/profile/$userId/invitations",
          params: { userId: userId! },
        });
      },
    },
    {
      label: app.profileOrganizationsPage.breadcrumb,
      icon: PiCreditCardLight,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/profile/$userId/organizations",
          params: { userId: userId! },
        });
      },
    },
  ];

  return (
    <Stack h="full" w="full" gap={0} {...rest}>
      <Flex
        w="full"
        p={4}
        gap={2}
        bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
        alignItems="center"
      >
        <Avatar size="xs" name={session?.user?.username} />

        {isOpen && (
          <OverflowText
            as="h1"
            textAlign="center"
            whiteSpace="nowrap"
            fontSize="sm"
          >
            {session?.user?.username ?? ""}
          </OverflowText>
        )}
      </Flex>

      {SIDEBAR_NAVIGATION.map(({ label, icon, onClick, badgeCount }) => (
        <Button
          key={label}
          variant="ghost"
          w="full"
          rounded="none"
          alignItems="center"
          justifyContent={isOpen ? "flex-start" : "center"}
          textAlign="left"
          textWrap="nowrap"
          py={6}
          bgColor={{
            _active: { base: "neutral.300a", _dark: "neutral.100a" },
            _hover: {
              base: "neutral.200a",
              _active: { base: "neutral.300a", _dark: "neutral.100a" },
            },
          }}
          onClick={onClick}
          // Need to flip to undefined if not on the current segment because `_active` still picks up "false" as a truthy value
          data-active={label.toLowerCase() === segment || undefined}
          aria-label={label}
        >
          <Icon src={icon} h={5} w={5} />

          {(isOpen || !truncateText) && (
            <Flex justifyContent="space-between" w="full">
              <Text>{label}</Text>

              {badgeCount && (
                <Badge variant="solid" colorPalette="omni" size="sm">
                  {badgeCount}
                </Badge>
              )}
            </Flex>
          )}
        </Button>
      ))}
    </Stack>
  );
};

export default ProfileNavigation;
