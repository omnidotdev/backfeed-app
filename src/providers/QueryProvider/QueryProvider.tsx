import {
  MutationCache,
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { PropsWithChildren } from "react";

const reactQueryClient = new ReactQueryClient({
  mutationCache: new MutationCache({
    onSuccess: () => {
      reactQueryClient.invalidateQueries();
    },
  }),
});

/**
 * Client-side remote data fetching provider.
 */
const QueryProvider = ({ children }: PropsWithChildren) => (
  <ReactQueryClientProvider client={reactQueryClient}>
    {children}

    {/* NB: by default, RQ dev tools are only included in `NODE_ENV=development` environments */}
    <ReactQueryDevtools />
  </ReactQueryClientProvider>
);

export default QueryProvider;
