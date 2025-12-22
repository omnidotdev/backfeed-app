import { Avatar, Button, Flex, Icon, Stack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouteContext,
  useRouterState,
} from "@tanstack/react-router";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import OverflowText from "@/components/core/OverflowText";
import app from "@/lib/config/app.config";
import { organizationOptions } from "@/lib/options/organizations";

import type { ButtonProps, StackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface NavigationItem extends ButtonProps {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
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
const ManagementNavigation = ({
  isOpen,
  onClose,
  truncateText = false,
  ...rest
}: Props) => {
  const { role } = useRouteContext({
    from: "/_auth/organizations/$organizationSlug/_layout/_manage",
  });
  const { organizationSlug } = useParams({
    from: "/_auth/organizations/$organizationSlug/_layout/_manage",
  });
  const navigate = useNavigate();
  const segment = useRouterState({
    select: (state) => {
      const currentLocation = state.isLoading
        ? state.resolvedLocation
        : state.location;
      return currentLocation?.pathname.split("/").at(-1);
    },
  });

  const { data: organization } = useQuery({
    ...organizationOptions({ slug: organizationSlug }),
    select: (data) => data?.organizationBySlug,
  });

  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: app.organizationMembersPage.breadcrumb,
      icon: HiOutlineUserGroup,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/organizations/$organizationSlug/members",
          params: { organizationSlug },
        });
      },
    },
    // TODO: re-enable when per-seat pricing is implemented
    {
      label: app.organizationInvitationsPage.breadcrumb,
      icon: FiUserPlus,
      // onClick: () => {
      //   onClose?.();
      //   navigate({
      //     to: "/organizations/$organizationSlug/invitations",
      //     params: { organizationSlug },
      //   });
      // },
      disabled: true,
    },
    {
      label: app.organizationSettingsPage.breadcrumb,
      icon: LuSettings,
      onClick: () => {
        onClose?.();
        navigate({
          to: "/organizations/$organizationSlug/settings",
          params: { organizationSlug },
        });
      },
      disabled: !role,
    },
  ];

  return (
    <Stack gap={0} {...rest}>
      <Flex
        w="full"
        p={4}
        gap={2}
        bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
        alignItems="center"
      >
        {/* TODO: update with organization image */}
        <Avatar size="xs" name={organization?.name} />

        {isOpen && (
          <OverflowText
            as="h1"
            textAlign="center"
            whiteSpace="nowrap"
            fontSize="sm"
            fontWeight="semibold"
          >
            {organization?.name}
          </OverflowText>
        )}
      </Flex>

      {SIDEBAR_NAVIGATION.filter(({ disabled }) => !disabled).map(
        ({ label, icon, onClick }) => (
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

            {(isOpen || !truncateText) && <Text>{label}</Text>}
          </Button>
        ),
      )}
    </Stack>
  );
};

export default ManagementNavigation;
