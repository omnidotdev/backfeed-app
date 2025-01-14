import {
  MutationCache,
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { PropsWithChildren } from "react";

let browserQueryClient: ReactQueryClient | undefined = undefined;

const makeQueryClient = () => {
  const queryClient = new ReactQueryClient({
    defaultOptions: {
      queries: {
        // NB: with SSR, it is recommended to set a default staleTime above 0 to avoid refetching immediately on the client. See: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup
        staleTime: 60 * 1000,
      },
    },
    mutationCache: new MutationCache({
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }),
  });

  return queryClient;
};

const getQueryClient = () => {
  if (isServer) return makeQueryClient();

  // ! NB: Important to make a new query client if we don't already have one. This is so we don't re-make a new client if React suspends during the initial render. See: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};

/**
 * Client-side remote data fetching provider.
 */
const QueryProvider = ({ children }: PropsWithChildren) => {
  const reactQueryClient = getQueryClient();

  return (
    <ReactQueryClientProvider client={reactQueryClient}>
      {children}

      {/* NB: by default, RQ dev tools are only included in `NODE_ENV=development` environments */}
      <ReactQueryDevtools />
    </ReactQueryClientProvider>
  );
};

export default QueryProvider;
