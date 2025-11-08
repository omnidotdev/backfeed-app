import Script from "next/script";

import * as handlers from "__mocks__/handlers";
import Providers from "app/providers";
import { Layout } from "components/layout";
import { app, ENABLE_MSW, isDevEnv, NEXT_RUNTIME } from "lib/config";
import { mswNodeServer } from "test/e2e/util";

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

export const metadata = {
  title: {
    default: app.name,
    template: `%s | ${app.name}`,
  },
  description: app.description,
};

/**
 * Root layout.
 */
const RootLayout = ({ children }: { children: ReactNode }) => (
  // ! NB: `suppressHydrationWarning` is required for `next-themes` to work properly. This property only applies one level deep, so it won't block hydration warnings on other elements. See https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
  <html lang="en" suppressHydrationWarning>
    <body>
      {isDevEnv && (
        <Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      )}

      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
