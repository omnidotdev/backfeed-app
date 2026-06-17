import { Link, useParams } from "@tanstack/react-router";

import { RichTextContent } from "@/components/ui/rich-text-editor";
import { splitIssueRefs } from "@/lib/util/issueRefs";

interface Props {
  message: string | null | undefined;
}

/**
 * Linkify GitHub-style `#<number>` references in rich-text (HTML) comment
 * bodies. Splits on tags so refs are only matched in text (not inside
 * attributes), and skips numeric entities like `&#39;`.
 */
const linkifyIssueRefs = (html: string, hrefFor: (n: string) => string) =>
  html
    .split(/(<[^>]+>)/)
    .map((segment) =>
      segment.startsWith("<")
        ? segment
        : segment.replace(
            /(?<![&\w])#(\d+)\b/g,
            (match, number) => `<a href="${hrefFor(number)}">${match}</a>`,
          ),
    )
    .join("");

/**
 * Render a comment body. New comments are rich text (HTML); legacy comments are
 * plain text. Both turn GitHub-style `#<number>` references into links to the
 * referenced post in the same project (plain text uses client-side links; HTML
 * uses anchors that navigate to the post).
 */
const CommentMessage = ({ message }: Props) => {
  // self-contained: read the current workspace/project from the route
  const { workspaceSlug, projectSlug } = useParams({ strict: false });

  if (!message) return null;

  const canLink = Boolean(workspaceSlug && projectSlug);

  // rich-text comments store HTML; render sanitized, with refs linkified
  if (/<[a-z][\s\S]*>/i.test(message)) {
    const html = canLink
      ? linkifyIssueRefs(
          message,
          (number) =>
            `/workspaces/${workspaceSlug}/projects/${projectSlug}/${number}`,
        )
      : message;

    return <RichTextContent html={html} />;
  }

  return (
    <>
      {message.split("\n").map((line, lineIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: positional line rendering
        <span key={lineIndex}>
          {splitIssueRefs(line).map((segment, segmentIndex) =>
            segment.type === "ref" && canLink ? (
              <Link
                // biome-ignore lint/suspicious/noArrayIndexKey: positional segment
                key={segmentIndex}
                to="/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId"
                params={{
                  workspaceSlug: workspaceSlug as string,
                  projectSlug: projectSlug as string,
                  feedbackId: String(segment.number),
                }}
                className="font-medium text-[var(--colors-brand-primary)] hover:underline"
              >
                {segment.raw}
              </Link>
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: positional segment
              <span key={segmentIndex}>
                {segment.type === "ref" ? segment.raw : segment.value}
              </span>
            ),
          )}
          <br />
        </span>
      ))}
    </>
  );
};

export default CommentMessage;
