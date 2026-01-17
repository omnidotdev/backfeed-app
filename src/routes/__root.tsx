import { Flex, Text, Toaster, css, sigil } from "@omnidev/sigil";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

import DefaultCatchBoundary from "@/components/layout/DefaultCatchBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import app from "@/lib/config/app.config";
import { fetchMaintenanceMode } from "@/lib/flags";
import appCss from "@/lib/styles/app.css?url";
import createMetaTags from "@/lib/util/createMetaTags";
import toaster from "@/lib/util/toaster";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";

import type { QueryClient } from "@tanstack/react-query";
import type { Session } from "better-auth/types";
import type { ReactNode } from "react";

interface ExtendedUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  rowId?: string;
  identityProviderId?: string;
  username?: string;
}

import type { OrganizationClaim } from "@/lib/auth/getAuth";

interface ExtendedSession extends Omit<Session, "user"> {
  user: ExtendedUser;
  accessToken?: string;
  organizations?: OrganizationClaim[];
}

dayjs.extend(relativeTime);
dayjs.extend(utc);

const fetchSessionAndMaintenanceMode = createServerFn({
  method: "GET",
}).handler(async () => {
  const [{ session }, { isMaintenanceMode }] = await Promise.all([
    fetchSession(),
    fetchMaintenanceMode(),
  ]);

  return { session, isMaintenanceMode };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: ExtendedSession | null;
  isMaintenanceMode: boolean;
}>()({
  beforeLoad: async () => {
    const { session, isMaintenanceMode } =
      await fetchSessionAndMaintenanceMode();

    // Allow admin users to bypass maintenance mode
    const adminDomain = process.env.ADMIN_EMAIL_DOMAIN;
    const isAdminUser = adminDomain
      ? (session?.user?.email?.endsWith(`@${adminDomain}`) ?? false)
      : false;
    const effectiveMaintenanceMode = isMaintenanceMode && !isAdminUser;

    // Skip auth when maintenance page is shown
    if (effectiveMaintenanceMode)
      return { session: null, isMaintenanceMode: effectiveMaintenanceMode };

    return { session, isMaintenanceMode: effectiveMaintenanceMode };
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
      ...createMetaTags(),
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

function MaintenancePage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100dvh"
      p={8}
      bgGradient="to-br"
      gradientFrom="cyan.900"
      gradientTo="cyan.800"
      color="white"
    >
      <Flex direction="column" align="center" textAlign="center">
        <Text fontSize="9xl" mb={6}>
          🔄
        </Text>
        <Text as="h1" fontSize="4xl" fontWeight="bold" mb={4}>
          Looping Back
        </Text>
        <Text maxW="md" fontSize="lg" color="cyan.200">
          We're cycling through updates. Backfeed will return shortly.
        </Text>
      </Flex>
    </Flex>
  );
}

function RootComponent() {
  const { isMaintenanceMode } = useRouteContext({ from: "__root__" });

  if (isMaintenanceMode) {
    return (
      <RootDocument>
        <MaintenancePage />
      </RootDocument>
    );
  }

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

        {/* dev tools (only included in development) */}
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
