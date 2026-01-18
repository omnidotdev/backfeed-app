/**
 * Get favicon URL for a given website URL using Google's favicon service.
 * Returns null if the URL is invalid or empty.
 *
 * @param url - The website URL to get favicon for
 * @param size - The size of the favicon (default: 32)
 * @returns The favicon URL or null if invalid
 */
const getFaviconUrl = (url: string, size = 32): string | null => {
  if (!url) return null;

  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`;
  } catch {
    // Invalid URL, return null
    return null;
  }
};

export default getFaviconUrl;
