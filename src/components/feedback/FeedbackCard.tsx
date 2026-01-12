import { Format } from "@ark-ui/react";
import {
  Circle,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  Stack,
  Text,
  css,
  sigil,
} from "@omnidev/sigil";
import {
  useNavigate,
  useParams,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import { LuCheck, LuChevronDown, LuMessageCircle } from "react-icons/lu";

import DestructiveAction from "@/components/core/DestructiveAction";
import StatusBadge from "@/components/core/StatusBadge";
import UpdateFeedback from "@/components/feedback/UpdateFeedback";
import VotingButtons from "@/components/feedback/VotingButtons";
import {
  VoteType,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import {
  feedbackByIdOptions,
  infiniteFeedbackOptions,
} from "@/lib/options/feedback";
import {
  projectMetricsOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";
import useStatusMenuStore from "@/lib/store/useStatusMenuStore";

import type { HstackProps, TextProps } from "@omnidev/sigil";
import type { InfiniteData } from "@tanstack/react-query";
import type {
  FeedbackByIdQuery,
  FeedbackFragment,
  PostOrderBy,
  PostsQuery,
  StatusTemplate,
} from "@/generated/graphql";

interface ProjectStatus {
  /** Status template row ID. */
  rowId: StatusTemplate["rowId"] | undefined;
  /** Status template name. */
  name: StatusTemplate["name"] | undefined;
  /** Status template display name. */
  displayName: StatusTemplate["displayName"] | undefined;
  /** Status template color. */
  color: StatusTemplate["color"];
}

interface Props extends HstackProps {
  /** Whether the user has permission to manage statuses or delete feedback. */
  canManageFeedback: boolean;
  /** Feedback details. */
  feedback: Partial<FeedbackFragment>;
  /** Project status options. */
  projectStatuses?: ProjectStatus[];
  /** Title props. */
  titleProps?: TextProps;
  /** Description props. */
  descriptionProps?: TextProps;
  /** Whether the user is authenticated. */
  isAuthenticated?: boolean;
}

/**
 * Feedback card.
 */
const FeedbackCard = ({
  canManageFeedback,
  feedback,
  projectStatuses,
  titleProps,
  descriptionProps,
  isAuthenticated: isAuthenticatedProp,
  ...rest
}: Props) => {
  const { session, queryClient } = useRouteContext({
    from: "__root__",
  });

  // Use prop if provided, otherwise derive from session
  const isAuthenticated = isAuthenticatedProp ?? !!session?.user?.rowId;
  const {
    workspaceSlug,
    projectSlug,
    feedbackId: isFeedbackRoute,
  } = useParams({ strict: false });
  const { excludedStatuses, search, orderBy } = useSearch({ strict: false });
  const navigate = useNavigate();

  const { isStatusMenuOpen, setIsStatusMenuOpen } = useStatusMenuStore(
    ({ isStatusMenuOpen, setIsStatusMenuOpen }) => ({
      isStatusMenuOpen,
      setIsStatusMenuOpen,
    }),
  );

  const { mutate: deleteFeedback, isPending: isDeleteFeedbackPending } =
    useDeletePostMutation({
      onSettled: () =>
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] }),
          queryClient.invalidateQueries({
            queryKey: statusBreakdownOptions({
              projectId: feedback?.project?.rowId!,
            }).queryKey,
          }),
          queryClient.invalidateQueries({
            queryKey: projectMetricsOptions({
              projectId: feedback?.project?.rowId!,
            }).queryKey,
          }),
        ]),
      onSuccess: () => {
        if (isFeedbackRoute) {
          navigate({
            to: "/workspaces/$workspaceSlug/projects/$projectSlug",
            params: {
              workspaceSlug: workspaceSlug!,
              projectSlug: projectSlug!,
            },
          });
        }
      },
    });

  const { mutate: updateStatus, isPending: isUpdateStatusPending } =
    useUpdatePostMutation({
      onMutate: (variables) => {
        const feedbackSnapshot = queryClient?.getQueryData(
          feedbackByIdOptions({
            rowId: feedback.rowId!,
            userId: session?.user?.rowId,
          }).queryKey,
        ) as FeedbackByIdQuery;

        const postsQueryKey = infiniteFeedbackOptions({
          projectId: feedback.project?.rowId!,
          excludedStatuses,
          orderBy: orderBy ? (orderBy as PostOrderBy) : undefined,
          search,
          userId: session?.user?.rowId,
        }).queryKey;

        const postsSnapshot = queryClient?.getQueryData(
          postsQueryKey,
        ) as InfiniteData<PostsQuery>;

        const updatedStatus = projectStatuses?.find(
          (status) => status.rowId === variables.patch.statusTemplateId,
        );

        if (feedbackSnapshot) {
          queryClient.setQueryData(
            feedbackByIdOptions({
              rowId: feedback.rowId!,
              userId: session?.user?.rowId,
            }).queryKey,
            {
              post: {
                ...feedbackSnapshot.post!,
                statusUpdatedAt:
                  variables.patch.statusUpdatedAt ??
                  feedbackSnapshot.post!.statusUpdatedAt,
                statusTemplate: {
                  ...feedbackSnapshot.post?.statusTemplate!,
                  rowId:
                    updatedStatus?.rowId ??
                    feedbackSnapshot.post?.statusTemplate?.rowId!,
                  name:
                    updatedStatus?.name ??
                    feedbackSnapshot.post?.statusTemplate?.name!,
                  displayName: updatedStatus?.displayName!,
                  color: updatedStatus?.color,
                },
              },
            },
          );
        }

        if (postsSnapshot) {
          queryClient.setQueryData(postsQueryKey, {
            ...postsSnapshot,
            // @ts-expect-error TODO: strongly type
            pages: postsSnapshot.pages.map((page) => ({
              ...page,
              posts: {
                ...page.posts,
                nodes: page.posts?.nodes?.map((post) => {
                  if (post?.rowId === variables.rowId) {
                    return {
                      ...post,
                      statusUpdatedAt: variables.patch.statusUpdatedAt,
                      statusTemplate: {
                        ...post?.statusTemplate,
                        rowId: updatedStatus?.rowId,
                        name: updatedStatus?.name,
                        displayName: updatedStatus?.displayName,
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
            queryKey: statusBreakdownOptions({
              projectId: feedback.project?.rowId!,
            }).queryKey,
          }),

          queryClient.invalidateQueries({
            queryKey: feedbackByIdOptions({
              rowId: feedback.rowId!,
              userId: session?.user?.rowId,
            }).queryKey,
          }),
        ]),
    });

  // get user's vote from the unified votes
  const userUpvoteNode = session ? feedback?.userUpvotes?.nodes[0] : null;
  const userDownvoteNode = session ? feedback?.userDownvotes?.nodes[0] : null;
  const userVote = userUpvoteNode
    ? { rowId: userUpvoteNode.rowId, voteType: VoteType.Up }
    : userDownvoteNode
      ? { rowId: userDownvoteNode.rowId, voteType: VoteType.Down }
      : null;

  const totalUpvotes = feedback?.upvotes?.totalCount ?? 0;
  const totalDownvotes = feedback?.downvotes?.totalCount ?? 0;

  const isAuthor = session?.user?.rowId === feedback.user?.rowId;

  const canAdjustFeedback = isAuthor || canManageFeedback;

  const isFeedbackPending = feedback.rowId === "pending";

  const actionIsPending = isFeedbackPending || isDeleteFeedbackPending;

  return (
    <HStack
      position="relative"
      bgColor={{ base: "white", _dark: "neutral.900/80" }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
      p={4}
      opacity={actionIsPending ? 0.5 : 1}
      className={css({
        transition: "all 0.2s ease",
        _hover: {
          bgColor: { base: "neutral.50", _dark: "neutral.800/50" },
          borderColor: { base: "neutral.300", _dark: "neutral.700" },
        },
      })}
      {...rest}
      onClick={!isStatusMenuOpen ? rest.onClick : undefined}
    >
      {/* Voting buttons on the left */}
      <VotingButtons
        feedbackId={feedback.rowId!}
        projectId={feedback?.project?.rowId!}
        userVote={userVote}
        totalUpvotes={totalUpvotes}
        totalDownvotes={totalDownvotes}
        isFeedbackRoute={!!isFeedbackRoute}
        isAuthenticated={isAuthenticated}
      />

      {/* Content on the right */}
      <Stack h="full" w="full" gap={1} flex={1}>
        <HStack justify="space-between" alignItems="flex-start">
          <Stack gap={0.5}>
            <Text
              wordBreak="break-word"
              fontWeight="semibold"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight={1.3}
              {...titleProps}
            >
              {feedback.title}
            </Text>

            <HStack fontSize="xs" gap={1.5} color="foreground.subtle">
              <Text>{feedback.user?.username}</Text>
              <Circle size={1} bgColor="foreground.subtle" />
              <Text>
                {dayjs(
                  isFeedbackPending ? new Date() : feedback.createdAt,
                ).fromNow()}
              </Text>
            </HStack>
          </Stack>
        </HStack>

        <Text
          wordBreak="break-word"
          color="foreground.muted"
          fontSize="sm"
          lineHeight={1.5}
          {...descriptionProps}
        >
          {feedback.description?.split("\n").map((line, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the rendering
            <sigil.span key={index}>
              {line}
              <br />
            </sigil.span>
          ))}
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
                    status={feedback.statusTemplate!}
                    cursor={canManageFeedback ? "pointer" : "default"}
                    onClick={(evt) => evt.stopPropagation()}
                  >
                    {canManageFeedback && <Icon src={LuChevronDown} />}
                  </StatusBadge>
                }
                triggerProps={{
                  disabled:
                    !canManageFeedback ||
                    actionIsPending ||
                    isUpdateStatusPending,
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
                            statusTemplateId: status.rowId!,
                            statusUpdatedAt: new Date(),
                          },
                        })
                      }
                    >
                      {status.displayName}

                      {status.rowId === feedback.statusTemplate?.rowId && (
                        <Icon src={LuCheck} h={4} w={4} color="green.500" />
                      )}
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </Menu>

              {isFeedbackRoute && (
                <Text
                  display={{ base: "none", sm: "inline-flex" }}
                  fontSize="sm"
                  color="foreground.subtle"
                >
                  {`Updated ${dayjs(isUpdateStatusPending ? new Date() : feedback.statusUpdatedAt).fromNow()}`}
                </Text>
              )}
            </HStack>

            <HStack mb={-2}>
              {canAdjustFeedback && (
                <HStack>
                  <UpdateFeedback
                    feedback={feedback}
                    triggerProps={{
                      disabled: actionIsPending,
                      onClick: (evt) => evt.stopPropagation(),
                    }}
                  />

                  <DestructiveAction
                    title={app.projectPage.projectFeedback.deleteFeedback.title}
                    description={
                      app.projectPage.projectFeedback.deleteFeedback.description
                    }
                    action={{
                      label:
                        app.projectPage.projectFeedback.deleteFeedback.action
                          .label,
                      onClick: () =>
                        deleteFeedback({ postId: feedback.rowId! }),
                    }}
                    triggerProps={{
                      "aria-label":
                        app.projectPage.projectFeedback.deleteFeedback.title,
                      px: 2,
                      color: "omni.ruby",
                      backgroundColor: "transparent",
                      disabled: actionIsPending,
                      onClick: (evt) => evt.stopPropagation(),
                    }}
                  />
                </HStack>
              )}

              <HStack color="foreground.subtle" gap={1} ml={2} py={2}>
                <Icon src={LuMessageCircle} h={4.5} w={4.5} />

                <Format.Number
                  value={feedback.comments?.totalCount ?? 0}
                  notation="compact"
                />
              </HStack>
            </HStack>
          </HStack>
        </Stack>
      </Stack>
    </HStack>
  );
};
export default FeedbackCard;
