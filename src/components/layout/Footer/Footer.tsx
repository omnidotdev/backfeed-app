"use client";

import { Flex, sigil } from "@omnidev/sigil";

import { app } from "lib/config";

/**
 * Layout footer.
 */
const Footer = () => (
  <sigil.footer>
    <Flex pos="fixed" justifyContent="center" mb={6} bottom={0} w="100%">
      &copy; {new Date().getFullYear()} {app.organization}
    </Flex>
  </sigil.footer>
);

export default Footer;
