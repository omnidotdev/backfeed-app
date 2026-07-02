import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

/** A project tag (GitHub-issue-style label). */
export interface Tag {
  rowId: string;
  projectId: string;
  name: string;
  color: string | null;
}

/** Suggested label colors, friendly defaults like GitHub labels. */
export const TAG_COLOR_PRESETS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

/**
 * Deterministically pick a preset color for a tag name, so a given name always
 * maps to the same color (e.g. when created inline from the tag picker).
 */
export const pickTagColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return TAG_COLOR_PRESETS[Math.abs(hash) % TAG_COLOR_PRESETS.length]!;
};

/** A tag assignment on a post, including the resolved tag. */
export interface PostTagAssignment {
  rowId: string;
  tag: Pick<Tag, "rowId" | "name" | "color"> | null;
}

interface ProjectTagsData {
  tags: {
    nodes: Tag[];
  };
}

/** Raw response shape of the post-tags query, cached before `select` runs. */
export interface PostTagsData {
  post: {
    rowId: string;
    postTags: {
      nodes: PostTagAssignment[];
    };
  } | null;
}

// raw documents (no codegen needed); the API exposes auto-CRUD tag/postTag fields
const PROJECT_TAGS_QUERY = `
  query ProjectTags($projectId: UUID!) {
    tags(condition: { projectId: $projectId }, orderBy: NAME_ASC) {
      nodes {
        rowId
        projectId
        name
        color
      }
    }
  }
`;

const POST_TAGS_QUERY = `
  query PostTags($postId: UUID!) {
    post(rowId: $postId) {
      rowId
      postTags {
        nodes {
          rowId
          tag {
            rowId
            name
            color
          }
        }
      }
    }
  }
`;

const CREATE_TAG_MUTATION = `
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      tag {
        rowId
        projectId
        name
        color
      }
    }
  }
`;

const UPDATE_TAG_MUTATION = `
  mutation UpdateTag($rowId: UUID!, $patch: TagPatch!) {
    updateTag(input: { rowId: $rowId, patch: $patch }) {
      tag {
        rowId
        projectId
        name
        color
      }
    }
  }
`;

const DELETE_TAG_MUTATION = `
  mutation DeleteTag($rowId: UUID!) {
    deleteTag(input: { rowId: $rowId }) {
      clientMutationId
    }
  }
`;

const CREATE_POST_TAG_MUTATION = `
  mutation CreatePostTag($input: CreatePostTagInput!) {
    createPostTag(input: $input) {
      postTag {
        rowId
        postId
        tagId
      }
    }
  }
`;

const DELETE_POST_TAG_MUTATION = `
  mutation DeletePostTag($rowId: UUID!) {
    deletePostTag(input: { rowId: $rowId }) {
      clientMutationId
    }
  }
`;

/** Query key roots, exported so callers can invalidate consistently. */
export const projectTagsQueryKey = (projectId: string) =>
  ["ProjectTags", projectId] as const;

export const postTagsQueryKey = (postId: string) =>
  ["PostTags", postId] as const;

/** Tags defined for a project, sorted by name. */
export const projectTagsOptions = (projectId: string) =>
  queryOptions({
    queryKey: projectTagsQueryKey(projectId),
    queryFn: graphqlFetch<ProjectTagsData, { projectId: string }>(
      PROJECT_TAGS_QUERY,
      { projectId },
    ),
    enabled: Boolean(projectId),
    select: (data) => data.tags?.nodes ?? [],
  });

/** Tags assigned to a specific post. */
export const postTagsOptions = (postId: string) =>
  queryOptions({
    queryKey: postTagsQueryKey(postId),
    queryFn: graphqlFetch<PostTagsData, { postId: string }>(POST_TAGS_QUERY, {
      postId,
    }),
    enabled: Boolean(postId),
    select: (data) => data.post?.postTags?.nodes ?? [],
  });

/** Create a project tag. Admin-only on the API. */
export const createTag = (input: {
  projectId: string;
  name: string;
  color: string;
}) =>
  graphqlFetch<{ createTag: { tag: Tag } }, { input: { tag: typeof input } }>(
    CREATE_TAG_MUTATION,
    { input: { tag: input } },
  )();

/** Update a project tag. Admin-only on the API. */
export const updateTag = (
  rowId: string,
  patch: { name?: string; color?: string },
) =>
  graphqlFetch<
    { updateTag: { tag: Tag } },
    { rowId: string; patch: typeof patch }
  >(UPDATE_TAG_MUTATION, { rowId, patch })();

/** Delete a project tag. Admin-only on the API. */
export const deleteTag = (rowId: string) =>
  graphqlFetch<
    { deleteTag: { clientMutationId: string | null } },
    { rowId: string }
  >(DELETE_TAG_MUTATION, { rowId })();

/** Assign a tag to a post. Allowed for any authenticated user. */
export const createPostTag = (input: { postId: string; tagId: string }) =>
  graphqlFetch<
    { createPostTag: { postTag: { rowId: string } } },
    { input: { postTag: typeof input } }
  >(CREATE_POST_TAG_MUTATION, { input: { postTag: input } })();

/** Unassign a tag from a post. Allowed for any authenticated user. */
export const deletePostTag = (rowId: string) =>
  graphqlFetch<
    { deletePostTag: { clientMutationId: string | null } },
    { rowId: string }
  >(DELETE_POST_TAG_MUTATION, { rowId })();
