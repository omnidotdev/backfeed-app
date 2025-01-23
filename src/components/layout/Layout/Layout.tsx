"use client";

import { Center, Flex, Grid, sigil, useIsClient } from "@omnidev/sigil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "next/navigation";

import { Footer, Header } from "components/layout";
import { CreateOrganization } from "components/organization";
import { CreateProject } from "components/project";
import { app } from "lib/config";

import type { ReactNode } from "react";

dayjs.extend(relativeTime);

interface Props {
  children: ReactNode;
}

/**
 * Core application layout.
 */
const Layout = ({ children }: Props) => {
  const isClient = useIsClient();

  const { organizationSlug } = useParams<{ organizationSlug?: string }>();

  // TODO remove this and prod URL check below once ready for public launch
  if (!isClient) return null;

  return window?.location.href.includes(app.productionUrl) ? (
    <Center mt={12} fontSize="2xl" fontWeight="semibold">
      Coming soon
    </Center>
  ) : (
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

      {/* dialogs */}
      <CreateProject organizationSlug={organizationSlug} />
      <CreateOrganization />
    </Grid>
  );
};

export default Layout;
