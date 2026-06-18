/**
 * Status `name`s hidden from the public roadmap by default. The roadmap is a
 * curated "what we're building" view (Planned / In Progress / Completed), not
 * the raw intake backlog (Open / Under Review) or closed items, which keeps the
 * huge "Open" column off the public board. Mirrors how Canny curates which
 * statuses appear on a public roadmap.
 *
 * Matches the seeded default status names; custom statuses fall through and are
 * shown. The per-status `showOnRoadmap` flag overrides this heuristic.
 */
export const ROADMAP_HIDDEN_STATUS_NAMES = new Set<string>([
  "open",
  "under_review",
  "closed",
]);

/**
 * Whether a status appears on the public roadmap: the explicit `showOnRoadmap`
 * flag if an admin set one, otherwise the default curation heuristic.
 */
export const isStatusOnRoadmap = (status: {
  name?: string | null;
  showOnRoadmap?: boolean | null;
}): boolean =>
  status.showOnRoadmap ?? !ROADMAP_HIDDEN_STATUS_NAMES.has(status.name ?? "");
