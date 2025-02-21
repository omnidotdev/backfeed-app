"use client";

import { Center, Flex, Toaster, sigil } from "@omnidev/sigil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "next/navigation";
import { useIsClient } from "usehooks-ts";

import { Footer, Header } from "components/layout";
import { CreateOrganization } from "components/organization";
import { CreateProject } from "components/project";
import { css } from "generated/panda/css";
import { app } from "lib/config";
import { toaster } from "lib/constants";

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
    <>
      {/* NB: needs to be outside of main container in order to stay fixed to top of page, See: https://github.com/tailwindlabs/tailwindcss/discussions/3096#discussioncomment-212263 */}
      <Flex position="fixed" top={0} zIndex="sticky" h="header" w="full">
        <Header />
      </Flex>

      <Flex direction="column" position="relative" w="100%" h="100dvh" gap={0}>
        <sigil.main w="full" flex={1} className={css({ mt: "header" })}>
          {children}
        </sigil.main>

        <Footer />

        {/* dialogs */}
        <CreateProject organizationSlug={organizationSlug} />
        <CreateOrganization />

        {/* toaster */}
        <Toaster toaster={toaster} />
      </Flex>
    </>
  );
};

export default Layout;
