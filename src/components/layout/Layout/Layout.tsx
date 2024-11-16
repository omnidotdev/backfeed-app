"use client";

import { Flex, Grid, sigil } from "@omnidev/sigil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Footer, Header } from "components/layout";
import { app } from "lib/config";

import type { ReactNode } from "react";

dayjs.extend(relativeTime);

interface Props {
  children: ReactNode;
}

/**
 * Core application layout.
 */
const Layout = ({ children }: Props) => (
  <Grid
    position="relative"
    gridTemplateRows="auto 1fr auto"
    w="100%"
    h="100dvh"
    gap={0}
  >
    <Flex direction="column" position="sticky" top={0} zIndex="sticky">
      <Flex
        p={4}
        justify="center"
        bgColor="brand.primary.500"
        color="white"
        fontWeight="semibold"
      >
        ⚠️ {app.name} is early alpha software.
      </Flex>

      <Header />
    </Flex>

    <sigil.main>{children}</sigil.main>

    <Footer />
  </Grid>
);

export default Layout;
