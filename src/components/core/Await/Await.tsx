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
  prefetch?: AnyUseQueryOptions[];
  infinitePrefetch?: AnyUseInfiniteQueryOptions[];
}

const HydrateClient = ({
  prefetch,
  infinitePrefetch,
  children,
}: HydrateClientProps) => {
  unstable_noStore(); // opt out of pre-rendering

  const queryClient = getQueryClient();

  prefetch?.map((p) => queryClient.prefetchQuery(p));

  infinitePrefetch?.map((p) => queryClient.prefetchInfiniteQuery(p));

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
  infinitePrefetch?: AnyUseInfiniteQueryOptions[];
}

const Await = ({
  fallback,
  errorComponent,
  prefetch,
  infinitePrefetch,
  children,
}: Props) => {
  const MaybeErrorBoundary = errorComponent ? ErrorBoundary : Fragment;

  return (
    <MaybeErrorBoundary fallback={errorComponent}>
      <Suspense fallback={fallback}>
        {prefetch || infinitePrefetch ? (
          <HydrateClient
            prefetch={prefetch}
            infinitePrefetch={infinitePrefetch}
          >
            {children}
          </HydrateClient>
        ) : (
          children
        )}
      </Suspense>
    </MaybeErrorBoundary>
  );
};

export default Await;
