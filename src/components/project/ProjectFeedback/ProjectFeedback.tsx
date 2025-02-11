"use client";

import { Button, Grid, Stack, VStack } from "@omnidev/sigil";
import { useMutationState } from "@tanstack/react-query";
import { HiOutlineFolder } from "react-icons/hi2";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { Link, SkeletonArray, Spinner } from "components/core";
import { CreateFeedback, FeedbackCard } from "components/feedback";
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
import { useParams } from "next/navigation";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Project feedback.
 */
const ProjectFeedback = ({ projectId }: Props) => {
  const { user } = useAuth();

  const params = useParams<{ organizationSlug: string; projectSlug: string }>();

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

  const pendingFeedback = useMutationState<Partial<FeedbackFragment>>({
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
                  <FeedbackCard
                    title={pendingFeedback[0].title!}
                    description={pendingFeedback[0].description!}
                    username={pendingFeedback[0].user?.username!}
                    status="Planned"
                    totalUpvotes={pendingFeedback[0].upvotes?.totalCount}
                    totalDownvotes={pendingFeedback[0].downvotes?.totalCount}
                    isPending
                    w="full"
                    minH={21}
                  >
                    <Link href="#" disabled>
                      <Button disabled>
                        {app.projectPage.projectFeedback.details.feedbackLink}
                      </Button>
                    </Link>
                  </FeedbackCard>
                )}

                {posts?.map((feedback) => (
                  <FeedbackCard
                    key={feedback?.rowId}
                    title={feedback?.title!}
                    description={feedback?.description!}
                    username={feedback?.user?.username!}
                    createdAt={feedback?.createdAt}
                    status="Planned"
                    // TODO: implement when status logic is handled in db
                    statusUpdatedAt={feedback?.updatedAt}
                    totalUpvotes={feedback?.upvotes?.totalCount}
                    totalDownvotes={feedback?.downvotes?.totalCount}
                    w="full"
                    minH={21}
                  >
                    <Link
                      href={`/organizations/${params.organizationSlug}/projects/${params.projectSlug}/${feedback?.rowId}`}
                    >
                      <Button>
                        {app.projectPage.projectFeedback.details.feedbackLink}
                      </Button>
                    </Link>
                  </FeedbackCard>
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
