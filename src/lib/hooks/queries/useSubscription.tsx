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
    queryKey: ["Subscription", user?.rowId],
    queryFn: async () => await getSubscription(user?.rowId!),
    enabled: enabled && !!user?.rowId,
    retry: false,
  });
};

export default useSubscription;
