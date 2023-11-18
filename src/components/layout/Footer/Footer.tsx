"use client";

import { Flex, chakra } from "@chakra-ui/react";

import app from "lib/config/app.config";

/**
 * Layout footer.
 */
const Footer = () => (
  <chakra.footer
    as={Flex}
    pos="fixed"
    justify="center"
    mb={6}
    bottom={0}
    w="100%"
  >
    &copy; {new Date().getFullYear()} {app.organization}
  </chakra.footer>
);

export default Footer;
