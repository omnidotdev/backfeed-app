import { useQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";

import TagBadge from "@/components/feedback/TagBadge";
import { projectTagsOptions } from "@/lib/options/tags";
import cn from "@/lib/utils";

const projectRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
);

/**
 * Tag filter pills. Toggling a tag filters the feed to posts carrying any of
 * the selected tags (GitHub-label-style filtering), via the `tags` search param.
 */
const TagFilterPills = () => {
  const { projectId } = projectRoute.useLoaderData();
  const selectedTags = projectRoute.useSearch({ select: ({ tags }) => tags });
  const navigate = useNavigate({
    from: "/workspaces/$workspaceSlug/projects/$projectSlug",
  });

  const { data: tags } = useQuery(projectTagsOptions(projectId));

  if (!tags?.length) return null;

  const toggleTag = (rowId: string) => {
    const next = selectedTags.includes(rowId)
      ? selectedTags.filter((tag) => tag !== rowId)
      : [...selectedTags, rowId];

    navigate({ search: (prev) => ({ ...prev, tags: next }) });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => {
        const isActive = selectedTags.includes(tag.rowId);

        return (
          <button
            key={tag.rowId}
            type="button"
            aria-pressed={isActive}
            onClick={() => toggleTag(tag.rowId)}
            className={cn(
              "rounded-full transition-opacity",
              isActive ? "opacity-100" : "opacity-55 hover:opacity-100",
            )}
          >
            <TagBadge
              name={tag.name}
              color={tag.color}
              className={cn(
                "cursor-pointer",
                isActive && "ring-1 ring-primary",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default TagFilterPills;
