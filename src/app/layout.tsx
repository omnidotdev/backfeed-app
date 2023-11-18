import Providers from "app/providers";
import { Layout } from "components/layout";
import app from "lib/config/app.config";
import fonts from "lib/theme/fonts";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: app.name,
  description: app.description,
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
      </Providers>
    </body>
  </html>
);

export default RootLayout;
