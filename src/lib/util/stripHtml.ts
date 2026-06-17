/**
 * Strip HTML to readable plain text. Block-level boundaries (paragraphs, list
 * items, line breaks, headings) become spaces so words don't run together, then
 * remaining tags are removed, common entities decoded, and whitespace collapsed.
 *
 * Used for plain-text contexts (OG images, meta descriptions, feed previews)
 * now that rich-text fields store HTML. Plain-text input passes through safely.
 */
const stripHtml = (html: string | null | undefined): string => {
  if (!html) return "";

  return html
    .replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
};

export default stripHtml;
