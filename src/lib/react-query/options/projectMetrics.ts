import { queryOptions } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useProjectMetricsQuery } from "generated/graphql";

import type { ProjectMetricsQueryVariables } from "generated/graphql";

const projectMetricsQueryOptions = (variables: ProjectMetricsQueryVariables) =>
  queryOptions({
    queryKey: useProjectMetricsQuery.getKey(variables),
    queryFn: useProjectMetricsQuery.fetcher(variables),
    select: (data) => ({
      createdAt: dayjs(data?.project?.createdAt).format("M/D/YYYY"),
      activeUsers: Number(
        data?.project?.posts.aggregates?.distinctCount?.userId ?? 0
      ),
      totalFeedback: data?.project?.posts.totalCount ?? 0,
      totalEngagement:
        (data?.upvotes?.totalCount ?? 0) + (data?.downvotes?.totalCount ?? 0),
    }),
  });

export default projectMetricsQueryOptions;
