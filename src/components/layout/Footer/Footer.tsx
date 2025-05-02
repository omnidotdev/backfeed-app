"use client";

import { Divider, Link, Text, css, sigil } from "@omnidev/sigil";

import { app } from "lib/config";

/**
 * Layout footer.
 */
const Footer = () => (
  <sigil.footer
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={2}
    p={4}
    bottom={0}
    w="100%"
    // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
    css={css.raw({
      borderTop: "1px solid",
      borderColor: "border.subtle",
    })}
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
      Docs
    </Link>
  </sigil.footer>
);

export default Footer;
