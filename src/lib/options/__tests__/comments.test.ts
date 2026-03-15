import { afterEach, describe, expect, it, mock, spyOn } from "bun:test";

import * as graphqlFetchModule from "@/lib/graphql/graphqlFetch";
import { infiniteCommentsOptions, infiniteRepliesOptions } from "../comments";

describe("infiniteCommentsOptions", () => {
  let graphqlFetchSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    graphqlFetchSpy?.mockRestore();
  });

  it("passes initial variables without pageParam on first page", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const variables = { feedbackId: "fb-1" };
    const options = infiniteCommentsOptions(variables);

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

    const variables = { feedbackId: "fb-1" };
    const options = infiniteCommentsOptions(variables);

    // biome-ignore lint/style/noNonNullAssertion: test helper
    options.queryFn!({ pageParam: { after: "cursor_abc" } } as any);

    expect(graphqlFetchModule.graphqlFetch).toHaveBeenCalledWith(
      expect.any(String),
      {
        feedbackId: "fb-1",
        after: "cursor_abc",
      },
    );
  });

  it("returns next cursor when hasNextPage is true", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const options = infiniteCommentsOptions({ feedbackId: "fb-1" });

    const nextParam = options.getNextPageParam!(
      {
        comments: {
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

    const options = infiniteCommentsOptions({ feedbackId: "fb-1" });

    const nextParam = options.getNextPageParam!(
      {
        comments: {
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

describe("infiniteRepliesOptions", () => {
  let graphqlFetchSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    graphqlFetchSpy?.mockRestore();
  });

  it("passes initial variables without pageParam on first page", () => {
    const mockThunk = mock(() => Promise.resolve({}));
    graphqlFetchSpy = spyOn(graphqlFetchModule, "graphqlFetch").mockReturnValue(
      mockThunk,
    );

    const variables = { commentId: "comment-1" };
    const options = infiniteRepliesOptions(variables);

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

    const variables = { commentId: "comment-1" };
    const options = infiniteRepliesOptions(variables);

    // biome-ignore lint/style/noNonNullAssertion: test helper
    options.queryFn!({ pageParam: { after: "cursor_def" } } as any);

    expect(graphqlFetchModule.graphqlFetch).toHaveBeenCalledWith(
      expect.any(String),
      {
        commentId: "comment-1",
        after: "cursor_def",
      },
    );
  });
});
