import authOptions from "@/lib/auth/auth.config";
import { authenticateRequest } from "@/lib/auth/authenticateRequest";

import type { Session } from "@auth/core/types";

export async function getAuth(request: Request): Promise<Session | null> {
  if (!request) throw new Error("No context provided");

  const requestState = await authenticateRequest(request, authOptions);

  return requestState;
}
