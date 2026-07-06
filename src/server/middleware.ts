import { createMiddleware } from "@tanstack/react-start";

import { fetchSession } from "@/server/functions/auth";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { session } = await fetchSession();

  if (!session) throw new Error("Unauthorized");

  return next({ context: { session } });
});
