"use client";

import { css, sigil } from "@omnidev/sigil";

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
    &copy; {new Date().getFullYear()} {app.organization}
  </sigil.footer>
);

export default Footer;
