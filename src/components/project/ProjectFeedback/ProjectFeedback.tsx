"use client";

import { Grid, Stack, VStack } from "@omnidev/sigil";
import { useMutationState } from "@tanstack/react-query";
import { HiOutlineFolder } from "react-icons/hi2";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CreateFeedback, FeedbackDetails } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import {
  useCreateFeedbackMutation,
  useInfinitePostsQuery,
  useUserQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type {
  CreateFeedbackMutationVariables,
  FeedbackFragment,
  Project,
} from "generated/graphql";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Project feedback.
 */
const ProjectFeedback = ({ projectId }: Props) => {
  const { user } = useAuth();

  const { data: username } = useUserQuery(
    {
      hidraId: user?.hidraId!,
    },
    {
      enabled: !!user?.hidraId,
      select: (data) => data?.userByHidraId?.username,
    }
  );

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

  const pendingFeedback = useMutationState<FeedbackFragment>({
    filters: {
      mutationKey: useCreateFeedbackMutation.getKey(),
      status: "pending",
    },
    select: (mutation) => {
      const { input } = mutation.state
        .variables as CreateFeedbackMutationVariables;

      return {
        rowId: "pending",
        title: input.post.title,
        description: input.post.description,
        project: {
          rowId: input.post.projectId,
        },
        user: {
          username,
        },
        upvotes: {
          totalCount: 0,
        },
        downvotes: {
          totalCount: 0,
        },
      };
    },
  });

  const totalCount =
    (data?.pages?.[0]?.posts?.totalCount ?? 0) + pendingFeedback.length;
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
            ) : posts?.length || pendingFeedback.length ? (
              <VStack>
                {!!pendingFeedback.length && (
                  <FeedbackDetails
                    feedback={pendingFeedback[0]}
                    projectPage
                    isPending
                    w="full"
                    minH={21}
                  />
                )}

                {/* TODO: separate concerns for this component. Every render of the list throws many network requests due to the nature of `FeedbackDetails` needing to fetch details such as upvotes and downvotes. */}
                {posts?.map((feedback) => (
                  <FeedbackDetails
                    key={feedback?.rowId}
                    feedback={feedback!}
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
