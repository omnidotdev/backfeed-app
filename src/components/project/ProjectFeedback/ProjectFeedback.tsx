"use client";

import { Grid, Stack, VStack } from "@omnidev/sigil";
import { useIsMutating } from "@tanstack/react-query";
import { HiOutlineFolder } from "react-icons/hi2";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CreateFeedback, FeedbackDetails } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { useInfinitePostsQuery } from "generated/graphql";
import { app } from "lib/config";
import { CREATE_FEEDBACK_MUTATION_KEY } from "lib/constants";

interface Props {
  /** Project ID. */
  projectId: string;
}

/**
 * Project feedback.
 */
const ProjectFeedback = ({ projectId }: Props) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfinitePostsQuery(
      {
        pageSize: 5,
        projectId,
      },
      {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
          lastPage?.posts?.pageInfo?.hasNextPage
            ? { after: lastPage?.posts?.pageInfo?.endCursor }
            : undefined,
      }
    );

  const pendingFeedback = useIsMutating({
    mutationKey: CREATE_FEEDBACK_MUTATION_KEY,
  });

  const totalCount =
    (data?.pages?.[0]?.posts?.totalCount ?? 0) + pendingFeedback;
  const posts = data?.pages?.flatMap((page) =>
    page?.posts?.nodes?.map((post) => post)
  );

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
    // NB: `rootMargin` is passed to `IntersectionObserver`. We can use it to trigger 'onLoadMore' when the spinner comes *near* to being visible, instead of when it becomes fully visible within the root element.
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <SectionContainer
      ref={rootRef}
      title={app.projectPage.projectFeedback.title}
      icon={HiOutlineFolder}
    >
      <Stack>
        <CreateFeedback
          isLoading={isLoading}
          isError={isError}
          totalCount={totalCount}
        />

        {isError ? (
          <ErrorBoundary message="Error fetching feedback" h="sm" />
        ) : (
          <Grid gap={2} mt={4} maxH="sm" overflow="auto" p="1px">
            {isLoading ? (
              <SkeletonArray count={5} h={21} />
            ) : posts?.length ? (
              <VStack>
                {posts?.map((feedback) => (
                  <FeedbackDetails
                    key={feedback?.rowId}
                    feedbackId={feedback?.rowId!}
                    projectPage
                    w="full"
                    minH={21}
                  />
                ))}

                {hasNextPage && <Spinner ref={loaderRef} />}
              </VStack>
            ) : (
              <EmptyState
                message={app.projectPage.projectFeedback.emptyState.message}
                h="xs"
                w="full"
              />
            )}
          </Grid>
        )}
      </Stack>
    </SectionContainer>
  );
};

export default ProjectFeedback;
