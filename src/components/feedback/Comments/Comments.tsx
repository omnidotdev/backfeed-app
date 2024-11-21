import {
  Button,
  Skeleton,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@omnidev/sigil";
import { useState } from "react";
import { LuMessageSquare } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { CommentCard } from "components/feedback";
import { ErrorBoundary, SectionContainer } from "components/layout";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

const COMMENTS = {
  totalCount: 24,
  data: [
    {
      id: "1",
      senderName: "Back Feed",
      message: "I still like turtles.",
      date: "2024-11-01T00:00:00.000Z",
    },
    {
      id: "2",
      senderName: "Feed Back",
      message: "The new dashboard layout is much more intuitive!",
      date: "2024-04-02T00:00:00.000Z",
    },
    {
      id: "3",
      senderName: "Fed Front",
      message: "Having issues with the new export feature.",
      date: "2024-01-03T00:00:00.000Z",
    },
    {
      id: "4",
      senderName: "Back Fed",
      message: "Would love to be able to export feedback.",
      date: "2023-01-04T00:00:00.000Z",
    },
  ],
};

/**
 * Feedback comments section.
 */
const Comments = () => {
  const [shownComments, setShownComments] = useState(COMMENTS.data);

  const [pageState, setPageState] = useState<{
    currentPage: number;
    hasNextPage: boolean;
  }>({ currentPage: 1, hasNextPage: true });

  const { isLoading, isError } = useDataState({ timeout: 700 });

  // NB: temporarily used to mock an infinite query
  const handleLoadMore = () => {
    if (!pageState.hasNextPage) return;

    setPageState((prev) => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));

    if (
      pageState.currentPage >=
      Math.floor(COMMENTS.totalCount / COMMENTS.data.length) - 1
    ) {
      setPageState((prev) => ({
        ...prev,
        hasNextPage: false,
      }));
    }

    setShownComments((prev) => prev.concat(COMMENTS.data));
  };

  return (
    <SectionContainer
      title={app.feedbackPage.comments.title}
      description={app.feedbackPage.comments.description}
      icon={LuMessageSquare}
    >
      <Stack>
        <Textarea
          placeholder={app.feedbackPage.comments.textAreaPlaceholder}
          borderColor="border.subtle"
          fontSize="sm"
          minH={28}
        />

        <Stack justify="space-between" direction="row">
          <Skeleton isLoaded={!isLoading} h="fit-content">
            <Text
              fontSize="sm"
              color="foreground.muted"
            >{`${COMMENTS.totalCount} ${app.feedbackPage.comments.totalComments}`}</Text>
          </Skeleton>

          <Button w="fit-content" placeSelf="flex-end">
            {app.feedbackPage.comments.submit}
          </Button>
        </Stack>

        {isError ? (
          <ErrorBoundary message="Error fetching comments" h="sm" />
        ) : (
          <Stack gap={4} mt={4} maxH="sm" overflow="auto" p="1px">
            {isLoading ? (
              <SkeletonArray count={4} h={21} />
            ) : (
              <VStack>
                {shownComments.map(
                  ({ id, senderName, message, date }, index) => (
                    <CommentCard
                      // biome-ignore lint/suspicious/noArrayIndexKey: index needed as key for the time being
                      key={`${id}-${index}`}
                      senderName={senderName}
                      message={message}
                      date={date}
                      w="full"
                      minH={21}
                    />
                  )
                )}

                {pageState.hasNextPage && (
                  <Button variant="muted" onClick={handleLoadMore}>
                    Load More
                  </Button>
                )}
              </VStack>
            )}
          </Stack>
        )}
      </Stack>
    </SectionContainer>
  );
};

export default Comments;
