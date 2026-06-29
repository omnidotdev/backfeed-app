import { queryOptions } from "@tanstack/react-query";

import {
  useNotificationsQuery,
  useUnreadNotificationCountQuery,
} from "@/generated/graphql";

import type { NotificationsQueryVariables } from "@/generated/graphql";

/** How often the notification bell polls (no realtime transport yet). */
const POLL_INTERVAL = 60_000;

/** The current user's recent notifications (fetched when the bell is open). */
export const notificationsOptions = (
  variables: NotificationsQueryVariables = {},
) =>
  queryOptions({
    queryKey: useNotificationsQuery.getKey(variables),
    queryFn: useNotificationsQuery.fetcher(variables),
  });

/** The current user's unread count, polled for the bell badge. */
export const unreadNotificationCountOptions = () =>
  queryOptions({
    queryKey: useUnreadNotificationCountQuery.getKey(),
    queryFn: useUnreadNotificationCountQuery.fetcher(),
    refetchInterval: POLL_INTERVAL,
  });
