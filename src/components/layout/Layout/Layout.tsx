"use client";

import { Flex, Toaster, css, sigil } from "@omnidev/sigil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

import { Footer, Header } from "components/layout";
import { toaster } from "lib/util";

import type { PropsWithChildren } from "react";

dayjs.extend(relativeTime);
dayjs.extend(utc);

/**
 * Core application layout.
 */
const Layout = ({ children }: PropsWithChildren) => (
  <>
    {/* NB: needs to be outside of main container in order to stay fixed to top of page, see: https://github.com/tailwindlabs/tailwindcss/discussions/3096#discussioncomment-212263 */}
    <Flex
      position="fixed"
      top={0}
      zIndex="sticky"
      h="header"
      w="full"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <Header />
    </Flex>

    <Flex direction="column" position="relative" w="100%" h="100dvh" gap={0}>
      {/* TODO fix styles not appropriately being applied (https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues) */}
      <sigil.main w="full" flex={1} css={css.raw({ mt: "header" })}>
        {children}
      </sigil.main>

      <Footer />

      {/* toaster */}
      <Toaster toaster={toaster} />
    </Flex>
  </>
);

export default Layout;
