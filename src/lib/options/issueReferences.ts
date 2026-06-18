import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

import type { IssueReferenceItem } from "@/components/ui/rich-text-editor";

interface ProjectIssueRefsData {
  projects: {
    nodes: Array<{
      rowId: string;
      posts: {
        nodes: Array<{
          rowId: string;
          number: number;
          title: string | null;
        }>;
      };
    }>;
  } | null;
}

interface ProjectIssueRefsVars {
  projectSlug: string;
  organizationId: string;
}

// raw document (no codegen needed); offers the project's posts for the `#` typeahead
const PROJECT_ISSUE_REFS_QUERY = `
  query ProjectIssueRefs($projectSlug: String!, $organizationId: UUID!) {
    projects(
      condition: { slug: $projectSlug, organizationId: $organizationId }
      first: 1
    ) {
      nodes {
        rowId
        posts(orderBy: NUMBER_DESC, first: 200) {
          nodes {
            rowId
            number
            title
          }
        }
      }
    }
  }
`;

/** Query key for a project's issue-reference candidates. */
export const projectIssueRefsQueryKey = (
  projectSlug: string,
  organizationId: string,
) => ["ProjectIssueRefs", projectSlug, organizationId] as const;

/**
 * The current project's posts, shaped as `#`-reference typeahead items (most
 * recent first, capped). Cross-project references are out of scope.
 */
export const projectIssueRefsOptions = (params: ProjectIssueRefsVars) =>
  queryOptions({
    queryKey: projectIssueRefsQueryKey(
      params.projectSlug,
      params.organizationId,
    ),
    queryFn: graphqlFetch<ProjectIssueRefsData, ProjectIssueRefsVars>(
      PROJECT_ISSUE_REFS_QUERY,
      params,
    ),
    enabled: Boolean(params.projectSlug && params.organizationId),
    select: (data): IssueReferenceItem[] =>
      (data.projects?.nodes?.[0]?.posts?.nodes ?? []).map((post) => ({
        id: post.rowId,
        number: post.number,
        title: post.title ?? "",
      })),
  });
