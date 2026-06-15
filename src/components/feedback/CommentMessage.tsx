import { Link, useParams } from "@tanstack/react-router";

import { splitIssueRefs } from "@/lib/util/issueRefs";

interface Props {
  message: string | null | undefined;
}

/**
 * Render a comment body, turning GitHub-style `#<number>` issue references into
 * links to the referenced post in the same project. Falls back to plain text
 * when the route params are unavailable (references render as plain text).
 */
const CommentMessage = ({ message }: Props) => {
  // self-contained: read the current workspace/project from the route
  const { workspaceSlug, projectSlug } = useParams({ strict: false });

  if (!message) return null;

  const canLink = Boolean(workspaceSlug && projectSlug);

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
