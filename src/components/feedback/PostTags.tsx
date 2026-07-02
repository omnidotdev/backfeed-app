import { LuX } from "react-icons/lu";

import TagBadge from "@/components/feedback/TagBadge";
import TagPicker from "@/components/feedback/TagPicker";
import { Button } from "@/components/ui/button";
import usePostTagEditor from "@/lib/hooks/usePostTagEditor";

interface Props {
  /** Post rowId tags are assigned to */
  postId: string;
  /** Project rowId the post belongs to (source of available tags) */
  projectId: string;
  /** When false, tags are shown read-only (no add/remove controls) */
  canAssign?: boolean;
  /** When true, admins can create a new tag inline from the picker */
  canCreate?: boolean;
}

/**
 * Post tags. Shows the tags assigned to a post and, when allowed, lets the
 * user assign or unassign tags from the project's available tags.
 */
const PostTags = ({
  postId,
  projectId,
  canAssign = false,
  canCreate = false,
}: Props) => {
  const { assignedTags, toggleTag } = usePostTagEditor({ postId, projectId });

  if (!canAssign && !assignedTags.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {assignedTags.map((assignment) =>
        assignment.tag ? (
          <span key={assignment.rowId} className="inline-flex items-center">
            <TagBadge name={assignment.tag.name} color={assignment.tag.color} />

            {canAssign && (
              <Button
                size="icon"
                variant="ghost"
                className="size-5"
                aria-label={`Remove ${assignment.tag.name}`}
                disabled={assignment.rowId === "pending"}
                onClick={() => toggleTag(assignment.tag!.rowId)}
              >
                <LuX className="size-3" />
              </Button>
            )}
          </span>
        ) : null,
      )}

      {canAssign && (
        <TagPicker
          postId={postId}
          projectId={projectId}
          canCreate={canCreate}
        />
      )}
    </div>
  );
};

export default PostTags;
