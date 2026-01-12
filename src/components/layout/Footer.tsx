import { Divider, Flex, Icon, Link, Text, css, sigil } from "@omnidev/sigil";
import { FaDiscord, FaXTwitter as FaX } from "react-icons/fa6";

import app from "@/lib/config/app.config";

/**
 * Layout footer.
 */
const Footer = () => (
  <sigil.footer
    display="flex"
    flexDirection={{ base: "column", sm: "row" }}
    justifyContent="center"
    alignItems="center"
    gap={4}
    py={6}
    px={4}
    bottom={0}
    w="full"
    borderTopWidth="1px"
    borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
    bgColor={{ base: "neutral.50", _dark: "neutral.950" }}
  >
    {/* Made with megaphone */}
    <Text fontSize="sm" color={{ base: "neutral.500", _dark: "neutral.400" }}>
      Made with 📣 by{" "}
      <Link
        isExternal
        href="https://omni.dev"
        color={{ base: "foreground.default", _dark: "neutral.200" }}
        textDecoration="none"
        transition="color 0.2s ease"
        className={css({
          _hover: {
            color: { base: "brand.primary.600", _dark: "brand.primary.400" },
          },
        })}
      >
        {app.organization.name}
      </Link>
    </Text>

    <Divider
      orientation="vertical"
      h={4}
      display={{ base: "none", sm: "block" }}
    />

    {/* Links */}
    <Flex gap={4} align="center">
      <Link
        isExternal
        href={app.docsUrl}
        color={{ base: "neutral.500", _dark: "neutral.400" }}
        fontSize="sm"
        textDecoration="none"
        transition="color 0.2s ease"
        className={css({
          _hover: {
            color: { base: "foreground.default", _dark: "neutral.200" },
          },
        })}
      >
        Docs
      </Link>

      <Flex gap={3}>
        <Link
          isExternal
          href={app.socials.discord}
          color={{ base: "neutral.500", _dark: "neutral.400" }}
          textDecoration="none"
          transition="color 0.2s ease"
          className={css({
            _hover: {
              color: { base: "foreground.default", _dark: "neutral.200" },
            },
          })}
        >
          <Icon src={FaDiscord} h={5} w={5} />
        </Link>

        <Link
          isExternal
          href={app.socials.x}
          color={{ base: "neutral.500", _dark: "neutral.400" }}
          textDecoration="none"
          transition="color 0.2s ease"
          className={css({
            _hover: {
              color: { base: "foreground.default", _dark: "neutral.200" },
            },
          })}
        >
          <Icon src={FaX} h={4} w={4} />
        </Link>
      </Flex>
    </Flex>

    <Divider
      orientation="vertical"
      h={4}
      display={{ base: "none", sm: "block" }}
    />

    {/* Copyright */}
    <Text fontSize="sm" color={{ base: "neutral.500", _dark: "neutral.400" }}>
      &copy; {new Date().getFullYear()} {app.organization.name}
    </Text>
  </sigil.footer>
);

export default Footer;
