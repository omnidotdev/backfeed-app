/**
 * Build the URL for a website's favicon, served through our own caching proxy
 * (see src/routes/api/favicon.ts) so we render the site's real icon rather than
 * a third-party service's cached crop. Returns null for empty or non-web URLs.
 *
 * @param url - The website URL to get the favicon for
 * @returns A same-origin proxy URL, or null if the input is not a valid http(s) URL
 */
const getFaviconUrl = (url: string): string | null => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
      return null;
    return `/api/favicon?url=${encodeURIComponent(parsed.toString())}`;
  } catch {
    // invalid URL, return null
    return null;
  }
};

export default getFaviconUrl;
