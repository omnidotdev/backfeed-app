"use client";

import { Button, Icon, Stack, Text, useDisclosure } from "@omnidev/sigil";
import { useOrganizationQuery } from "generated/graphql";
import { useDebounceValue } from "lib/hooks";
import { useParams } from "next/navigation";
import { LuPanelLeft } from "react-icons/lu";

const ManagementSidebar = () => {
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
    defaultIsOpen: true,
  });

  const [debouncedIsOpen] = useDebounceValue({
    value: isOpen,
    delay: 100,
  });

  return (
    <>
      <Stack
        h="full"
        overflow="hidden"
        w={isOpen ? "12%" : "4%"}
        borderRightWidth="1px"
        borderColor="border.subtle"
        transition="all 200ms ease-in-out"
      >
        <Text
          as="h1"
          p={4}
          bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
          textAlign="center"
        >
          {debouncedIsOpen ? organization?.name : organization?.name?.[0]}
        </Text>
      </Stack>
      <Button
        variant="icon"
        bgColor={{ base: "transparent", _hover: "background.subtle" }}
        color="foreground.default"
        mt={2}
        placeSelf="flex-start"
        onClick={onToggle}
      >
        <Icon src={LuPanelLeft} h={5} w={5} />
      </Button>
    </>
  );
};

export default ManagementSidebar;
