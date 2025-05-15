import { queryOptions } from "@tanstack/react-query";

import { useProjectQuery } from "generated/graphql";

import type { ProjectQueryVariables } from "generated/graphql";

interface Options extends ProjectQueryVariables {
  /* Authenticated user ID. */
  userId: ProjectQueryVariables["userId"];
}

const projectOptions = (options: Options) =>
  queryOptions({
    queryKey: useProjectQuery.getKey(options),
    queryFn: useProjectQuery.fetcher(options),
  });

export default projectOptions;
