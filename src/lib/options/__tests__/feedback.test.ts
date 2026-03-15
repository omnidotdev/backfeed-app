import { afterEach, describe, expect, it, mock, spyOn } from "bun:test";

import * as graphqlFetchModule from "@/lib/graphql/graphqlFetch";
import { infiniteFeedbackOptions } from "../feedback";

describe("infiniteFeedbackOptions", () => {
  let graphqlFetchSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    graphqlFetchSpy?.mockRestore();
  });

  it("passes initial variables without pageParam on first page", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const variables = { projectId: "proj-1" };
    const options = infiniteFeedbackOptions(variables);

    // biome-ignore lint/style/noNonNullAssertion: test helper
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

    const variables = { projectId: "proj-1" };
    const options = infiniteFeedbackOptions(variables);

    // biome-ignore lint/style/noNonNullAssertion: test helper
    options.queryFn!({ pageParam: { after: "cursor_abc" } } as any);

    expect(graphqlFetchModule.graphqlFetch).toHaveBeenCalledWith(
      expect.any(String),
      {
        projectId: "proj-1",
        after: "cursor_abc",
      },
    );
  });

  it("invokes the fetcher thunk to get the promise", () => {
    const mockThunk = mock(() => Promise.resolve({ data: "test" }));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const options = infiniteFeedbackOptions({ projectId: "proj-1" });
    // biome-ignore lint/style/noNonNullAssertion: test helper
    const result = options.queryFn!({ pageParam: undefined } as any);

    expect(mockThunk).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Promise);
  });

  it("returns next cursor when hasNextPage is true", () => {
    const options = infiniteFeedbackOptions({ projectId: "proj-1" });

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
    const options = infiniteFeedbackOptions({ projectId: "proj-1" });

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
