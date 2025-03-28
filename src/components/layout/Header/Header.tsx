"use client";

import { Badge, Flex, HStack, css, sigil } from "@omnidev/sigil";
import { usePathname } from "next/navigation";

import { Image, Link } from "components/core";
import { HeaderActions } from "components/layout";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * Layout header.
 */
const Header = () => {
  const pathname = usePathname(),
    { isAuthenticated, isLoading } = useAuth();

  return (
    <sigil.header
      display="flex"
      w="full"
      h="full"
      py={2}
      // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
      css={css.raw({
        borderBottom: "1px solid",
        borderColor: "border.subtle",
        backgroundColor: "background.default",
      })}
    >
      <Flex align="center" justify="space-between" w="full" mx="auto" px={4}>
        <Flex gap={4} alignItems="center">
          <Link href="/">
            <HStack gap={2} alignItems="center">
              <Image
                src="/img/logo.png"
                alt={`${app.name} logo`}
                width={48}
                height={24}
                priority
                // adjust color based on color theme
                mixBlendMode="difference"
                filter="brightness(0) invert(1)"
              />
              <Badge
                size="sm"
                fontSize="xs"
                variant="outline"
                color="brand.primary"
                borderColor="brand.primary"
                px={2}
              >
                Beta
              </Badge>
            </HStack>
          </Link>

          {!isLoading && !isAuthenticated && (
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
          )}
        </Flex>

        <HeaderActions />
      </Flex>
    </sigil.header>
  );
};

export default Header;
