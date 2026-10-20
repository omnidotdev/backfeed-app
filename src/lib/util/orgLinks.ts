/**
 * A workspace (organization) identity link, e.g. a website or social URL.
 */
export interface WorkspaceLink {
  url: string;
  title: string | null;
}

/**
 * Parse a workspace's `links` value (a JSON-encoded ordered list from the
 * Gatekeeper organization) into a typed array, tolerating null, malformed JSON,
 * and unexpected shapes by returning an empty list.
 */
export const parseOrgLinks = (raw: unknown): WorkspaceLink[] => {
  if (typeof raw !== "string" || !raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (entry): entry is { url: string; title?: unknown } =>
          !!entry && typeof entry === "object" && typeof entry.url === "string",
      )
      .map((entry) => ({
        url: entry.url,
        title: typeof entry.title === "string" ? entry.title : null,
      }));
  } catch {
    return [];
  }
};
