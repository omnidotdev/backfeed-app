import {
  QueryClient as ReactQueryClient,
  isServer,
} from "@tanstack/react-query";

let browserQueryClient: ReactQueryClient | undefined = undefined;

/**
 * Creates a query client.
 */
const makeQueryClient = () => {
  const queryClient = new ReactQueryClient({
    defaultOptions: {
      queries: {
        // NB: with SSR, it is recommended to set a default staleTime above 0 to avoid refetching immediately on the client. See: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup
        staleTime: 60 * 1000,
        // NB: Next.js middleware validates / alters the session which the queries depend on. This option is set to prevent refetching queries when the access token may be invalid
        refetchOnWindowFocus: false,
      },
    },
  });

  return queryClient;
};

/**
 * Retrieves an existing query client if used in a browser context (i.e. provider), otherwise creates a new one.
 */
const getQueryClient = () => {
  if (isServer) return makeQueryClient();

  // ! NB: Important to make a new query client if we don't already have one. This is so we don't re-make a new client if React suspends during the initial render. See: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};

export default getQueryClient;
