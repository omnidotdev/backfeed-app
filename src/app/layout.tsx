import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Providers from "./providers";
import { Layout } from "components/layout";
import fonts from "lib/theme/fonts";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Backfeed",
  description: "Streamlined user feedback 📣",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
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

    <body className={fonts.primary.className}>
      <Providers>
        <Layout>{children}</Layout>

        {/* NB: by default, RQ dev tools are only included in `NODE_ENV=development` environments */}
        <ReactQueryDevtools />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
