"use client";

import { css, Divider, Link, sigil } from "@omnidev/sigil";

import { app } from "lib/config";

/**
 * Layout footer.
 */
const Footer = () => (
  <sigil.footer
    display="flex"
    justifyContent="center"
    alignItems="center"
    p={4}
    bottom={0}
    w="100%"
    // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
    css={css.raw({
      borderTop: "1px solid",
      borderColor: "border.subtle",
    })}
  >
    &copy; {new Date().getFullYear()} {app.organization.name}
    <Divider orientation="vertical" p={2} />
    <Link
      href="https://docs.omni.dev/backfeed/overview"
      p={3}
      isExternal
      color="foreground.muted"
      _hover={{ color: "brand.primary" }}
      textDecoration="none"
    >
      Docs
    </Link>
  </sigil.footer>
);

export default Footer;
