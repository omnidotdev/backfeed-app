import { queryOptions } from "@tanstack/react-query";

import { getSubscription } from "lib/actions";

import type { User } from "generated/graphql";

interface Options {
  hidraId: User["hidraId"] | undefined;
  enabled?: boolean;
}

const subscriptionOptions = ({ hidraId, enabled = true }: Options) =>
  queryOptions({
    queryKey: ["Subscription", { hidraId }],
    queryFn: async () => getSubscription(hidraId!),
    enabled: enabled && !!hidraId,
    retry: false,
  });

export default subscriptionOptions;
