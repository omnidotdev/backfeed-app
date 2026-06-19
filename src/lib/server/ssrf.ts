import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/** Ports a favicon fetch is permitted to use (standard web ports only). */
const ALLOWED_PORTS = new Set(["", "80", "443"]);

const USER_AGENT = "BackfeedFaviconBot/1.0 (+https://backfeed.omni.dev)";

/** Whether an IPv4 literal falls in a private, loopback, or otherwise non-public range. */
const isPrivateIpv4 = (ip: string): boolean => {
  const parts = ip.split(".").map(Number);
  const [a, b] = parts;
  if (a === undefined || b === undefined || parts.some(Number.isNaN))
    return true;
  if (a === 0) return true; // 0.0.0.0/8
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 192 && b === 0) return true; // 192.0.0.0/24 + 192.0.2.0/24
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT 100.64.0.0/10
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking 198.18.0.0/15
  if (a >= 224) return true; // multicast + reserved 224.0.0.0/3
  return false;
};

/** Whether an IPv6 literal falls in a loopback, link-local, unique-local, or mapped-private range. */
const isPrivateIpv6 = (ip: string): boolean => {
  const addr = ip.toLowerCase();
  if (addr === "::1" || addr === "::") return true;
  // IPv4-mapped addresses (::ffff:a.b.c.d) inherit the v4 classification
  const mapped = addr.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (mapped?.[1]) return isPrivateIpv4(mapped[1]);
  // fc00::/7 unique-local
  if (addr.startsWith("fc") || addr.startsWith("fd")) return true;
  // fe80::/10 link-local
  if (/^fe[89ab]/.test(addr)) return true;
  return false;
};

/** Whether an IP literal is unsafe to fetch from. Anything that is not a valid public IP is unsafe. */
export const isPrivateIp = (ip: string): boolean => {
  const family = isIP(ip);
  if (family === 4) return isPrivateIpv4(ip);
  if (family === 6) return isPrivateIpv6(ip);
  return true;
};

/**
 * Validate an outbound target against SSRF abuse. Rejects non-web schemes and
 * ports, then resolves DNS and rejects any host pointing at a private, loopback,
 * or link-local address.
 *
 * @param raw - The URL to validate
 * @returns The parsed, vetted URL
 * @throws If the URL is malformed, uses a disallowed scheme/port, or resolves to a non-public address
 */
export const assertPublicHttpUrl = async (raw: string): Promise<URL> => {
  const parsed = new URL(raw);

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
    throw new Error("unsupported protocol");
  if (!ALLOWED_PORTS.has(parsed.port)) throw new Error("port not allowed");

  // strip brackets from IPv6 literals before classifying
  const host = parsed.hostname.replace(/^\[|\]$/g, "");

  if (isIP(host)) {
    if (isPrivateIp(host)) throw new Error("private address");
    return parsed;
  }

  const records = await lookup(host, { all: true });
  if (!records.length) throw new Error("no dns records");
  for (const { address } of records)
    if (isPrivateIp(address)) throw new Error("resolves to private address");

  return parsed;
};

interface SafeFetchOptions {
  /** Abort the request after this many milliseconds. */
  timeoutMs?: number;
  /** Maximum number of redirects to follow; each hop is re-validated. */
  maxRedirects?: number;
  /** Reject responses whose body exceeds this many bytes. */
  maxBytes?: number;
  /** Value for the Accept request header. */
  accept?: string;
}

/** A fetched, size-capped response body alongside its content type and final (post-redirect) URL. */
export interface SafeFetchResult {
  body: Uint8Array;
  contentType: string;
  finalUrl: URL;
}

/**
 * Fetch a URL with SSRF protection: every hop (including redirects) is DNS-vetted,
 * the request is time-boxed, and the body is size-capped.
 *
 * @throws If validation fails, the upstream errors, the body is too large, or redirects are exhausted
 */
export const safeFetch = async (
  raw: string,
  {
    timeoutMs = 5_000,
    maxRedirects = 3,
    maxBytes = 1_000_000,
    accept,
  }: SafeFetchOptions = {},
): Promise<SafeFetchResult> => {
  let current = await assertPublicHttpUrl(raw);

  for (let hop = 0; hop <= maxRedirects; hop++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetch(current, {
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent": USER_AGENT,
          ...(accept ? { Accept: accept } : {}),
        },
      });
    } finally {
      clearTimeout(timer);
    }

    // follow redirects by hand so each hop is SSRF-checked before we connect
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("redirect without location");
      current = await assertPublicHttpUrl(
        new URL(location, current).toString(),
      );
      continue;
    }

    if (!response.ok) throw new Error(`upstream responded ${response.status}`);

    const declaredLength = Number(response.headers.get("content-length"));
    if (declaredLength && declaredLength > maxBytes)
      throw new Error("body too large");

    const body = new Uint8Array(await response.arrayBuffer());
    if (body.byteLength > maxBytes) throw new Error("body too large");

    return {
      body,
      contentType:
        response.headers.get("content-type")?.split(";")[0]?.trim() ?? "",
      finalUrl: current,
    };
  }

  throw new Error("too many redirects");
};
