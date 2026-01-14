import { MutationCache, QueryClient, matchQuery } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import DefaultCatchBoundary from "@/components/layout/DefaultCatchBoundary";
import NotFound from "@/components/layout/NotFound";
import { routeTree } from "./routeTree.gen";

import type { QueryKey } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidates?: Array<QueryKey>;
    };
  }
}

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // NB: with SSR, it is recommended to set a default staleTime above 0 to avoid refetching immediately on the client. See: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
    mutationCache: new MutationCache({
      onSettled: (_data, _error, _variables, _context, mutation) => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            // if `all` is included in the pattern, invalidate entire cache
            if (
              mutation.meta?.invalidates?.some((queryKey) =>
                queryKey.includes("all"),
              )
            )
              return true;

            // invalidate all matching tags at once
            // or nothing if no meta is provided
            return (
              mutation.meta?.invalidates?.some((queryKey) =>
                matchQuery({ queryKey }, query),
              ) ?? false
            );
          },
        });
      },
    }),
  });

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient, session: null, isMaintenanceMode: false },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: NotFound,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

export type AppRouter = ReturnType<typeof getRouter>;
