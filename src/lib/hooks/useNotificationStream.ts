import { useQueryClient } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { createClient } from "graphql-sse";
import { useEffect } from "react";

import {
  useNotificationsQuery,
  useUnreadNotificationCountQuery,
} from "@/generated/graphql";
import { API_GRAPHQL_URL } from "@/lib/config/env.config";

const SUBSCRIPTION = /* GraphQL */ `
  subscription NotificationReceived {
    notificationReceived {
      id
      type
    }
  }
`;

/**
 * Subscribe to the current user's notification stream over SSE (graphql-yoga
 * serves GraphQL subscriptions as Server-Sent Events). On each pushed event the
 * unread-count and list queries are invalidated so the bell updates instantly.
 *
 * This is an enhancement layer over the bell's polling: if the stream can't
 * connect (auth, CORS, network), errors are swallowed and the poll keeps the
 * badge fresh, so realtime degrades gracefully rather than breaking the bell.
 */
const useNotificationStream = ({
  enabled,
  limit,
}: {
  enabled: boolean;
  limit: number;
}) => {
  const queryClient = useQueryClient();
  const { session } = useRouteContext({ from: "__root__" });
  const token = session?.accessToken;

  useEffect(() => {
    if (!enabled || !token || !API_GRAPHQL_URL) return;

    const client = createClient({
      url: API_GRAPHQL_URL,
      headers: () => ({ authorization: `Bearer ${token}` }),
      // keep retrying; the bell's polling covers any gap while disconnected
      retryAttempts: Number.POSITIVE_INFINITY,
    });

    const unsubscribe = client.subscribe(
      { query: SUBSCRIPTION },
      {
        next: () => {
          queryClient.invalidateQueries({
            queryKey: useUnreadNotificationCountQuery.getKey(),
          });
          queryClient.invalidateQueries({
            queryKey: useNotificationsQuery.getKey({ limit }),
          });
        },
        // polling remains the fallback; don't surface stream errors
        error: () => {},
        complete: () => {},
      },
    );

    return () => {
      unsubscribe();
      client.dispose();
    };
  }, [enabled, token, limit, queryClient]);
};

export default useNotificationStream;
