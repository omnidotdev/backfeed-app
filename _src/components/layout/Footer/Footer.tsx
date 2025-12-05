"use client";

import { Divider, Icon, Link, Text, sigil } from "@omnidev/sigil";
import { FaDiscord, FaXTwitter as FaX } from "react-icons/fa6";

import { token } from "../../../generated/panda/tokens";
import { app } from "../../../lib/config";

/**
 * Layout footer.
 */
const Footer = () => (
  <sigil.footer
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={4}
    p={4}
    bottom={0}
    w="100%"
    // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
    style={{
      borderTop: "1px solid",
      borderColor: token("colors.border.subtle"),
    }}
  >
    <Text>
      &copy; {new Date().getFullYear()} {app.organization.name}
    </Text>

    <Divider orientation="vertical" />

    <Link
      isExternal
      href={app.docsUrl}
      color="foreground.muted"
      _hover={{ color: "brand.primary" }}
      textDecoration="none"
    >
      {app.header.routes.docs.label}
    </Link>

    <Divider orientation="vertical" />

    <Link
      isExternal
      href={app.socials.discord}
      color="foreground.muted"
      _hover={{ color: "brand.primary" }}
      textDecoration="none"
    >
      <Icon src={FaDiscord} />
    </Link>

    <Link
      isExternal
      href={app.socials.x}
      color="foreground.muted"
      _hover={{ color: "brand.primary" }}
      textDecoration="none"
    >
      <Icon src={FaX} />
    </Link>
  </sigil.footer>
);

export default Footer;
