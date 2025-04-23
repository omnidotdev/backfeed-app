import { queryOptions } from "@tanstack/react-query";

import { useStatusBreakdownQuery } from "generated/graphql";

import type { StatusBreakdownQueryVariables } from "generated/graphql";

const statusBreakdownOptions = (variables: StatusBreakdownQueryVariables) =>
  queryOptions({
    queryKey: useStatusBreakdownQuery.getKey(variables),
    queryFn: useStatusBreakdownQuery.fetcher(variables),
  });

export default statusBreakdownOptions;
