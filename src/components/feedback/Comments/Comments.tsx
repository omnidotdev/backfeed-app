"use client";

import { Divider, Grid, Stack, Text, VStack } from "@omnidev/sigil";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LuMessageSquare } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { GradientMask, SkeletonArray, Spinner } from "components/core";
import { CommentCard, CreateComment } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import {
  useCreateCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { freeTierCommentsOptions } from "lib/options";

import type {
  CommentFragment,
  CreateCommentMutationVariables,
  Organization,
  Post,
} from "generated/graphql";
import type { Session } from "next-auth";

interface Props {
  /** Authenticated user. */
  user: Session["user"];
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Feedback ID. */
  feedbackId: Post["rowId"];
}

/**
 * Feedback comments section.
 */
const Comments = ({ user, organizationId, feedbackId }: Props) => {
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const { data: canCreateComment } = useQuery(
    freeTierCommentsOptions({ projectSlug, organizationSlug, feedbackId }),
  );

  const {
    data: comments,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteCommentsQuery(
    {
      feedbackId,
    },
    {
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.comments?.pageInfo?.hasNextPage
          ? { after: lastPage?.comments?.pageInfo?.endCursor }
          : undefined,
      select: (data) =>
        data?.pages?.flatMap((page) =>
          page?.comments?.edges?.map((edge) => edge?.node),
        ),
    },
  );

  const pendingComments = useMutationState<CommentFragment>({
    filters: {
      mutationKey: useCreateCommentMutation.getKey(),
      predicate: (mutation) =>
        !(mutation.state.variables as CreateCommentMutationVariables).input
          .comment.parentId,
      status: "pending",
    },
    select: (mutation) => {
      const { input } = mutation.state
        .variables as CreateCommentMutationVariables;

      return {
        rowId: "pending",
        message: input.comment.message,
        user: {
          rowId: user?.rowId!,
          username: user?.username,
        },
        childComments: {
          totalCount: 0,
        },
      };
    },
  });

  const allComments = [...pendingComments, ...(comments ?? [])];

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  return (
    <SectionContainer
      ref={rootRef}
      title={app.feedbackPage.comments.title}
      description={app.feedbackPage.comments.description}
      icon={LuMessageSquare}
      p={0}
      pr={{ base: 4, sm: 6 }}
      pl={{ base: 4, sm: 6 }}
      pt={{ base: 4, sm: 6 }}
    >
      {/* NB: the margin is necessary to prevent clipping of the card borders/box shadows */}
      <Stack position="relative" mb="1px">
        <CreateComment
          user={user}
          canCreateComment={canCreateComment ?? false}
        />

        <Divider mt={4} />

        {isError ? (
          <ErrorBoundary message="Error fetching comments" h="xs" my={4} />
        ) : (
          <Grid gap={2} mt={4} maxH="xl" overflow="auto" scrollbar="hidden">
            {isLoading ? (
              <SkeletonArray count={5} h={28} />
            ) : allComments?.length ? (
              <VStack gap={2}>
                {allComments?.map((comment) => (
                  <CommentCard
                    key={comment?.rowId}
                    user={user}
                    comment={comment!}
                    organizationId={organizationId}
                    canReply={canCreateComment ?? false}
                    w="full"
                    minH={21}
                  />
                ))}

                {hasNextPage ? (
                  <Spinner ref={loaderRef} my={4} />
                ) : (
                  <Text my={5}>{app.feedbackPage.comments.endOf}</Text>
                )}
              </VStack>
            ) : (
              <EmptyState
                message={app.feedbackPage.comments.emptyState.message}
                h="xs"
                w="full"
                mb={4}
              />
            )}
          </Grid>
        )}

        {!!allComments.length && <GradientMask bottom={0} />}
      </Stack>
    </SectionContainer>
  );
};

export default Comments;
