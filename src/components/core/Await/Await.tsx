import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { unstable_noStore } from "next/cache";
import { Fragment, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient } from "lib/util";

import type {
  AnyUseInfiniteQueryOptions,
  AnyUseQueryOptions,
} from "@tanstack/react-query";
import type { PropsWithChildren, ReactNode } from "react";

interface HydrateClientProps extends PropsWithChildren {
  prefetch: (AnyUseQueryOptions | AnyUseInfiniteQueryOptions)[];
}

const HydrateClient = ({ prefetch, children }: HydrateClientProps) => {
  unstable_noStore(); // opt out of pre-rendering

  const queryClient = getQueryClient();

  Promise.all(
    prefetch.map((p) =>
      "initialPageParam" in p
        ? queryClient.prefetchInfiniteQuery(p)
        : queryClient.prefetchQuery(p),
    ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

interface Props extends PropsWithChildren {
  fallback?: ReactNode;
  errorComponent?: ReactNode;
  prefetch?: AnyUseQueryOptions[];
}

const Await = ({ fallback, errorComponent, prefetch, children }: Props) => {
  const MaybeErrorBoundary = errorComponent ? ErrorBoundary : Fragment;

  return (
    <MaybeErrorBoundary fallback={errorComponent}>
      <Suspense fallback={fallback}>
        {prefetch ? (
          <HydrateClient prefetch={prefetch}>{children}</HydrateClient>
        ) : (
          children
        )}
      </Suspense>
    </MaybeErrorBoundary>
  );
};

export default Await;
