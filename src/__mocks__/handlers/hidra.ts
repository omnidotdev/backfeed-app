import { http, HttpResponse } from "msw";

/**
 * Mock HIDRA IDP handlers.
 */
const mockHidraHandlers = [
  http.get(
    "https://hidra.omni.dev/realms/test/.well-known/openid-configuration",
    () =>
      HttpResponse.json({
        issuer: "https://hidra.omni.dev/realms/test",
      })
  ),
  http.post(
    "https://hidra.omni.dev/realms/test/protocol/openid-connect/token",
    () =>
      HttpResponse.json({
        access_token: "test",
      })
  ),
];

export default mockHidraHandlers;
