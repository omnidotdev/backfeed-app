import { createServerFn } from "@tanstack/react-start";

import payments from "@/lib/payments";
import { fetchSession } from "@/server/functions/auth";

export const getCustomer = createServerFn().handler(async () => {
  const { session } = await fetchSession();

  if (!session) return undefined;

  const { data: customers } = await payments.customers.search({
    query: `metadata["externalId"]:"${session.user.hidraId!}"`,
  });

  if (!customers.length) return undefined;

  const { data: subscriptions } = await payments.subscriptions.list({
    customer: customers[0].id,
    status: "active",
  });

  return { ...customers[0], subscriptions };
});
