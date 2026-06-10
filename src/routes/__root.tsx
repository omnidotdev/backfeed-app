import { useSessionRefresh } from "@omnidotdev/providers/react";
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
import { Toaster } from "sonner";

import DefaultCatchBoundary from "@/components/layout/DefaultCatchBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import app from "@/lib/config/app.config";
import { fetchMaintenanceMode } from "@/lib/providers";
import appCss from "@/lib/styles/app.css?url";
import createMetaTags from "@/lib/util/createMetaTags";
import cn from "@/lib/utils";
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
    ? { userId: session.user.id, properties: { email: session.user.email } }
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
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  component: RootComponent,
});

function MaintenancePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-br from-[var(--colors-cyan-900)] to-[var(--colors-cyan-800)] p-8 text-white">
      <div className="flex flex-col items-center text-center">
        <p className="mb-6 text-9xl">🔄</p>
        <h1 className="mb-4 font-bold text-4xl">Looping Back</h1>
        <p className="max-w-md text-[var(--colors-cyan-200)] text-lg">
          We're cycling through updates. Backfeed will return shortly.
        </p>
      </div>
    </div>
  );
}

function RootComponent() {
  // Keep the OAuth access token fresh while the user is idle
  useSessionRefresh(fetchSession);

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
            <div
              className="fixed top-0 z-50 h-[var(--sizes-header)] w-full"
              style={{ backdropFilter: "blur(12px)" }}
            >
              <Header />
            </div>
          )}

          <div className="relative flex h-dvh w-full flex-col">
            <main
              className={cn(
                "w-full flex-1",
                !isMaintenanceMode && "mt-[var(--sizes-header)]",
              )}
            >
              {children}
            </main>

            {!isMaintenanceMode && <Footer />}

            <Toaster
              theme={theme as "light" | "dark" | "system"}
              position="bottom-right"
              richColors
              closeButton
            />
          </div>
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
