/**
 * Status `name`s hidden from the board by default. The board is the active
 * working view (Open / Under Review / In Progress / Planned), so terminal
 * statuses (Completed / Closed) are filtered out by default to keep resolved
 * items from burying open feedback. The pills stay one click away, so anyone
 * can toggle a hidden status back on.
 *
 * Matches the seeded default status names; custom statuses fall through and are
 * shown. The per-status `showOnBoard` flag overrides this heuristic.
 */
export const BOARD_HIDDEN_STATUS_NAMES = new Set<string>([
  "completed",
  "closed",
]);

/**
 * Whether a status is shown on the board by default: the explicit `showOnBoard`
 * flag if an admin set one, otherwise the default curation heuristic.
 */
export const isStatusOnBoard = (status: {
  name?: string | null;
  showOnBoard?: boolean | null;
}): boolean =>
  status.showOnBoard ?? !BOARD_HIDDEN_STATUS_NAMES.has(status.name ?? "");
