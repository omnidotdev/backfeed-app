import { afterEach, describe, expect, it, mock, spyOn } from "bun:test";

import * as generatedModule from "@/generated/graphql";
import * as graphqlFetchModule from "@/lib/graphql/graphqlFetch";
import * as entitlementsModule from "@/server/functions/entitlements";
import { freeTierFeedbackOptions, infiniteFeedbackOptions } from "../feedback";

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

describe("freeTierFeedbackOptions", () => {
  let spies: ReturnType<typeof spyOn>[] = [];

  afterEach(() => {
    for (const spy of spies) spy.mockRestore();
    spies = [];
  });

  /** Stub the project lookup with `uniqueUsers` distinct submitters, none of them the viewer */
  const stubProject = (uniqueUsers: number) => {
    spies.push(
      spyOn(generatedModule.useProjectQuery, "fetcher").mockReturnValue(() =>
        Promise.resolve({
          projects: {
            nodes: [
              {
                posts: {
                  aggregates: {
                    distinctCount: { userId: String(uniqueUsers) },
                  },
                },
                userPosts: { nodes: [] },
              },
            ],
          },
        } as any),
      ),
    );
  };

  const run = async () => {
    const options = freeTierFeedbackOptions({
      organizationId: "org-1",
      projectSlug: "proj",
    });
    const data = await (options.queryFn as any)({});
    return options.select!(data);
  };

  it("checks the catalog key max_feedback_users", async () => {
    stubProject(3);
    const checkLimitSpy = spyOn(
      entitlementsModule,
      "checkLimit",
    ).mockResolvedValue({ allowed: true, limit: -1, current: 3 } as any);
    spies.push(checkLimitSpy);

    await run();

    expect(entitlementsModule.FeatureKey.MaxFeedbackUsers).toBe(
      "max_feedback_users",
    );
    expect(checkLimitSpy).toHaveBeenCalledWith({
      data: {
        organizationId: "org-1",
        featureKey: "max_feedback_users",
        currentCount: 3,
      },
    });
  });

  it("keeps the form open past 15 unique users when the plan is unlimited", async () => {
    stubProject(16);
    spies.push(
      spyOn(entitlementsModule, "checkLimit").mockResolvedValue({
        allowed: true,
        limit: -1,
        current: 16,
      } as any),
    );

    expect(await run()).toBe(true);
  });

  it("keeps the form open past 15 unique users when entitlements are unreachable", async () => {
    stubProject(16);
    spies.push(
      spyOn(entitlementsModule, "checkLimit").mockRejectedValue(
        new Error("unreachable"),
      ),
    );

    expect(await run()).toBe(true);
  });
});
