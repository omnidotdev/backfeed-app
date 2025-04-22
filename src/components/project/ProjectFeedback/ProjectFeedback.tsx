"use client";

import { Button, Grid, Icon, Stack, VStack } from "@omnidev/sigil";
import { useMutationState } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder } from "react-icons/hi2";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CreateFeedback, FeedbackCard } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import {
  useCreateFeedbackMutation,
  useInfinitePostsQuery,
  useProjectStatusesQuery,
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
  const router = useRouter();

  const { user } = useAuth();

  const params = useParams<{ organizationSlug: string; projectSlug: string }>();

  const { data: defaultStatus } = useProjectStatusesQuery(
    {
      projectId,
      isDefault: true,
    },
    {
      enabled: !!projectId,
      select: (data) => data?.postStatuses?.nodes?.[0],
    },
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
      },
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
        status: defaultStatus!,
        project: {
          rowId: input.post.projectId,
          slug: "pending",
        },
        user: {
          username: user?.username,
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

  const posts =
    data?.pages?.flatMap((page) => page?.posts?.nodes?.map((post) => post)) ??
    [];

  const allPosts = [...pendingFeedback, ...posts];

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  return (
    <SectionContainer
      ref={rootRef}
      title={app.projectPage.projectFeedback.title}
      icon={HiOutlineFolder}
    >
      <Stack>
        <CreateFeedback />

        {isError ? (
          <ErrorBoundary message="Error fetching feedback" h="sm" />
        ) : (
          <Grid
            gap={2}
            mt={4}
            maxH="sm"
            overflow="auto"
            p="1px"
            scrollbar="hidden"
          >
            {isLoading ? (
              <SkeletonArray count={5} h={21} />
            ) : allPosts.length ? (
              <VStack>
                {allPosts.map((feedback) => {
                  const isPending = feedback?.rowId === "pending";

                  return (
                    <FeedbackCard
                      key={feedback?.rowId}
                      feedback={feedback!}
                      totalUpvotes={feedback?.upvotes?.totalCount}
                      totalDownvotes={feedback?.downvotes?.totalCount}
                      isPending={isPending}
                      w="full"
                      minH={21}
                      borderRadius="md"
                      bgColor="card-item"
                      cursor={isPending ? "not-allowed" : "pointer"}
                      role="group"
                      onClick={() =>
                        !isPending
                          ? router.push(
                              `/organizations/${params.organizationSlug}/projects/${params.projectSlug}/${feedback?.rowId}`,
                            )
                          : undefined
                      }
                    >
                      <Button
                        position="absolute"
                        top={1}
                        right={1}
                        p={2}
                        variant="icon"
                        color={{
                          base: "foreground.muted",
                          _groupHover: "brand.primary",
                        }}
                        bgColor="transparent"
                      >
                        <Icon src={FiArrowUpRight} w={5} h={5} />
                      </Button>
                    </FeedbackCard>
                  );
                })}

                {hasNextPage && <Spinner ref={loaderRef} my={4} />}
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
