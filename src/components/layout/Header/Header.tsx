"use client";

import { Flex, HStack, Icon, Link as SigilLink, sigil } from "@omnidev/sigil";
import { usePathname } from "next/navigation";
import { LuExternalLink } from "react-icons/lu";

import { Link, LogoLink } from "components/core";
import { HeaderActions } from "components/layout";
import { token } from "generated/panda/tokens";
import { app } from "lib/config";

/**
 * Layout header.
 */
const Header = () => {
  const pathname = usePathname();

  return (
    <sigil.header
      display="flex"
      w="full"
      h="full"
      py={2}
      // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
      style={{
        borderBottom: "1px solid",
        borderColor: token("colors.border.subtle"),
      }}
    >
      <Flex align="center" justify="space-between" w="full" px={4}>
        <Flex gap={4} alignItems="center">
          <LogoLink width={48} />

          <HStack gap={1}>
            <Flex display={{ base: "none", sm: "flex" }}>
              <Link href="/pricing" role="group">
                <Flex
                  h={10}
                  px={4}
                  align="center"
                  color={{
                    base: "foreground.muted",
                    _groupHover: "foreground.default",
                  }}
                  bgColor={
                    pathname === "/pricing" ? "background.muted" : "transparent"
                  }
                  borderRadius="md"
                >
                  {app.header.routes.pricing.label}
                </Flex>
              </Link>
            </Flex>

            <SigilLink
              href={app.docsUrl}
              display={{ base: "none", sm: "flex" }}
              color="foreground.muted"
              _hover={{ color: "foreground.default" }}
              isExternal
              textDecoration="none"
              h={10}
              px={4}
            >
              {app.header.routes.docs.label}

              <Icon src={LuExternalLink} h={3.5} w={3.5} />
            </SigilLink>
          </HStack>
        </Flex>

        <HeaderActions />
      </Flex>
    </sigil.header>
  );
};

export default Header;
