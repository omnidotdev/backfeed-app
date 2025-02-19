"use client";

import {
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@omnidev/sigil";
import {
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import { useEffect } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuPanelLeftClose, LuPanelLeftOpen, LuSettings } from "react-icons/lu";
import { useMediaQuery } from "usehooks-ts";

import { Breadcrumb, OverflowText } from "components/core";
import { useOrganizationQuery } from "generated/graphql";
import { app } from "lib/config";
import { useDebounceValue } from "lib/hooks";
import { capitalizeFirstLetter } from "lib/util";

import type { ButtonProps } from "@omnidev/sigil";
import type { BreadcrumbRecord } from "components/core";
import type { PropsWithChildren } from "react";
import type { IconType } from "react-icons";

interface NavigationItem extends ButtonProps {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
}

/**
 * Sidebar for organization management. Used for navigation between organization management pages.
 */
const ManagementSidebar = ({ children }: PropsWithChildren) => {
  // Used in favor of `useBreakpointValue` as the fallback to `base` breaks logic for initializing the open state of the sidebar
  const isLargeDisplay = useMediaQuery("(min-width: 1025px)");

  const router = useRouter(),
    segment = useSelectedLayoutSegment();

  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data?.organizationBySlug,
    }
  );

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: isLargeDisplay,
  });

  const [debouncedIsOpen] = useDebounceValue({
    value: isOpen,
    delay: 100,
  });

  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: app.organizationSettingsPage.breadcrumb,
      icon: LuSettings,
      onClick: () => router.push(`/organizations/${organizationSlug}/settings`),
    },
    {
      label: "Members",
      icon: HiOutlineUserGroup,
      onClick: () => router.push(`/organizations/${organizationSlug}/members`),
    },
  ];

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization?.name ?? organizationSlug,
      href: `/organizations/${organizationSlug}`,
    },
    {
      label: capitalizeFirstLetter(segment!),
    },
  ];

  useEffect(() => {
    if (!isLargeDisplay && isOpen) {
      onToggle();
    }
  }, [isLargeDisplay, isOpen, onToggle]);

  return (
    <>
      <Stack
        position="relative"
        h="full"
        w={isOpen ? "xs" : 14}
        borderRightWidth="1px"
        borderColor="border.subtle"
        transition="all 200ms ease-in-out"
        gap={0}
      >
        {/* TODO: update `top` position for ManagementSidebar on the `sticky` positioned element when banner is removed */}
        <Stack position="sticky" gap={0} top={40} zIndex="sticky">
          <OverflowText
            as="h1"
            p={4}
            bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
            textAlign="center"
            whiteSpace="nowrap"
          >
            {debouncedIsOpen ? organization?.name : organization?.name?.[0]}
          </OverflowText>

          {SIDEBAR_NAVIGATION.map(({ label, icon, onClick }) => (
            <Button
              key={label}
              variant="ghost"
              w="full"
              rounded="none"
              alignItems="center"
              textWrap="nowrap"
              py={6}
              bgColor={{ _active: "neutral.100a" }}
              onClick={onClick}
              // Need to flip to undefined if not on the current segment because `_active` still picks up "false" as a truthy value
              data-active={label.toLowerCase() === segment || undefined}
              aria-label={label}
            >
              <Icon src={icon} h={5} w={5} />

              {debouncedIsOpen && <Text>{label}</Text>}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack position="relative" w="full" placeSelf="flex-start" px={4}>
        {/* TODO: update `top` position for ManagementSidebar on the `sticky` positioned element when banner is removed */}
        <HStack
          position="sticky"
          top={40}
          zIndex="sticky"
          py={2}
          ml={{ base: 0, lg: -4 }}
          minH={14}
          bgColor="background.default"
          gap={2}
        >
          <Button
            display={{ base: "none", lg: "flex" }}
            variant="icon"
            bgColor={{ base: "transparent", _hover: "background.subtle" }}
            color="foreground.default"
            aria-label="Toggle Sidebar"
            onClick={onToggle}
            ml={2}
          >
            <Icon
              src={isOpen ? LuPanelLeftClose : LuPanelLeftOpen}
              h={5}
              w={5}
            />
          </Button>

          <Breadcrumb breadcrumbs={breadcrumbs} />
        </HStack>
        {children}
      </Stack>
    </>
  );
};

export default ManagementSidebar;
