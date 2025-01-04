import Providers from "app/providers";
import { Layout } from "components/layout";
import { app, isTestEnv, NEXT_RUNTIME } from "lib/config";
import { mswNodeServer } from "test/e2e/util";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "lib/styles/main.css";

// set up MSW Node server for server-side requests (in test environment)
if (isTestEnv && NEXT_RUNTIME === "nodejs") {
  console.log("Setting up MSW Node.js server...");
  mswNodeServer.listen();
}

export const metadata: Metadata = {
  title: app.name,
  description: app.description,
};

/**
 * Root layout.
 */
const RootLayout = ({ children }: { children: ReactNode }) => (
  // !!NB: suppressHydrationWarning is required for next-themes to work properly. This property only applies one level deep, so it won't block hydration warnings on other elements. See https://github.com/pacocoursey/next-themes?tab=readme-ov-file#use for more details
  <html lang="en" suppressHydrationWarning>
    <head>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/img/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/img/favicon-16x16.png"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
    </head>

    <body>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
