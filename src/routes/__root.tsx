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
  // Fetch session first to get user email for maintenance mode bypass evaluation
  const { session } = await fetchSession();

  // Pass user context to Unleash for @omni.dev admin bypass
  const context = session?.user?.email
    ? { userId: session.user.id, email: session.user.email }
    : undefined;
  const { isMaintenanceMode } = await fetchMaintenanceMode({ data: context });

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

    // Admin bypass (@omni.dev) is now handled by Unleash constraints.
    // If isMaintenanceMode is true, Unleash has already evaluated the user's email
    // and determined they should see maintenance mode.

    // Skip auth when maintenance page is shown
    if (isMaintenanceMode) return { session: null, isMaintenanceMode };

    return { session, isMaintenanceMode };
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
      <RootDocument isMaintenanceMode>
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

function RootDocument({
  children,
  isMaintenanceMode = false,
}: Readonly<{ children: ReactNode; isMaintenanceMode?: boolean }>) {
  const theme = Route.useLoaderData();

  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>

      <body>
        <ThemeProvider theme={theme}>
          {!isMaintenanceMode && (
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
          )}

          <Flex
            direction="column"
            position="relative"
            w="100%"
            h="100dvh"
            gap={0}
          >
            <sigil.main
              w="full"
              flex={1}
              css={css.raw({ mt: isMaintenanceMode ? 0 : "header" })}
            >
              {children}
            </sigil.main>

            {!isMaintenanceMode && <Footer />}

            <Toaster toaster={toaster} />
          </Flex>
        </ThemeProvider>

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
