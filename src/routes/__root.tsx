import { Flex, Toaster, css, sigil } from "@omnidev/sigil";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

import DefaultCatchBoundary from "@/components/layout/DefaultCatchBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import app from "@/lib/config/app.config";
import appCss from "@/lib/styles/app.css?url";
import seo from "@/lib/util/seo";
import toaster from "@/lib/util/toaster";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";

import type { Session } from "@auth/core/types";
import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: Session | null;
}>()({
  beforeLoad: async () => {
    const { session } = await fetchSession();

    return { session };
  },
  loader: () => getTheme(),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "apple-mobile-web-app-title",
        content: app.name,
      },
      ...seo(),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const theme = Route.useLoaderData();

  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider theme={theme}>
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

          <Flex
            direction="column"
            position="relative"
            w="100%"
            h="100dvh"
            gap={0}
            // ! NB: This helps prevent CLS on pages when the content size is dynamic, and therefore the scrollbar may or may not be visible. See: https://stackoverflow.com/a/30293718
            paddingLeft="calc(100vw - 100%)"
          >
            {/* TODO fix styles not appropriately being applied (https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues) */}
            <sigil.main w="full" flex={1} css={css.raw({ mt: "header" })}>
              {children}
            </sigil.main>

            <Footer />

            {/* toaster */}
            <Toaster toaster={toaster} />
          </Flex>
        </ThemeProvider>

        {/* Dev Tools - only included in development */}
        <TanStackDevtools
          plugins={[
            {
              name: "Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "Query",
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
