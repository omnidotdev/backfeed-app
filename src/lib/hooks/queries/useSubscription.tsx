import { useQuery } from "@tanstack/react-query";

import { getSubscription } from "lib/actions";
import { useAuth } from "lib/hooks";

interface Options {
  /* Whether to enable the query. */
  enabled?: boolean;
}

/**
 * Custom hook to fetch subscription details.
 */
const useSubscription = ({ enabled = true }: Options = {}) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["Subscription", user?.hidraId],
    queryFn: async () => await getSubscription(user?.hidraId!),
    enabled: enabled && !!user?.hidraId,
    retry: false,
  });
};

export default useSubscription;
