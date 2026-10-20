/** Who can see a workspace link. */
export type WorkspaceLinkVisibility = "public" | "members";

/**
 * A workspace (organization) identity link, e.g. a website or social URL.
 */
export interface WorkspaceLink {
  url: string;
  title: string | null;
  visibility: WorkspaceLinkVisibility;
}

/**
 * Normalize a workspace's `links` value into a typed array. Gatekeeper delivers
 * links already parsed (an array) via the org claim and the by-slug endpoint,
 * but the authenticated full-organization lookup returns the raw JSON string,
 * so accept either. Tolerates null and unexpected shapes by returning an empty
 * list. A link with no stored visibility is treated as public.
 */
const toWorkspaceLinks = (raw: unknown): WorkspaceLink[] => {
  let value: unknown = raw;

  if (typeof raw === "string") {
    if (!raw) return [];
    try {
      value = JSON.parse(raw);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (
        entry,
      ): entry is { url: string; title?: unknown; visibility?: unknown } =>
        !!entry && typeof entry === "object" && typeof entry.url === "string",
    )
    .map((entry) => ({
      url: entry.url,
      title: typeof entry.title === "string" ? entry.title : null,
      visibility: entry.visibility === "members" ? "members" : "public",
    }));
};

/**
 * Public links only. Backfeed workspace pages are a public surface, so they
 * never show members-only links, even to a signed-in member.
 */
export const publicWorkspaceLinks = (raw: unknown): WorkspaceLink[] =>
  toWorkspaceLinks(raw).filter((link) => link.visibility === "public");
