import { Auth } from "@auth/core";

import type { AuthConfig } from "@auth/core";
import type { Session } from "@auth/core/types";

export async function authenticateRequest(
  request: Request,
  authOptions: AuthConfig,
): Promise<Session | null> {
  const url = new URL("/api/auth/session", request.url);

  const response = await Auth(
    new Request(url, { headers: request.headers }),
    authOptions,
  );

  const { status = 200 } = response;

  const data = await (response.json() as Promise<Session | null>);

  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error("Auth: Invalid session");
}
