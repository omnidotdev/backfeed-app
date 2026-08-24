import generateSlug from "@/lib/util/generateSlug";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Canonical item key: an optional `{PREFIX}-` (letters, then letters/digits),
// a load-bearing `{number}`, and an optional decorative `-{slug}` tail. Both
// the prefixed form (`API-42-login-bug`) and the legacy bare-number form
// (`42-login-bug`) parse; only the number is used for lookup.
const NUMBER_KEY_PATTERN = /^(?:([A-Za-z][A-Za-z0-9]*)-)?(\d+)(?:-(.*))?$/;

/**
 * Parsed form of the dynamic feedback route segment.
 *
 * - `uuid`: a legacy permalink keyed by the post's `rowId`
 * - `number`: a vanity key of `{prefix}-{number}-{slug}` (prefix and slug both
 *   optional/decorative; only the number is load-bearing)
 * - `invalid`: neither form, the route should 404
 */
export type ParsedFeedbackParam =
  | { type: "uuid"; rowId: string }
  | { type: "number"; number: number; prefix?: string; slug?: string }
  | { type: "invalid" };

/**
 * Parse the `$feedbackId` route segment into a lookup strategy. Supports the
 * legacy UUID permalink and the vanity `{prefix}-{number}-{slug}` form (the
 * prefix and slug are decorative and self-heal via the canonical redirect).
 */
export const parseFeedbackParam = (param: string): ParsedFeedbackParam => {
  if (UUID_PATTERN.test(param)) {
    return { type: "uuid", rowId: param };
  }

  const match = param.match(NUMBER_KEY_PATTERN);
  if (match) {
    return {
      type: "number",
      prefix: match[1] || undefined,
      number: Number(match[2]),
      slug: match[3] || undefined,
    };
  }

  return { type: "invalid" };
};

/**
 * Build the human-facing display key for a post: `{PREFIX}-{number}` (e.g.
 * `API-42`), falling back to `#{number}` when the project has no prefix. This
 * is the canonical token shown in the UI and meant for cross-project sharing.
 */
export const buildFeedbackDisplayKey = ({
  prefix,
  number,
}: {
  prefix?: string | null;
  number: number;
}): string => (prefix ? `${prefix}-${number}` : `#${number}`);

/**
 * Build the canonical vanity key for a post: `{prefix}-{number}-{slug}` (e.g.
 * `API-42-login-bug`). The prefix is included when the project has one so the
 * key is self-describing when pasted into a changelog, PR, or another product
 * (golden/URL-GRAMMAR.md rule 5). Falls back to dropping the prefix and/or slug
 * when either is absent, down to the bare number.
 */
export const buildFeedbackKey = ({
  prefix,
  number,
  title,
}: {
  prefix?: string | null;
  number: number;
  title?: string | null;
}): string => {
  const base = prefix ? `${prefix}-${number}` : `${number}`;
  const slug = generateSlug(title ?? undefined);

  return slug ? `${base}-${slug}` : base;
};
