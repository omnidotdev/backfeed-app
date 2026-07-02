import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import StatusBadge from "@/components/core/StatusBadge";
import { similarPostsOptions } from "@/lib/options/similarPosts";

interface Props {
  projectId: string;
  /** The current draft text (title, optionally + description). */
  content: string;
}

/**
 * Surfaces possible duplicate posts while a user drafts a new one, GitHub-style
 * ("we found similar posts"). Advisory: it links to candidates so the user can
 * upvote an existing post instead of filing a duplicate. Debounced so it does not
 * query on every keystroke.
 */
const PossibleDuplicates = ({ projectId, content }: Props) => {
  const { workspaceSlug, projectSlug } = useParams({ strict: false });

  const [debounced, setDebounced] = useState(content);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(content), 400);
    return () => clearTimeout(id);
  }, [content]);

  const { data: similar } = useQuery(similarPostsOptions(projectId, debounced));

  if (!similar?.length || !workspaceSlug || !projectSlug) return null;

  return (
    <div className="rounded-md border border-border bg-background-subtle p-3 text-sm">
      <p className="mb-1 font-medium text-foreground-subtle">
        Possible duplicates - is your feedback already here?
      </p>
      <ul className="flex flex-col gap-1">
        {similar.map((post) => (
          <li key={post.id} className="flex items-center gap-2">
            <Link
              to="/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId"
              params={{
                workspaceSlug: workspaceSlug as string,
                projectSlug: projectSlug as string,
                feedbackId: post.number ? String(post.number) : post.id,
              }}
              className="truncate text-[var(--colors-brand-primary)] hover:underline"
            >
              {post.number ? `#${post.number} ` : ""}
              {post.title ?? "Untitled"}
            </Link>
            {/* surface the status so an already-completed/closed match reads as
                resolved rather than something still open to duplicate */}
            {post.status && (
              <StatusBadge
                status={post.status}
                className="shrink-0 px-2 py-0.5"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PossibleDuplicates;
