import {
  Button,
  Grid,
  Stack,
  VStack,
  Textarea,
  Skeleton,
  Text,
  Input,
} from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { ErrorBoundary, SectionContainer } from "components/layout";
import { ProjectResponse } from "components/project";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { ResponseType } from "components/dashboard";

export interface Response {
  /** Unique identifier for the post. */
  id: string;
  /** Title of the post. */
  title: string;
  /** Description providing more details about the post. */
  description: string;
  /** The ID of the project this post belongs to. */
  projectId: string;
  /** The ID of the user who created the post. */
  userId: string;
  /** Timestamp when the post was last updated. */
  lastUpdated: string;
  /** Type of post (e.g., feature request, bug report, etc.). */
  type: ResponseType;
}

interface Responses {
  /** Total response count. */
  totalCount: number;
  /** List of responses. */
  data: Response[];
}

const RESPONSES: Responses = {
  totalCount: 24,
  data: [
    {
      id: "b25a9f2e-0b6f-42e4-b2d9-3f8e8e7ec1c1",
      title: "Enhance Mobile UX",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
      projectId: "project1",
      userId: "user1",
      lastUpdated: "2024-11-05T18:40:27.761Z",
      type: "Positive",
    },
    {
      id: "fb1de8c3-413e-452c-a4d8-98dc7a89f3f2",
      title: "Add Dark Mode",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
      projectId: "project2",
      userId: "user2",
      lastUpdated: "2024-11-17T18:40:27.761Z",
      type: "Bug",
    },
    {
      id: "c761fb6d-62b3-47b5-b3c1-6572f7e523c2",
      title: "Improve Dashboard Analytics",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
      projectId: "project3",
      userId: "user3",
      lastUpdated: "2024-11-12T18:40:27.761Z",
      type: "Feature",
    },
    {
      id: "cbe8b752-dc2d-4ad9-b191-6c68a64d5d74",
      title: "Optimize Page Load Times",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
      projectId: "project4",
      userId: "user4",
      lastUpdated: "2024-11-14T12:00:00.000Z",
      type: "Bug",
    },
    {
      id: "ab83f88e-59c5-4c9e-b997-09a22f8f81ec",
      title: "Integrate AI Chatbot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
      projectId: "project5",
      userId: "user5",
      lastUpdated: "2024-11-16T15:30:00.000Z",
      type: "Positive",
    },
    {
      id: "d2baf2c5-497c-464b-9b91-327ea59202c5",
      title: "Streamline Signup Process",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
      projectId: "project6",
      userId: "user6",
      lastUpdated: "2024-11-10T09:45:00.000Z",
      type: "Feature",
    },
  ],
};

/**
 * Project feedback.
 */
const ProjectFeedback = () => {
  const [shownResponses, setShownResponses] = useState<Response[]>(
    RESPONSES.data
  );

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
      Math.floor(RESPONSES.totalCount / RESPONSES.data.length) - 1
    ) {
      setPageState((prev) => ({
        ...prev,
        hasNextPage: false,
      }));
    }

    setShownResponses((prev) => prev.concat(RESPONSES.data));
  };

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: pageState.hasNextPage,
    onLoadMore: handleLoadMore,
    disabled: isError,
    // NB: `rootMargin` is passed to `IntersectionObserver`. We can use it to trigger 'onLoadMore' when the spinner comes *near* to being visible, instead of when it becomes fully visible within the root element.
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <SectionContainer
      ref={rootRef}
      title={app.projectPage.projectFeedback.title}
      icon={HiOutlineFolder}
      h="100%"
    >
      <Stack h="100%" gap={6}>
        <Stack>
          <Input
            placeholder={app.projectPage.projectFeedback.inputPlaceholder}
            borderColor="border.subtle"
            fontSize="sm"
          />

          <Textarea
            placeholder={app.projectPage.projectFeedback.textareaPlaceholder}
            borderColor="border.subtle"
            fontSize="sm"
            rows={5}
          />

          <Stack justify="space-between" direction="row">
            <Skeleton isLoaded={!isLoading} h="fit-content">
              <Text
                fontSize="sm"
                color="foreground.muted"
              >{`${isError ? 0 : RESPONSES.totalCount} ${app.projectPage.projectFeedback.totalResponses}`}</Text>
            </Skeleton>

            <Button
              w="fit-content"
              placeSelf="flex-end"
              // TODO: discuss if disabling this button (mutation) is the right approach if an error is encountered fetching the comments
              disabled={isLoading || isError}
            >
              {app.projectPage.projectFeedback.submit}
            </Button>
          </Stack>

          {isError ? (
            <ErrorBoundary message="Error fetching feedback" h="sm" />
          ) : (
            <Grid gap={2} mt={4} maxH="dvh" overflow="auto" p="1px">
              {isLoading ? (
                <SkeletonArray count={5} h={32} borderRadius="lg" w="100%" />
              ) : (
                <VStack>
                  {shownResponses.map(
                    ({ id, title, description, lastUpdated, type }, index) => (
                      <ProjectResponse
                        // biome-ignore lint/suspicious/noArrayIndexKey: index needed as key for the time being
                        key={`${id}-${index}`}
                        title={title}
                        description={description}
                        lastUpdated={lastUpdated}
                        type={type}
                      />
                    )
                  )}

                  {pageState.hasNextPage && <Spinner ref={loaderRef} />}
                </VStack>
              )}
            </Grid>
          )}
        </Stack>
      </Stack>
    </SectionContainer>
  );
};

export default ProjectFeedback;
