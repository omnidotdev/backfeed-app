import { Auth } from "@auth/core";
import { createFileRoute } from "@tanstack/react-router";

import authOptions from "@/lib/auth/auth.config";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Auth(request, authOptions);
      },
      POST: async ({ request }) => {
        return Auth(request, authOptions);
      },
    },
  },
});
