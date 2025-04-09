import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { useProjectQuery } from "generated/graphql";

import type { ProjectQueryVariables } from "generated/graphql";

const projectQueryOptions = (variables: ProjectQueryVariables) =>
  queryOptions({
    queryKey: useProjectQuery.getKey(variables),
    queryFn: useProjectQuery.fetcher(variables),
    select: (data) => data.projects?.nodes?.[0],
    placeholderData: keepPreviousData,
    enabled: !!variables.projectSlug && !!variables.organizationSlug,
  });

export default projectQueryOptions;
