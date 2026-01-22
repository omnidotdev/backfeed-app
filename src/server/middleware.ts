import { createMiddleware } from "@tanstack/react-start";

import { isSelfHosted } from "@/lib/config/env.config";
import payments from "@/lib/payments";
import { fetchSession } from "@/server/functions/auth";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { session } = await fetchSession();

  if (!session) throw new Error("Unauthorized");

  return next({ context: { session } });
});

export const customerMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    if (isSelfHosted) {
      return next({
        context: { customer: null },
      });
    }

    const { data: customers } = await payments.customers.search({
      query: `metadata["externalId"]:"${context.session.user.identityProviderId!}"`,
    });

    return next({
      context: { customer: customers.length ? customers[0] : null },
    });
  });
