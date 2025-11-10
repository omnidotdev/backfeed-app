import { queryOptions } from "@tanstack/react-query";

import { getSubscriptions } from "lib/actions";

import type { User } from "generated/graphql";

interface Options {
  hidraId: User["hidraId"] | undefined;
  enabled?: boolean;
}

const subscriptionOptions = ({ hidraId, enabled = true }: Options) =>
  queryOptions({
    queryKey: ["Subscriptions", { hidraId }],
    queryFn: async () => getSubscriptions(hidraId!),
    enabled: enabled && !!hidraId,
    retry: false,
  });

export default subscriptionOptions;
