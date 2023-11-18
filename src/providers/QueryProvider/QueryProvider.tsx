import {
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { ReactNode } from "react";

const reactQueryClient = new ReactQueryClient();

/**
 * Client-side remote data fetching provider.
 */
const QueryProvider = ({ children }: { children: ReactNode }) => (
  <ReactQueryClientProvider client={reactQueryClient}>
    {children}

    {/* NB: by default, RQ dev tools are only included in `NODE_ENV=development` environments */}
    <ReactQueryDevtools />
  </ReactQueryClientProvider>
);

export default QueryProvider;
