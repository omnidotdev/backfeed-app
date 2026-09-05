import { useSessionRefresh } from "@omnidotdev/providers/react";
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
import { Toaster } from "sonner";

import CommandPalette from "@/components/layout/CommandPalette";
import DefaultCatchBoundary from "@/components/layout/DefaultCatchBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NotFound from "@/components/layout/NotFound";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import appCss from "@/lib/styles/app.css?url";
import createMetaTags from "@/lib/util/createMetaTags";
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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: ExtendedSession | null;
  authDegraded: boolean;
}>()({
  beforeLoad: async () => {
    const { session, authDegraded } = await fetchSession();

    return { session, authDegraded };
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
      { rel: "canonical", href: app.productionUrl },
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: app.name,
          url: app.productionUrl,
          description: app.description,
        }),
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  // Render 404s in-shell: a thrown `notFound()` renders here inside RootDocument
  // (globals + layout), not as a bare unstyled page. Pairs with the router's
  // `defaultNotFoundComponent` for unmatched routes.
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  // Keep the OAuth access token fresh while the user is idle
  useSessionRefresh(fetchSession);

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
          <div
            className="fixed top-0 z-50 h-[var(--sizes-header)] w-full"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <Header />
          </div>

          <div className="relative flex h-dvh w-full flex-col">
            <main className="mt-[var(--sizes-header)] w-full flex-1">
              {children}
            </main>

            <Footer />

            <CommandPalette />

            <Toaster
              theme={theme as "light" | "dark" | "system"}
              position="bottom-right"
              richColors
              closeButton
            />
          </div>
        </ThemeProvider>

        {isDevEnv && (
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
        )}

        <Scripts />
      </body>
    </html>
  );
}
