"use client";

import { sigil } from "@omnidev/sigil";

import { token } from "generated/panda/tokens";
import { app } from "lib/config";

/**
 * Layout footer.
 */
const Footer = () => (
  <sigil.footer
    display="flex"
    pos="fixed"
    justifyContent="center"
    alignItems="center"
    p={4}
    bottom={0}
    w="100%"
    style={{
      borderTop: "1px solid",
      borderColor: token("colors.border.subtle"),
    }}
  >
    &copy; {new Date().getFullYear()} {app.organization}
  </sigil.footer>
);

export default Footer;
