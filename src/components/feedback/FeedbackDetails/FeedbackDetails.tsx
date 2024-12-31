"use client";

import {
  Button,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import { useState } from "react";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";
import { match } from "ts-pattern";
import { useParams } from "next/navigation";
import Link from "next/link";

import { ErrorBoundary } from "components/layout";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { TooltipTriggerProps, VstackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";
import type { Post } from "generated/graphql";

// export interface Feedback {
//   /** Feedback ID. */
//   id: string;
//   /** Feedback title. */
//   title: string;
//   /** Feedback description. */
//   description: string;
//   /** Feedback created date. */
//   createdAt: string;
//   /** Feedback updated date. */
//   updatedAt: string;
//   /** Feedback status. */
//   status: "New" | "Planned" | "In Progress" | "Complete";
//   /** Total upvotes for the feedback. */
//   upvotes: number;
//   /** Total downvotes for the feedback. */
//   downvotes: number;
//   /** User who created the feedback. */
//   user: {
//     /** User ID. */
//     id: string;
//     /** User first name. */
//     firstName: string;
//     /** User last name. */
//     lastName: string;
//   };
// }

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

interface Props {
  /** Feedback details. */
  feedback: Post;
  /** Whether we are viewing the project page. */
  projectPage?: boolean;
}

/**
 * Feedback details section.
 */
const FeedbackDetails = ({ feedback, projectPage = false, ...rest }: Props) => {
  const params = useParams<{ organizationId: string; projectId: string }>();

  const { isLoading, isError } = useDataState({ timeout: 400 });

  const [votingState, setVotingState] = useState<{
    hasUpvoted: boolean;
    hasDownvoted: boolean;
  }>({ hasUpvoted: false, hasDownvoted: false });

  const isVotingDisabled = isLoading || isError;

  const upvotes = feedback?.upvotes.aggregates?.distinctCount?.rowId ?? 0;

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: votingState.hasUpvoted ? Number(upvotes) + 1 : Number(upvotes),
      tooltip: app.feedbackPage.details.upvote,
      icon: votingState.hasUpvoted ? PiArrowFatLineUpFill : PiArrowFatLineUp,
      color: "brand.tertiary",
      disabled: isVotingDisabled,
      onClick: () => {
        setVotingState((prev) => ({
          hasUpvoted: !prev.hasUpvoted,
          hasDownvoted: false,
        }));
      },
    },
    {
      id: "downvote",
      votes: votingState.hasDownvoted
        ? // @ts-ignore
          (feedback?.downvotes ?? 0) + 1
        : // @ts-ignore
          feedback?.downvotes,
      tooltip: app.feedbackPage.details.downvote,
      icon: votingState.hasDownvoted
        ? PiArrowFatLineDownFill
        : PiArrowFatLineDown,
      color: "brand.quinary",
      disabled: isVotingDisabled,
      onClick: () => {
        setVotingState((prev) => ({
          hasUpvoted: false,
          hasDownvoted: !prev.hasDownvoted,
        }));
      },
    },
  ];

  // @ts-ignore
  const netTotalVotes = Number(upvotes) - (feedback?.downvotes ?? 0);

  const netVotesColor = match(netTotalVotes)
    .with(0, () => "foreground.subtle")
    .when(
      (net) => net > 0,
      () => "brand.tertiary"
    )
    .otherwise(() => "brand.quinary");

  return (
    <HStack
      position="relative"
      gap={8}
      bgColor="background.default"
      borderRadius="lg"
      boxShadow="lg"
      p={{ base: 4, sm: 6 }}
      {...rest}
    >
      {isError ? (
        <ErrorBoundary
          message="Error fetching feedback details"
          h={52}
          w="full"
        />
      ) : (
        <Stack w="full">
          <HStack justify="space-between">
            <Stack direction={{ base: "column", sm: "row" }} gap={4}>
              <Skeleton
                isLoaded={!isLoading}
                maxW={isLoading ? 48 : undefined}
                h={9}
              >
                <Text fontWeight="semibold" fontSize="2xl">
                  {feedback?.title}
                </Text>
              </Skeleton>

              <HStack>
                {/* <Skeleton isLoaded={!isLoading}>
                  <Badge
                    variant="outline"
                    color="brand.secondary"
                    borderColor="brand.secondary"
                  >
                    {feedback?.status}
                  </Badge>
                </Skeleton> */}

                <Skeleton isLoaded={!isLoading}>
                  <Text
                    fontSize="sm"
                    color="foreground.subtle"
                  >{`Updated: ${dayjs(feedback?.updatedAt).fromNow()}`}</Text>
                </Skeleton>
              </HStack>
            </Stack>

            <Skeleton
              isLoaded={!isLoading}
              fontWeight="semibold"
              alignSelf={{ base: "flex-start", sm: "center" }}
              px={2}
              mt={{ base: 1.5, sm: 0 }}
            >
              <Text
                color={netVotesColor}
              >{`${netTotalVotes > 0 ? "+" : ""}${netTotalVotes}`}</Text>
            </Skeleton>
          </HStack>

          <Skeleton
            isLoaded={!isLoading}
            minH={isLoading ? 24 : undefined}
            mt={2}
          >
            <Text color="foreground.muted">{feedback?.description}</Text>
          </Skeleton>

          <Stack justify="space-between" gap={4} mt={2}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              fontSize="sm"
              gap={{ base: 1, sm: 2 }}
            >
              <Skeleton isLoaded={!isLoading} maxW={isLoading ? 32 : undefined}>
                <Text color="foreground.subtle">
                  {feedback?.user?.username}
                </Text>
              </Skeleton>

              <Flex
                borderRadius="full"
                h={1}
                w={1}
                bgColor="foreground.subtle"
                display={{ base: "none", sm: "flex" }}
                placeSelf="center"
              />

              <Skeleton isLoaded={!isLoading} maxW={isLoading ? 24 : undefined}>
                <Text color="foreground.subtle">
                  {dayjs(feedback?.createdAt).fromNow()}
                </Text>
              </Skeleton>
            </Stack>

            <HStack fontSize="sm" justify="space-between" gap={1} py={2}>
              {projectPage && (
                <Link
                  href={`/organizations/${params.organizationId}/projects/${params.projectId}/${feedback?.id}`}
                >
                  <Button>
                    {app.projectPage.projectFeedback.details.feedbackLink}
                  </Button>
                </Link>
              )}

              <Flex gap={1}>
                {VOTE_BUTTONS.map(
                  ({ id, votes = 0, tooltip, icon, ...rest }) => (
                    <Skeleton key={id} isLoaded={!isLoading} h={7}>
                      <Tooltip
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
                    </Skeleton>
                  )
                )}
              </Flex>
            </HStack>
          </Stack>
        </Stack>
      )}
    </HStack>
  );
};

export default FeedbackDetails;
