import { queryOptions } from "@tanstack/react-query";

import { useProjectStatusesQuery } from "generated/graphql";

import type { ProjectStatusesQueryVariables } from "generated/graphql";

const projectStatusesQueryOptions = (
  variables: ProjectStatusesQueryVariables
) =>
  queryOptions({
    queryKey: useProjectStatusesQuery.getKey(variables),
    queryFn: useProjectStatusesQuery.fetcher(variables),
    select: (data) =>
      data?.postStatuses?.nodes?.map((status) => ({
        rowId: status?.rowId,
        status: status?.status,
        color: status?.color,
      })),
  });

export default projectStatusesQueryOptions;
