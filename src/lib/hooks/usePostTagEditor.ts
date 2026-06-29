import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPostTag,
  deletePostTag,
  postTagsOptions,
  postTagsQueryKey,
  projectTagsOptions,
} from "@/lib/options/tags";
import toaster from "@/lib/util/toaster";

import type { InfiniteData } from "@tanstack/react-query";
import type { PostTagAssignment, PostTagsData, Tag } from "@/lib/options/tags";

/** A post node carrying the tag list shape shared by every feedback query. */
interface PostTagsNode {
  rowId: string;
  postTags: {
    nodes: Array<{ tag: Pick<Tag, "rowId" | "name" | "color"> | null } | null>;
  };
}

interface Params {
  /** Post rowId tags are assigned to. */
  postId: string;
  /** Project rowId the post belongs to (source of available tags). */
  projectId: string;
  /** Load the queries. Defer until a picker is actually opened to avoid a query per card. */
  enabled?: boolean;
}

/**
 * Shared logic for assigning and unassigning a post's tags. Keeps every cache
 * that renders the post (detail page, feedback lists, roadmap board) in sync
 * with a single optimistic toggle, so a change made on one surface shows
 * instantly on all of them.
 */
const usePostTagEditor = ({ postId, projectId, enabled = true }: Params) => {
  const queryClient = useQueryClient();

  const { data: assignedTags, isLoading: isLoadingAssigned } = useQuery({
    ...postTagsOptions(postId),
    enabled: enabled && Boolean(postId),
  });
  const { data: projectTags, isLoading: isLoadingProjectTags } = useQuery({
    ...projectTagsOptions(projectId),
    enabled: enabled && Boolean(projectId),
  });

  const queryKey = postTagsQueryKey(postId);

  /** Apply the same tag-list edit to every cached copy of this post. */
  const patchEverySurface = (
    edit: (
      nodes: PostTagsNode["postTags"]["nodes"],
    ) => PostTagsNode["postTags"]["nodes"],
  ) => {
    const patchPost = <T extends PostTagsNode | null | undefined>(
      post: T,
    ): T =>
      post && post.rowId === postId
        ? {
            ...post,
            postTags: { ...post.postTags, nodes: edit(post.postTags.nodes) },
          }
        : post;

    // detail page + the picker itself
    queryClient.setQueryData<PostTagsData>(queryKey, (old) =>
      old?.post ? { ...old, post: patchPost(old.post) } : old,
    );

    // single-post detail queries
    for (const key of [["FeedbackById"], ["FeedbackByNumber"]] as const) {
      queryClient.setQueriesData<{ post?: PostTagsNode | null } | undefined>(
        { queryKey: key },
        (old) => (old ? { ...old, post: patchPost(old.post) } : old),
      );
      queryClient.setQueriesData<
        { postByProjectIdAndNumber?: PostTagsNode | null } | undefined
      >({ queryKey: key }, (old) =>
        old?.postByProjectIdAndNumber
          ? {
              ...old,
              postByProjectIdAndNumber: patchPost(old.postByProjectIdAndNumber),
            }
          : old,
      );
    }

    // every paginated feedback list (project feed, grid, roadmap columns)
    queryClient.setQueriesData<
      InfiniteData<{ posts?: { nodes: Array<PostTagsNode | null> } | null }>
    >({ queryKey: ["Posts.infinite"] }, (old) =>
      old
        ? {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts
                ? {
                    ...page.posts,
                    nodes: page.posts.nodes.map((node) => patchPost(node)),
                  }
                : page.posts,
            })),
          }
        : old,
    );
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] });
    queryClient.invalidateQueries({ queryKey: ["FeedbackById"] });
    queryClient.invalidateQueries({ queryKey: ["FeedbackByNumber"] });
  };

  /** Snapshot the detail-page cache so a failed mutation can roll back. */
  const snapshot = async () => {
    await queryClient.cancelQueries({ queryKey });
    return queryClient.getQueryData<PostTagsData>(queryKey);
  };

  const { mutate: assign } = useMutation({
    mutationFn: (tagId: string) => createPostTag({ postId, tagId }),
    onMutate: async (tagId) => {
      const previous = await snapshot();
      const tag = (projectTags ?? []).find((t) => t.rowId === tagId);
      patchEverySurface((nodes) => [
        ...nodes,
        {
          tag: tag
            ? { rowId: tag.rowId, name: tag.name, color: tag.color }
            : null,
        },
      ]);
      return { previous };
    },
    onError: (_error, _tagId, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
      invalidate();
      toaster.error({ title: "Could not add tag" });
    },
    onSettled: invalidate,
  });

  const { mutate: unassign } = useMutation({
    mutationFn: (tagId: string) => {
      const assignment = (assignedTags ?? []).find(
        (node) => node.tag?.rowId === tagId,
      );
      if (!assignment) return Promise.resolve(null);
      return deletePostTag(assignment.rowId);
    },
    onMutate: async (tagId) => {
      const previous = await snapshot();
      patchEverySurface((nodes) =>
        nodes.filter((node) => node?.tag?.rowId !== tagId),
      );
      return { previous };
    },
    onError: (_error, _tagId, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
      invalidate();
      toaster.error({ title: "Could not remove tag" });
    },
    onSettled: invalidate,
  });

  const assignedTagIds = (assignedTags ?? [])
    .map((node) => node.tag?.rowId)
    .filter((id): id is string => Boolean(id));

  const isAssigned = (tagId: string) => assignedTagIds.includes(tagId);

  /** Assign the tag if missing, otherwise unassign it. */
  const toggleTag = (tagId: string) =>
    isAssigned(tagId) ? unassign(tagId) : assign(tagId);

  return {
    assignedTags: (assignedTags ?? []) as PostTagAssignment[],
    projectTags: (projectTags ?? []) as Tag[],
    assignedTagIds,
    isAssigned,
    toggleTag,
    isLoading: isLoadingAssigned || isLoadingProjectTags,
  };
};

export default usePostTagEditor;
