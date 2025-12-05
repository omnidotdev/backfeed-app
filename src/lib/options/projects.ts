import { queryOptions } from "@tanstack/react-query";

import { useProjectsQuery } from "@/generated/graphql";

import type { ProjectsQueryVariables } from "@/generated/graphql";

export const projectsOptions = (variables: ProjectsQueryVariables) =>
  queryOptions({
    queryKey: useProjectsQuery.getKey(variables),
    queryFn: useProjectsQuery.fetcher(variables),
  });
