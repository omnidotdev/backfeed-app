import { describe, expect, it } from "bun:test";

import { buildIdpLogoutUrl } from "./idpLogout";

const full = {
  authBaseUrl: "https://identity.example.com",
  clientId: "client-123",
  redirectUri: "https://app.example.com",
  idTokenHint: "the-id-token",
};

describe("buildIdpLogoutUrl", () => {
  it("builds the end-session url with all params when everything is present", () => {
    const url = new URL(buildIdpLogoutUrl(full) as string);
    expect(url.origin + url.pathname).toBe(
      "https://identity.example.com/oauth2/end-session",
    );
    expect(url.searchParams.get("client_id")).toBe("client-123");
    expect(url.searchParams.get("post_logout_redirect_uri")).toBe(
      "https://app.example.com",
    );
    expect(url.searchParams.get("id_token_hint")).toBe("the-id-token");
  });

  it("returns null without an id token (the endpoint requires it)", () => {
    expect(buildIdpLogoutUrl({ ...full, idTokenHint: undefined })).toBeNull();
    expect(buildIdpLogoutUrl({ ...full, idTokenHint: "" })).toBeNull();
  });

  it("returns null when any IDP config part is missing", () => {
    expect(buildIdpLogoutUrl({ ...full, authBaseUrl: undefined })).toBeNull();
    expect(buildIdpLogoutUrl({ ...full, clientId: undefined })).toBeNull();
    expect(buildIdpLogoutUrl({ ...full, redirectUri: undefined })).toBeNull();
  });

  it("url-encodes the id token and redirect uri", () => {
    const url = buildIdpLogoutUrl({
      ...full,
      idTokenHint: "a b+c/d=",
      redirectUri: "https://app.example.com/back?x=1",
    }) as string;
    expect(url).toContain("id_token_hint=a+b%2Bc%2Fd%3D");
    expect(url).toContain(
      "post_logout_redirect_uri=https%3A%2F%2Fapp.example.com%2Fback%3Fx%3D1",
    );
  });
});
