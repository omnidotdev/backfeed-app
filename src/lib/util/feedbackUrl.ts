import generateSlug from "@/lib/util/generateSlug";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NUMBER_KEY_PATTERN = /^(\d+)(?:-(.*))?$/;

/**
 * Parsed form of the dynamic feedback route segment.
 *
 * - `uuid`: a legacy permalink keyed by the post's `rowId`
 * - `number`: a vanity key of `{number}-{slug}` (slug optional/decorative)
 * - `invalid`: neither form, the route should 404
 */
export type ParsedFeedbackParam =
  | { type: "uuid"; rowId: string }
  | { type: "number"; number: number; slug?: string }
  | { type: "invalid" };

/**
 * Parse the `$feedbackId` route segment into a lookup strategy. Supports the
 * legacy UUID permalink and the vanity `{number}-{slug}` form.
 */
export const parseFeedbackParam = (param: string): ParsedFeedbackParam => {
  if (UUID_PATTERN.test(param)) {
    return { type: "uuid", rowId: param };
  }

  const match = param.match(NUMBER_KEY_PATTERN);
  if (match) {
    return {
      type: "number",
      number: Number(match[1]),
      slug: match[2] || undefined,
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
 * Build the canonical vanity key for a post: `{number}-{slug}`, falling back to
 * the bare number when the title has no slugifiable content.
 */
export const buildFeedbackKey = ({
  number,
  title,
}: {
  number: number;
  title?: string | null;
}): string => {
  const slug = generateSlug(title ?? undefined);

  return slug ? `${number}-${slug}` : `${number}`;
};
