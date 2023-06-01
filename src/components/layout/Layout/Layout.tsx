"use client";

import { Flex, Grid, chakra } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import app from "lib/config/app";

dayjs.extend(relativeTime);

/**
 * Core application layout.
 */
const Layout = ({ children }: any) => (
  <Grid templateRows="auto 1fr auto" w="100%" h="100%">
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

    <chakra.main p={6}>{children}</chakra.main>

    <Footer />
  </Grid>
);

export default Layout;
