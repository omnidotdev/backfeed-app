import { useQuery } from "@tanstack/react-query";

import { getCustomer, getProduct } from "lib/actions";
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
    queryFn: async () => {
      const customer = await getCustomer(user?.rowId!);
      const product = await getProduct(
        customer.activeSubscriptions[0].productId
      );

      const { productId, ...rest } = customer.activeSubscriptions[0];

      return {
        ...rest,
        product,
      };
    },
    enabled: enabled && !!user?.rowId,
  });
};

export default useSubscription;
