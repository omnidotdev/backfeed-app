import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "lib/util";

import type { PropsWithChildren } from "react";

/**
 * Client-side async state management provider.
 */
const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}

      {/* NB: by default, RQ dev tools are only included in `NODE_ENV=development` environments */}
      <ReactQueryDevtools />
    </ReactQueryClientProvider>
  );
};

export default QueryProvider;
