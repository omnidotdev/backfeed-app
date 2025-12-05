import { queryOptions } from "@tanstack/react-query";

import { useNotificationsQuery } from "@/generated/graphql";

import type { NotificationsQueryVariables } from "@/generated/graphql";

export const notificationsOptions = (variables: NotificationsQueryVariables) =>
  queryOptions({
    queryKey: useNotificationsQuery.getKey(variables),
    queryFn: useNotificationsQuery.fetcher(variables),
  });
