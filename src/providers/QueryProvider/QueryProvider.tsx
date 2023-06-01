import {
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

import type { ReactNode } from "react";

const reactQueryClient = new ReactQueryClient();

/**
 * Client-side remote data fetching provider.
 */
const QueryProvider = ({ children }: { children: ReactNode }) => (
  <ReactQueryClientProvider client={reactQueryClient}>
    {children}
  </ReactQueryClientProvider>
);

export default QueryProvider;
