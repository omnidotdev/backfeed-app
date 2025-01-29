import * as handlers from "__mocks__/handlers";
import Providers from "app/providers";
import { Layout } from "components/layout";
import { ENABLE_MSW, NEXT_RUNTIME, app } from "lib/config";
import { mswNodeServer } from "test/e2e/util";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "lib/styles/main.css";

// set up mock service worker (MSW) fixtures if enabled
if (ENABLE_MSW) {
  // set up MSW Node server for server-side requests in test environment (https://mswjs.io/docs/integrations/node)
  if (NEXT_RUNTIME === "nodejs") {
    mswNodeServer.listen();
  }

  // set up MSW browser worker for client-side requests in test environment (https://mswjs.io/docs/integrations/browser, https://github.com/mswjs/msw/issues/1877#issuecomment-1857507825)
  if (typeof window !== "undefined") {
    const { setupWorker } = await import("msw/browser");
    const worker = setupWorker(...Object.values(handlers));
    await worker.start();
  }
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
