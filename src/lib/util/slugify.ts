/**
 * Derive a machine-readable key from a human label, e.g. "In Progress" ->
 * "in_progress". Lowercases, collapses any run of non-alphanumeric characters
 * to a single underscore, and trims leading/trailing underscores.
 */
const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export default slugify;
