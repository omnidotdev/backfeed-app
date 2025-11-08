"use client";

import { Flex, HStack, Icon, Link as SigilLink, sigil } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { Link, LogoLink } from "components/core";
import { HeaderActions } from "components/layout";
import { token } from "generated/panda/tokens";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";
import { subscriptionOptions } from "lib/options";
import { usePathname } from "next/navigation";
import { LuExternalLink } from "react-icons/lu";

/**
 * Layout header.
 */
const Header = () => {
  const pathname = usePathname(),
    { user, isAuthenticated, isLoading } = useAuth();

  const { error: subscriptionNotFound } = useQuery(
    subscriptionOptions({
      hidraId: user?.hidraId,
    }),
  );

  const showPricingLink =
    !isLoading && (!isAuthenticated || subscriptionNotFound);

  return (
    <sigil.header
      display="flex"
      w="full"
      h="full"
      py={2}
      borderBottom="1px solid"
      // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
      // moved to `style` prop as `css` prop was not rendering properly
      style={{
        borderColor: token("colors.border.subtle"),
      }}
    >
      <Flex align="center" justify="space-between" w="full" px={4}>
        <Flex gap={4} alignItems="center">
          <LogoLink width={48} />

          <HStack gap={1}>
            {showPricingLink && (
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
                      pathname === "/pricing"
                        ? "background.muted"
                        : "transparent"
                    }
                    borderRadius="md"
                  >
                    {app.header.routes.pricing.label}
                  </Flex>
                </Link>
              </Flex>
            )}

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
