"use client";

import {
  Badge,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  Tooltip,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";
import { match } from "ts-pattern";

import { Link } from "components/core";
import {
  useCreateDownvoteMutation,
  useCreateUpvoteMutation,
  useDeleteDownvoteMutation,
  useDeleteUpvoteMutation,
  useDownvoteQuery,
  useFeedbackByIdQuery,
  useInfinitePostsQuery,
  useUpvoteQuery,
} from "generated/graphql";
import { app } from "lib/config";
import {
  CREATE_DOWNVOTE_MUTATION_KEY,
  CREATE_UPVOTE_MUTATION_KEY,
  DELETE_DOWNVOTE_MUTATION_KEY,
  DELETE_UPVOTE_MUTATION_KEY,
} from "lib/constants";
import { useAuth } from "lib/hooks";

import type { FeedbackFragment } from "generated/graphql";

import type {
  HstackProps,
  TooltipTriggerProps,
  VstackProps,
} from "@omnidev/sigil";
import type { InvalidateOptions } from "@tanstack/react-query";
import type { IconType } from "react-icons";

interface VoteButtonProps extends TooltipTriggerProps {
  /** Number of votes (upvotes or downvotes). */
  votes: number | undefined;
  /** Tooltip text. */
  tooltip: string;
  /** Visual icon. */
  icon: IconType;
  /** Props to pass to the main content container. */
  contentProps?: VstackProps;
}

interface Props extends HstackProps {
  /** Feedback ID. Used to fetch feedback details when viewing the dynamic feedback page. */
  feedbackId?: string;
  /** Feedback details. Used to display feedback details when viewing the project page. */
  feedback?: Partial<FeedbackFragment>;
  /** Whether we are viewing the project page. */
  projectPage?: boolean;
}

/**
 * Feedback details section.
 */
const FeedbackDetails = ({
  feedbackId,
  feedback: projectFeedback,
  projectPage = false,
  ...rest
}: Props) => {
  const { data: pageFeedback } = useFeedbackByIdQuery(
    {
      rowId: feedbackId!,
    },
    {
      enabled: !projectPage && !!feedbackId,
      select: (data) => data?.post,
    }
  );

  const feedback = projectPage ? projectFeedback : pageFeedback;

  const isPending = feedback?.rowId === "pending";

  const params = useParams<{ organizationSlug: string; projectSlug: string }>();

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: hasUpvoted } = useUpvoteQuery(
    {
      userId: user?.rowId!,
      feedbackId: feedback?.rowId!,
    },
    {
      enabled: !!user?.rowId && !isPending,
      select: (data) => data?.upvoteByPostIdAndUserId,
    }
  );

  const { data: hasDownvoted } = useDownvoteQuery(
    {
      userId: user?.rowId!,
      feedbackId: feedback?.rowId!,
    },
    {
      enabled: !!user?.rowId && !isPending,
      select: (data) => data?.downvoteByPostIdAndUserId,
    }
  );

  const onSuccess = () => {
    // NB: Since our global callback has already invalidated everything, we just use `invalidateQueries` to "pick up" the already in flight Promises and return them. See: https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations#to-await-or-not-to-await
    const invalidationOptions: InvalidateOptions = {
      cancelRefetch: false,
    };

    return Promise.all([
      queryClient.invalidateQueries(
        {
          queryKey: useUpvoteQuery.getKey({
            feedbackId: feedback?.rowId!,
            userId: user?.rowId!,
          }),
        },
        invalidationOptions
      ),
      queryClient.invalidateQueries(
        {
          queryKey: useDownvoteQuery.getKey({
            feedbackId: feedback?.rowId!,
            userId: user?.rowId!,
          }),
        },
        invalidationOptions
      ),
      queryClient.invalidateQueries(
        {
          queryKey: useInfinitePostsQuery.getKey({
            pageSize: 5,
            projectId: feedback?.project?.rowId!,
          }),
        },
        invalidationOptions
      ),
      queryClient.invalidateQueries(
        {
          queryKey: useFeedbackByIdQuery.getKey({ rowId: feedback?.rowId! }),
        },
        invalidationOptions
      ),
    ]);
  };

  const { mutate: upvote, isPending: isUpvotePending } =
    useCreateUpvoteMutation({
      mutationKey: CREATE_UPVOTE_MUTATION_KEY,
      onSuccess,
    });
  const { mutate: downvote, isPending: isDownvotePending } =
    useCreateDownvoteMutation({
      mutationKey: CREATE_DOWNVOTE_MUTATION_KEY,
      onSuccess,
    });
  const { mutate: deleteUpvote, isPending: isDeleteUpvotePending } =
    useDeleteUpvoteMutation({
      mutationKey: DELETE_UPVOTE_MUTATION_KEY,
      onSuccess,
    });
  const { mutate: deleteDownvote, isPending: isDeleteDownvotePending } =
    useDeleteDownvoteMutation({
      mutationKey: DELETE_DOWNVOTE_MUTATION_KEY,
      onSuccess,
    });

  const totalUpvotes =
    (feedback?.upvotes?.totalCount ?? 0) +
    (isUpvotePending ? 1 : isDeleteUpvotePending ? -1 : 0);

  const totalDownvotes =
    (feedback?.downvotes?.totalCount ?? 0) +
    (isDownvotePending ? 1 : isDeleteDownvotePending ? -1 : 0);

  const netTotalVotes = totalUpvotes - totalDownvotes;

  const netVotesColor = match(netTotalVotes)
    .with(0, () => "gray.400")
    .when(
      (net) => net > 0,
      () => "brand.tertiary"
    )
    .otherwise(() => "brand.quinary");

  const netVotesSign = match(netTotalVotes)
    .with(0, () => "+/- ")
    .when(
      (net) => net > 0,
      () => "+"
    )
    .otherwise(() => "");

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: totalUpvotes,
      tooltip: app.feedbackPage.details.upvote,
      icon:
        hasUpvoted || isUpvotePending ? PiArrowFatLineUpFill : PiArrowFatLineUp,
      color: "brand.tertiary",
      disabled: isPending,
      onClick: () => {
        if (hasDownvoted) {
          deleteDownvote({
            id: hasDownvoted.id,
          });
        }

        if (hasUpvoted) {
          deleteUpvote({
            id: hasUpvoted.id,
          });
        } else {
          upvote({
            input: {
              upvote: {
                postId: feedback?.rowId!,
                userId: user?.rowId!,
              },
            },
          });
        }
      },
    },
    {
      id: "downvote",
      votes: totalDownvotes,
      tooltip: app.feedbackPage.details.downvote,
      icon:
        hasDownvoted || isDownvotePending
          ? PiArrowFatLineDownFill
          : PiArrowFatLineDown,
      color: "brand.quinary",
      disabled: isPending,
      onClick: () => {
        if (hasUpvoted) {
          deleteUpvote({
            id: hasUpvoted.id,
          });
        }

        if (hasDownvoted) {
          deleteDownvote({
            id: hasDownvoted.id,
          });
        } else {
          downvote({
            input: {
              downvote: {
                postId: feedback?.rowId!,
                userId: user?.rowId!,
              },
            },
          });
        }
      },
    },
  ];

  return (
    <HStack
      position="relative"
      gap={8}
      bgColor="background.default"
      borderRadius="lg"
      boxShadow="lg"
      p={{ base: 4, sm: 6 }}
      opacity={isPending ? 0.5 : 1}
      {...rest}
    >
      <Stack w="full">
        <HStack justify="space-between">
          <Stack direction={{ base: "column", sm: "row" }} gap={4}>
            <Text fontWeight="semibold" fontSize="2xl">
              {feedback?.title}
            </Text>

            <HStack>
              <Badge
                variant="outline"
                color="brand.secondary"
                borderColor="brand.secondary"
              >
                {/* TODO: implement status logic */}
                Planned
              </Badge>

              <Text
                fontSize="sm"
                color="foreground.subtle"
              >{`Updated: ${dayjs(isPending ? new Date() : feedback?.updatedAt).fromNow()}`}</Text>
            </HStack>
          </Stack>

          <Text
            color={netVotesColor}
            whiteSpace="nowrap"
          >{`${netVotesSign}${netTotalVotes}`}</Text>
        </HStack>

        <Text color="foreground.muted">{feedback?.description}</Text>

        <Stack justify="space-between" gap={4} mt={2}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            fontSize="sm"
            gap={{ base: 1, sm: 2 }}
          >
            <Text color="foreground.subtle">{feedback?.user?.username}</Text>

            <Flex
              borderRadius="full"
              h={1}
              w={1}
              bgColor="foreground.subtle"
              display={{ base: "none", sm: "flex" }}
              placeSelf="center"
            />

            <Text color="foreground.subtle">
              {dayjs(isPending ? new Date() : feedback?.createdAt).fromNow()}
            </Text>
          </Stack>

          <HStack
            fontSize="sm"
            justify={projectPage ? "space-between" : "flex-end"}
            gap={1}
            py={2}
          >
            {projectPage && (
              <Link
                href={
                  isPending
                    ? "/"
                    : `/organizations/${params.organizationSlug}/projects/${params.projectSlug}/${feedback?.rowId}`
                }
                disabled={isPending}
              >
                <Button disabled={isPending}>
                  {app.projectPage.projectFeedback.details.feedbackLink}
                </Button>
              </Link>
            )}

            <Flex gap={1}>
              {VOTE_BUTTONS.map(({ id, votes, tooltip, icon, ...rest }) => (
                <Tooltip
                  key={id}
                  positioning={{ placement: "top" }}
                  trigger={
                    <HStack gap={2} py={1} fontVariant="tabular-nums">
                      <Icon src={icon} w={5} h={5} />
                      {votes}
                    </HStack>
                  }
                  triggerProps={{
                    variant: "ghost",
                    w: "full",
                    bgColor: "transparent",
                    opacity: {
                      base: 1,
                      _disabled: 0.3,
                      _hover: { base: 0.8, _disabled: 0.3 },
                    },
                    ...rest,
                  }}
                >
                  {tooltip}
                </Tooltip>
              ))}
            </Flex>
          </HStack>
        </Stack>
      </Stack>
    </HStack>
  );
};
export default FeedbackDetails;
