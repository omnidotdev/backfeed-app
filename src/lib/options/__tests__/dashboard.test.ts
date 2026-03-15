import { afterEach, describe, expect, it, mock, spyOn } from "bun:test";

import * as graphqlFetchModule from "@/lib/graphql/graphqlFetch";
import { recentFeedbackOptions } from "../dashboard";

describe("recentFeedbackOptions", () => {
  let graphqlFetchSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    graphqlFetchSpy?.mockRestore();
  });

  it("passes initial variables without pageParam on first page", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const variables = { organizationIds: ["org-1"] };
    const options = recentFeedbackOptions(variables);

    options.queryFn!({ pageParam: undefined } as any);

    expect(graphqlFetchModule.graphqlFetch).toHaveBeenCalledWith(
      expect.any(String),
      variables,
    );
  });

  it("merges pageParam cursor into variables on subsequent pages", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const variables = { organizationIds: ["org-1"] };
    const options = recentFeedbackOptions(variables);

    options.queryFn!({ pageParam: { after: "cursor_abc" } } as any);

    expect(graphqlFetchModule.graphqlFetch).toHaveBeenCalledWith(
      expect.any(String),
      {
        organizationIds: ["org-1"],
        after: "cursor_abc",
      },
    );
  });

  it("returns next cursor when hasNextPage is true", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const options = recentFeedbackOptions({ organizationIds: ["org-1"] });

    const nextParam = options.getNextPageParam!(
      {
        posts: {
          pageInfo: { hasNextPage: true, endCursor: "cursor_xyz" },
        },
      } as any,
      [] as any,
      undefined as any,
      undefined as any,
    );

    expect(nextParam).toEqual({ after: "cursor_xyz" });
  });

  it("returns undefined when hasNextPage is false", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const options = recentFeedbackOptions({ organizationIds: ["org-1"] });

    const nextParam = options.getNextPageParam!(
      {
        posts: {
          pageInfo: { hasNextPage: false, endCursor: "cursor_xyz" },
        },
      } as any,
      [] as any,
      undefined as any,
      undefined as any,
    );

    expect(nextParam).toBeUndefined();
  });
});
