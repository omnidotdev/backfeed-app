"use client";

import {
  Button,
  Grid,
  Input,
  Skeleton,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { FeedbackDetails } from "components/feedback";
import { useInfinitePostsQuery } from "generated/graphql";
import { app } from "lib/config";

interface Props {
  /** Project ID. */
  projectId: string;
}

/**
 * Project feedback.
 */
const ProjectFeedback = ({ projectId }: Props) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfinitePostsQuery(
      {
        pageSize: 5,
        projectId: "4620b329-b585-431f-1741-d6e083173080",
      },
      {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
          lastPage?.posts?.pageInfo?.hasNextPage
            ? { after: lastPage?.posts?.pageInfo?.endCursor }
            : undefined,
      }
    );

  const totalCount = data?.pages?.[0]?.posts?.totalCount ?? 0;
  const posts = data?.pages?.flatMap((page) =>
    page?.posts?.nodes?.map((post) => post)
  );

  // console.log("posts", posts);

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
      h="100%"
    >
      <Stack h="100%" gap={6}>
        <Stack>
          {/* TODO: Extract this form into its own component when hooking up. */}
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
            minH={32}
          />

          <Stack justify="space-between" direction="row">
            <Skeleton isLoaded={!isLoading} h="fit-content">
              <Text
                fontSize="sm"
                color="foreground.muted"
              >{`${isError ? 0 : totalCount} ${app.projectPage.projectFeedback.totalResponses}`}</Text>
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
            <Grid gap={2} mt={4} maxH="sm" overflow="auto" p="1px">
              {isLoading ? (
                <SkeletonArray count={5} h={21} />
              ) : posts?.length ? (
                <VStack>
                  {posts?.map((post) => (
                    <FeedbackDetails
                      key={post?.rowId}
                      // @ts-ignore
                      feedback={post}
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
      </Stack>
    </SectionContainer>
  );
};

export default ProjectFeedback;
