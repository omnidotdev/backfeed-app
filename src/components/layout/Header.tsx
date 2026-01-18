import { Flex, HStack, Icon, Link as SigilLink, sigil } from "@omnidev/sigil";
import { Link, useLocation } from "@tanstack/react-router";
import { LuExternalLink } from "react-icons/lu";

import LogoLink from "@/components/core/LogoLink";
import HeaderActions from "@/components/layout/HeaderActions";
import app from "@/lib/config/app.config";

/**
 * Layout header.
 */
const Header = () => {
  const { pathname } = useLocation();

  return (
    <sigil.header
      display="flex"
      w="full"
      h="full"
      py={2}
      borderBottomWidth="1px"
      borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
      bgColor={{ base: "white/90", _dark: "neutral.900/80" }}
      backdropFilter="blur(12px)"
      style={{ WebkitBackdropFilter: "blur(12px)" }}
      _dark={{
        backdropFilter: "blur(16px)",
        boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.05)",
      }}
    >
      <Flex align="center" justify="space-between" w="full" px={4}>
        <Flex gap={4} alignItems="center">
          <LogoLink width={12} />

          <HStack gap={1}>
            <Flex display={{ base: "none", sm: "flex" }}>
              <Link to="/pricing" role="group">
                <Flex
                  h={10}
                  px={4}
                  align="center"
                  borderRadius="md"
                  color={{
                    base:
                      pathname === "/pricing"
                        ? "brand.primary.600"
                        : "foreground.muted",
                    _dark:
                      pathname === "/pricing"
                        ? "brand.primary.400"
                        : "neutral.400",
                  }}
                  bgColor={
                    pathname === "/pricing"
                      ? {
                          base: "brand.primary.50",
                          _dark: "brand.primary.950/30",
                        }
                      : "transparent"
                  }
                  transition="all 0.2s ease"
                  _hover={{
                    color: {
                      base: "brand.primary.600",
                      _dark: "brand.primary.400",
                    },
                  }}
                >
                  Pricing
                </Flex>
              </Link>
            </Flex>

            <SigilLink
              href={app.docsUrl}
              display={{ base: "none", sm: "flex" }}
              color={{ base: "foreground.muted", _dark: "neutral.400" }}
              _hover={{
                color: {
                  base: "brand.primary.600",
                  _dark: "brand.primary.400",
                },
              }}
              isExternal
              textDecoration="none"
              h={10}
              px={4}
              transition="all 0.2s ease"
            >
              Docs
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
