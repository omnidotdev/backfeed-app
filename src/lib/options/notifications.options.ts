import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import ms from "ms";

import { useNotificationsQuery } from "generated/graphql";

import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  NotificationsQuery,
  NotificationsQueryVariables,
} from "generated/graphql";

interface Options<T = NotificationsQuery> {
  email: string | null | undefined;
  options?: Omit<
    UseQueryOptions<
      NotificationsQuery,
      Error,
      T,
      (string | NotificationsQueryVariables)[]
    >,
    "queryKey"
  >;
}

const notificationsOptions = <T>({ email, options }: Options<T>) =>
  queryOptions({
    queryKey: useNotificationsQuery.getKey({ email: email! }),
    queryFn: useNotificationsQuery.fetcher({ email: email! }),
    enabled: !!email,
    placeholderData: keepPreviousData,
    // NB: refetch data every minute as this is commonly queried in layout components and will stay mounted / show stale data for a long time.
    refetchInterval: ms("1m"),
    ...options,
  });

export default notificationsOptions;
