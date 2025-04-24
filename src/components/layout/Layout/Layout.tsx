"use client";

import { Center, Flex, Toaster, css, sigil } from "@omnidev/sigil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "next/navigation";
import { useIsClient } from "usehooks-ts";

import { Footer, Header } from "components/layout";
import { CreateOrganization } from "components/organization";
import { CreateProject } from "components/project";
import { app } from "lib/config";
import { toaster } from "lib/util";

import type { PropsWithChildren } from "react";

dayjs.extend(relativeTime);

/**
 * Core application layout.
 */
const Layout = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();

  const { organizationSlug } = useParams<{ organizationSlug?: string }>();

  // TODO remove this and prod URL check below once ready for public launch
  if (!isClient) return null;

  return (
    <>
      {/* NB: needs to be outside of main container in order to stay fixed to top of page, see: https://github.com/tailwindlabs/tailwindcss/discussions/3096#discussioncomment-212263 */}
      <Flex position="fixed" top={0} zIndex="sticky" h="header" w="full">
        <Header />
      </Flex>

      <Flex direction="column" position="relative" w="100%" h="100dvh" gap={0}>
        {/* TODO fix styles not appropriately being applied (https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues) */}
        <sigil.main w="full" flex={1} css={css.raw({ mt: "header" })}>
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
