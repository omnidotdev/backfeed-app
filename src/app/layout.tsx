import Providers from "app/providers";
import { Layout } from "components/layout";
import { app } from "lib/config";
import fonts from "lib/theme/fonts";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "lib/styles/main.css";

export const metadata: Metadata = {
  title: app.name,
  description: app.description,
};

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

    <body className={fonts.primary.className}>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
