/**
 * Widths the attachment serve route will emit. Keep in sync with the
 * `ALLOWED_WIDTHS` constant in `backfeed-api/src/lib/media/serve.route.ts`.
 * Requesting a width outside this list still works (the server snaps to the
 * nearest entry), but emitting the exact set in `srcset` lets the browser pick
 * the perfect derivative without any server-side snap rounding error.
 */
export const IMAGE_WIDTHS = [320, 640, 960, 1280, 1600, 1920] as const;

type Variant = {
  width: number;
  format: "webp" | "jpeg";
};

const appendParams = (src: string, params: Variant): string => {
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${params.width}&fm=${params.format}`;
};

/**
 * Build a `srcset` value that asks the API for one webp derivative at each
 * entry in `IMAGE_WIDTHS`. The browser picks the smallest one that still fills
 * the rendered slot (driven by the `sizes` attribute on the `<img>`), so a
 * phone downloads 320w and a 4K display downloads 1920w from the same upload.
 */
export const buildSrcset = (src: string): string =>
  IMAGE_WIDTHS.map(
    (width) => `${appendParams(src, { width, format: "webp" })} ${width}w`,
  ).join(", ");

/**
 * Build the `src` attribute for browsers that ignore `srcset`. We pick a
 * sensible mid-size jpeg (universal support, no WebP capability check needed)
 * so the fallback is well-formed even in legacy clients.
 */
export const buildFallbackUrl = (src: string): string =>
  appendParams(src, { width: 1280, format: "jpeg" });
