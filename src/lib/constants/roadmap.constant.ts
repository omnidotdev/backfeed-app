/**
 * Status `name`s hidden from the public roadmap by default. The roadmap is a
 * curated "what we're building" view (Planned / In Progress / Completed), not
 * the raw intake backlog (Open / Under Review) or closed items, which keeps the
 * huge "Open" column off the public board. Mirrors how Canny curates which
 * statuses appear on a public roadmap.
 *
 * Matches the seeded default status names; custom statuses fall through and are
 * shown. A per-status "show on roadmap" toggle is the planned richer control.
 */
export const ROADMAP_HIDDEN_STATUS_NAMES = new Set<string>([
  "open",
  "under_review",
  "closed",
]);
