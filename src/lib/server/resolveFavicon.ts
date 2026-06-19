import sharp from "sharp";

import { safeFetch } from "@/lib/server/ssrf";

/** A favicon ready to serve: image bytes plus the content type to send. */
export interface ResolvedFavicon {
  body: Uint8Array;
  contentType: string;
}

/** Score given to scalable (SVG) icons so they rank above any raster candidate. */
const SCALABLE_SCORE = 1_024;

/** Output dimension for normalized raster favicons. */
const RASTER_SIZE = 64;

/**
 * Pull candidate icon URLs out of a page's HTML, best (largest) first. Considers
 * any <link> whose rel mentions "icon" (icon, shortcut icon, apple-touch-icon,
 * mask-icon) and ranks them by declared size, preferring SVG.
 */
const parseIconLinks = (html: string, baseUrl: URL): string[] => {
  const candidates: { href: string; score: number }[] = [];

  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1];
    if (!rel || !/icon/i.test(rel)) continue;

    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href) continue;

    const sizes = tag.match(/\bsizes=["']([^"']+)["']/i)?.[1] ?? "";
    const isScalable = /\.svg(?:[?#]|$)/i.test(href) || /mask-icon/i.test(rel);
    const declared = Number(sizes.match(/(\d+)x\d+/i)?.[1]);
    const score = isScalable
      ? SCALABLE_SCORE
      : declared || (/apple-touch/i.test(rel) ? 180 : 16);

    try {
      candidates.push({ href: new URL(href, baseUrl).toString(), score });
    } catch {
      // skip hrefs that will not resolve against the page URL
    }
  }

  return candidates
    .sort((a, b) => b.score - a.score)
    .map((candidate) => candidate.href);
};

/** Standardize raster icons to a square PNG; pass SVG and formats sharp cannot read through untouched. */
const normalizeIcon = async (
  body: Uint8Array,
  contentType: string,
): Promise<ResolvedFavicon> => {
  if (contentType.includes("svg"))
    return { body, contentType: "image/svg+xml" };

  try {
    const png = await sharp(body)
      .resize(RASTER_SIZE, RASTER_SIZE, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    return { body: new Uint8Array(png), contentType: "image/png" };
  } catch {
    // sharp cannot decode .ico and a few exotic formats; serve the original bytes
    return { body, contentType: contentType || "image/x-icon" };
  }
};

/**
 * Resolve and normalize the favicon for an arbitrary website URL. Tries icons
 * declared in the page's HTML first, then the conventional /favicon.ico, and
 * returns null when nothing usable can be fetched.
 *
 * @param rawUrl - The website URL whose favicon to resolve
 */
export const resolveFavicon = async (
  rawUrl: string,
): Promise<ResolvedFavicon | null> => {
  let origin: URL;
  try {
    origin = new URL(rawUrl);
  } catch {
    return null;
  }

  const iconUrls: string[] = [];

  try {
    const page = await safeFetch(origin.toString(), {
      accept: "text/html,application/xhtml+xml",
      maxBytes: 1_000_000,
    });
    const html = new TextDecoder().decode(page.body);
    iconUrls.push(...parseIconLinks(html, page.finalUrl));
  } catch {
    // page fetch or parse failed; the conventional fallback below still applies
  }

  iconUrls.push(new URL("/favicon.ico", origin).toString());

  for (const iconUrl of [...new Set(iconUrls)]) {
    try {
      const icon = await safeFetch(iconUrl, {
        accept: "image/*",
        maxBytes: 512_000,
      });
      if (!icon.body.byteLength) continue;
      return await normalizeIcon(icon.body, icon.contentType);
    } catch {
      // try the next candidate
    }
  }

  return null;
};
