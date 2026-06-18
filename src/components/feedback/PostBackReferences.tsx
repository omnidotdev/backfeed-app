import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LuGitPullRequestArrow } from "react-icons/lu";

import { backReferencesOptions } from "@/lib/options/backReferences";
import { buildFeedbackKey } from "@/lib/util/feedbackUrl";

interface Props {
  /** The post being referenced. */
  rowId: string;
  number: number;
  projectId: string;
  /** Route params for building links to the referencing posts. */
  workspaceSlug: string;
  projectSlug: string;
}

/**
 * Inbound references. Lists the posts that reference this one via `#<number>`
 * (the "referenced by" side of GitHub-style cross-referencing). Renders nothing
 * until at least one other post points here.
 */
const PostBackReferences = ({
  rowId,
  number,
  projectId,
  workspaceSlug,
  projectSlug,
}: Props) => {
  const { data: references } = useQuery(
    backReferencesOptions({ projectId, rowId, number }),
  );

  if (!references?.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-medium text-foreground-subtle text-xs uppercase tracking-wide">
        Referenced by
      </h2>

      <ul className="flex flex-col gap-2">
        {references.map((reference) => (
          <li key={reference.rowId}>
            <Link
              to="/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId"
              params={{
                workspaceSlug,
                projectSlug,
                feedbackId: buildFeedbackKey({
                  number: reference.number,
                  title: reference.title,
                }),
              }}
              className="flex items-center gap-2 text-sm hover:text-foreground"
            >
              <LuGitPullRequestArrow className="size-4 shrink-0 text-foreground-subtle" />
              <span className="shrink-0 font-medium text-muted-foreground">
                #{reference.number}
              </span>
              <span className="truncate text-muted-foreground">
                {reference.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostBackReferences;
