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
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuPanelLeftClose, LuPanelLeftOpen, LuSettings } from "react-icons/lu";

import { Breadcrumb } from "components/core";
import { useOrganizationQuery } from "generated/graphql";
import { app } from "lib/config";
import { useDebounceValue } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";
import type { BreadcrumbRecord } from "components/core";
import { capitalizeFirstLetter } from "lib/util";
import type { PropsWithChildren } from "react";
import type { IconType } from "react-icons";

interface NavigationItem extends ButtonProps {
  label: string;
  icon: IconType;
}

const ManagementSidebar = ({ children }: PropsWithChildren) => {
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

  const { isOpen, onToggle } = useDisclosure();

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
      // TODO: make dynamic
      label: capitalizeFirstLetter(segment!),
    },
  ];

  return (
    <>
      <Stack
        h="full"
        overflow="hidden"
        w={isOpen ? "xs" : 20}
        borderRightWidth="1px"
        borderColor="border.subtle"
        transition="all 200ms ease-in-out"
        gap={0}
      >
        <Text
          as="h1"
          p={4}
          bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
          textAlign="center"
        >
          {debouncedIsOpen ? organization?.name : organization?.name?.[0]}
        </Text>
        {SIDEBAR_NAVIGATION.map(({ label, icon, onClick }) => (
          <Button
            key={label}
            variant="ghost"
            w="full"
            rounded="none"
            alignItems="center"
            py={6}
            // Need to flip to undefined if not on the current segment because `_active` still picks up "false" as a truthy value
            data-active={label.toLowerCase() === segment || undefined}
            bgColor={{ _active: "neutral.100a" }}
            onClick={onClick}
          >
            <Icon src={icon} h={5} w={5} />
            {debouncedIsOpen && <Text>{label}</Text>}
          </Button>
        ))}
      </Stack>
      <Stack w="full" mt={2} placeSelf="flex-start" px={4}>
        <HStack ml={{ base: 0, md: -4 }} minH={10}>
          <Button
            display={{ base: "none", md: "flex" }}
            variant="icon"
            bgColor={{ base: "transparent", _hover: "background.subtle" }}
            color="foreground.default"
            onClick={onToggle}
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
