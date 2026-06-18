/**
 * GitHub-style issue cross-referencing: a `#<number>` token references another
 * post (by its per-project number) in the same project. `splitIssueRefs` parses
 * a plain-text message into text and reference segments so it can be rendered
 * with the references turned into links.
 *
 * A reference must sit on a word boundary (so hex colors like `#fff` or ids like
 * `abc#12` are left alone) and have at least one digit.
 */

export type MessageSegment =
  | { type: "text"; value: string }
  | { type: "ref"; number: number; raw: string };

// `#` not preceded by a word char, followed by digits
const ISSUE_REF_PATTERN = /(?<!\w)#(\d+)/g;

/** Split a message into text and `#number` reference segments. */
export const splitIssueRefs = (message: string): MessageSegment[] => {
  const segments: MessageSegment[] = [];
  let lastIndex = 0;

  for (const match of message.matchAll(ISSUE_REF_PATTERN)) {
    const start = match.index;
    if (start > lastIndex) {
      segments.push({ type: "text", value: message.slice(lastIndex, start) });
    }
    segments.push({
      type: "ref",
      number: Number(match[1]),
      raw: match[0],
    });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < message.length) {
    segments.push({ type: "text", value: message.slice(lastIndex) });
  }

  // an empty message yields no segments; callers treat that as plain empty
  return segments.length > 0 ? segments : [{ type: "text", value: message }];
};

/**
 * Linkify GitHub-style `#<number>` references inside a rich-text HTML string.
 * Splits on tags so refs are only matched in text (never inside attributes),
 * and skips numeric entities like `&#39;`. `hrefForNumber` maps a referenced
 * post number to its route.
 */
export const linkifyIssueRefsHtml = (
  html: string,
  hrefForNumber: (number: string) => string,
): string =>
  html
    .split(/(<[^>]+>)/)
    .map((segment) =>
      segment.startsWith("<")
        ? segment
        : segment.replace(
            /(?<![&\w])#(\d+)\b/g,
            (match, number) =>
              `<a href="${hrefForNumber(number)}">${match}</a>`,
          ),
    )
    .join("");
