"use client";

import {
  Circle,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  Stack,
  Text,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { LuCheck, LuChevronDown, LuMessageCircle } from "react-icons/lu";

import { DestructiveAction, StatusBadge } from "components/core";
import { UpdateFeedback, VotingButtons } from "components/feedback";
import {
  useDeletePostMutation,
  useFeedbackByIdQuery,
  useInfinitePostsQuery,
  useProjectMetricsQuery,
  useStatusBreakdownQuery,
  useUpdatePostMutation,
} from "generated/graphql";
import { useSearchParams } from "lib/hooks";
import { useStatusMenuStore } from "lib/hooks/store";

import type { HstackProps } from "@omnidev/sigil";
import type { InfiniteData } from "@tanstack/react-query";
import type {
  FeedbackByIdQuery,
  FeedbackFragment,
  PostOrderBy,
  PostStatus,
  PostsQuery,
} from "generated/graphql";
import type { Session } from "next-auth";

interface ProjectStatus {
  /** Post status row ID. */
  rowId: PostStatus["rowId"] | undefined;
  /** Post status. */
  status: PostStatus["status"] | undefined;
  /** Post status color. */
  color: PostStatus["color"];
}

interface Props extends HstackProps {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Whether the user has permission to manage statuses. */
  canManageStatus: boolean;
  /** Feedback details. */
  feedback: Partial<FeedbackFragment>;
  /** Whether the feedback is pending. */
  isPending?: boolean;
  /** Project status options. */
  projectStatuses?: ProjectStatus[];
}

/**
 * Feedback card.
 */
const FeedbackCard = ({
  user,
  canManageStatus,
  feedback,
  isPending = false,
  projectStatuses,
  ...rest
}: Props) => {
  const { isStatusMenuOpen, setIsStatusMenuOpen } = useStatusMenuStore(
    ({ isStatusMenuOpen, setIsStatusMenuOpen }) => ({
      isStatusMenuOpen,
      setIsStatusMenuOpen,
    }),
  );

  const router = useRouter();

  const {
    organizationSlug,
    projectSlug,
    // Renamed because we only need to check for the existence of this to determine if we are on the dynamic feedback route for the `deleteFeedback` mutation. This is to limit confusion with `feedback.rowId` from the provided props
    feedbackId: isFeedbackRoute,
  } = useParams<{
    organizationSlug: string;
    projectSlug: string;
    feedbackId?: string;
  }>();

  const [{ excludedStatuses, orderBy, search }] = useSearchParams();

  const queryClient = useQueryClient();

  const { mutate: deleteFeedback } = useDeletePostMutation({
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] }),
        queryClient.invalidateQueries({
          queryKey: useStatusBreakdownQuery.getKey({
            projectId: feedback.project?.rowId!,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: useProjectMetricsQuery.getKey({
            projectId: feedback.project?.rowId!,
          }),
        }),
      ]),
    onSuccess: () => {
      if (isFeedbackRoute) {
        router.replace(
          `/organizations/${organizationSlug}/projects/${projectSlug}`,
        );
      }
    },
  });

  const { mutate: updateStatus, isPending: isUpdateStatusPending } =
    useUpdatePostMutation({
      onMutate: (variables) => {
        const feedbackSnapshot = queryClient.getQueryData(
          useFeedbackByIdQuery.getKey({ rowId: feedback.rowId! }),
        ) as FeedbackByIdQuery;

        const postsQueryKey = useInfinitePostsQuery.getKey({
          projectId: feedback.project?.rowId!,
          excludedStatuses,
          orderBy: orderBy ? (orderBy as PostOrderBy) : undefined,
          search,
        });

        const postsSnapshot = queryClient.getQueryData(
          postsQueryKey,
        ) as InfiniteData<PostsQuery>;

        const updatedStatus = projectStatuses?.find(
          (status) => status.rowId === variables.patch.statusId,
        );

        if (feedbackSnapshot) {
          queryClient.setQueryData(
            useFeedbackByIdQuery.getKey({ rowId: feedback.rowId! }),
            {
              post: {
                ...feedbackSnapshot.post,
                statusId: variables.patch.statusId,
                statusUpdatedAt: variables.patch.statusUpdatedAt,
                status: {
                  ...feedbackSnapshot.post?.status,
                  status: updatedStatus?.status,
                  color: updatedStatus?.color,
                },
              },
            },
          );
        }

        if (postsSnapshot) {
          queryClient.setQueryData(postsQueryKey, {
            ...postsSnapshot,
            pages: postsSnapshot.pages.map((page) => ({
              ...page,
              posts: {
                ...page.posts,
                nodes: page.posts?.nodes?.map((post) => {
                  if (post?.rowId === variables.rowId) {
                    return {
                      ...post,
                      statusUpdatedAt: variables.patch.statusUpdatedAt,
                      status: {
                        ...post?.status,
                        rowId: variables.patch.statusId,
                        status: updatedStatus?.status,
                        color: updatedStatus?.color,
                      },
                    };
                  }

                  return post;
                }),
              },
            })),
          });
        }
      },
      onSettled: async () =>
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] }),

          queryClient.invalidateQueries({
            queryKey: useStatusBreakdownQuery.getKey({
              projectId: feedback.project?.rowId!,
            }),
          }),

          queryClient.invalidateQueries({
            queryKey: useFeedbackByIdQuery.getKey({ rowId: feedback.rowId! }),
          }),
        ]),
    });

  const userUpvote = feedback?.userUpvotes?.nodes[0],
    userDownvote = feedback?.userDownvotes?.nodes[0],
    totalUpvotes = feedback?.upvotes?.totalCount ?? 0,
    totalDownvotes = feedback?.downvotes?.totalCount ?? 0;

  const isAuthor = user?.rowId === feedback.user?.rowId;

  return (
    <HStack
      position="relative"
      gap={8}
      bgColor="background.default"
      borderRadius="lg"
      p={{ base: 4, sm: 6 }}
      opacity={isPending ? 0.5 : 1}
      {...rest}
      onClick={!isStatusMenuOpen ? rest.onClick : undefined}
    >
      <Stack w="full">
        <HStack justify="space-between">
          <Stack gap={1}>
            <Text
              fontWeight="semibold"
              fontSize="lg"
              lineHeight={1}
              // TODO: figure out container queries for this. The sizing feels off across different pages on both the projects page and feedback page
              maxW={{ base: "40svw", xl: "xl" }}
            >
              {feedback.title}
            </Text>

            <HStack fontSize="sm" gap={{ base: 1, sm: 2 }}>
              <Text color="foreground.subtle">{feedback.user?.username}</Text>

              <Circle size={1} bgColor="foreground.subtle" placeSelf="center" />

              <Text color="foreground.subtle">
                {dayjs(isPending ? new Date() : feedback.createdAt).fromNow()}
              </Text>
            </HStack>
          </Stack>

          <VotingButtons
            feedbackId={feedback.rowId!}
            projectId={feedback?.project?.rowId!}
            upvote={userUpvote}
            downvote={userDownvote}
            totalUpvotes={totalUpvotes}
            totalDownvotes={totalDownvotes}
          />
        </HStack>

        <Text wordBreak="break-word" color="foreground.muted">
          {feedback.description}
        </Text>

        <Stack justify="space-between" gap={4} mt={2}>
          <HStack justify="space-between">
            <HStack>
              <Menu
                onOpenChange={({ open }) =>
                  open ? setIsStatusMenuOpen(true) : undefined
                }
                onExitComplete={() => setIsStatusMenuOpen(false)}
                trigger={
                  <StatusBadge
                    status={feedback.status!}
                    cursor={canManageStatus ? "pointer" : "default"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {canManageStatus && <Icon src={LuChevronDown} />}
                  </StatusBadge>
                }
                triggerProps={{
                  disabled: !canManageStatus || isUpdateStatusPending,
                }}
                positioning={{ strategy: "fixed" }}
              >
                <MenuItemGroup>
                  {projectStatuses?.map((status) => (
                    <MenuItem
                      key={status.rowId}
                      value={status.rowId!}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      // NB: Needs to be analyzed at runtime.
                      // TODO: Implement check to validate that the status color is a valid color
                      style={status.color ? { color: status.color } : undefined}
                      onClick={() =>
                        updateStatus({
                          rowId: feedback.rowId!,
                          patch: {
                            statusId: status.rowId!,
                            statusUpdatedAt: new Date(),
                          },
                        })
                      }
                    >
                      {status.status}

                      {status.rowId === feedback.status?.rowId && (
                        <Icon src={LuCheck} h={4} w={4} color="green.500" />
                      )}
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </Menu>

              <Text
                display={{ base: "none", sm: "inline-flex" }}
                fontSize="sm"
                color="foreground.subtle"
              >
                {`Updated ${dayjs(isPending ? new Date() : feedback.statusUpdatedAt).fromNow()}`}
              </Text>
            </HStack>

            <HStack>
              {isAuthor && (
                <HStack>
                  <UpdateFeedback feedback={feedback} />

                  <DestructiveAction
                    title="Delete Feedback"
                    description="Are you sure you want to delete this feedback?"
                    action={{
                      label: "Delete",
                      onClick: () =>
                        deleteFeedback({ postId: feedback.rowId! }),
                    }}
                    triggerProps={{
                      "aria-label": "Delete Feedback",
                      color: "omni.ruby",
                      backgroundColor: "transparent",
                      disabled: feedback.rowId === "pending",
                      onClick: (e) => e.stopPropagation(),
                    }}
                  />
                </HStack>
              )}

              <HStack color="foreground.subtle" gap={1}>
                <Icon src={LuMessageCircle} h={4.5} w={4.5} />
                {feedback.comments?.totalCount}
              </HStack>
            </HStack>
          </HStack>
        </Stack>
      </Stack>
    </HStack>
  );
};
export default FeedbackCard;
