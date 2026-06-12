import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import useInfiniteScroll from "react-infinite-scroll-hook";

import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import FeedbackSection from "@/components/dashboard/FeedbackSection";
import Response from "@/components/dashboard/Response";
import EmptyState from "@/components/layout/EmptyState";
import { recentFeedbackOptions } from "@/lib/options/dashboard";
import { buildFeedbackKey } from "@/lib/util/feedbackUrl";
import cn from "@/lib/utils";

import type { Post } from "@/generated/graphql";

const dashboardRoute = getRouteApi("/_app/dashboard");

interface Props {
  /** Minimum height (Panda spacing unit). */
  minH?: number;
}

/**
 * Recent Feedback section.
 * Shows recent feedback items across all user's organizations.
 */
const RecentFeedback = ({ minH }: Props) => {
  const { session } = dashboardRoute.useRouteContext();

  // Get org IDs from session for filtering
  const organizationIds = session?.organizations?.map((org) => org.id) ?? [];

  const {
    data: feedbackData,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...recentFeedbackOptions({
      organizationIds,
    }),
    select: (data) =>
      data?.pages?.flatMap((page) =>
        page?.posts?.edges?.map((edge) => edge?.node),
      ),
    enabled: organizationIds.length > 0,
  });

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  return (
    <FeedbackSection
      ref={rootRef}
      title="Recent Feedback"
      style={minH ? { minHeight: `${minH * 0.25}rem` } : undefined}
      contentClassName="[scrollbar-width:none]"
    >
      {isError ? (
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-foreground-subtle text-sm">
            Unable to load feedback
          </p>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col">
          {isLoading ? (
            <div className="flex flex-col gap-3 p-4">
              <SkeletonArray count={5} className="h-16 w-full rounded-lg" />
            </div>
          ) : feedbackData?.length ? (
            <div className="flex flex-col items-center">
              {feedbackData?.map((feedback, index) => {
                const isLast =
                  index === feedbackData.length - 1 && !hasNextPage;
                return (
                  <Link
                    key={feedback?.rowId}
                    to="/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId"
                    params={{
                      workspaceSlug:
                        session?.organizations?.find(
                          (org) => org.id === feedback?.project?.organizationId,
                        )?.slug ?? "",
                      projectSlug: feedback?.project?.slug!,
                      feedbackId: buildFeedbackKey({
                        number: feedback?.number!,
                        title: feedback?.title,
                      }),
                    }}
                    style={{ width: "100%" }}
                  >
                    <Response
                      feedback={feedback as Partial<Post>}
                      className={cn(
                        "border-border-subtle px-5 py-3 transition-colors hover:bg-background-subtle",
                        isLast ? "" : "border-b",
                      )}
                    />
                  </Link>
                );
              })}

              {hasNextPage && (
                <div ref={loaderRef} className="my-4 flex justify-center">
                  {isFetchingNextPage && <Spinner />}
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              message="No feedback items yet"
              className="h-full min-h-40 w-full border-transparent"
            />
          )}
        </div>
      )}
    </FeedbackSection>
  );
};

export default RecentFeedback;
