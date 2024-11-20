import {
  Button,
  Center,
  Dialog,
  Divider,
  Flex,
  Icon,
  Skeleton,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import {
  AiOutlineCaretDown as DownIcon,
  AiOutlineCaretUp as UpIcon,
} from "react-icons/ai";
import {
  IoCalendarOutline as CalendarIcon,
  IoPersonOutline as PersonIcon,
} from "react-icons/io5";
import { useAccount } from "wagmi";

import {
  useDeletePostMutation,
  useDeleteUpvoteMutation,
  usePostsQuery,
  useUpvotePostMutation,
  useUserQuery,
} from "generated/graphql";

import type { FlexProps } from "@omnidev/sigil";
import type { Post } from "generated/graphql";

interface Props extends FlexProps {
  projectId?: string;
  enableDownvotes?: boolean;
}

// TODO: Remove this file when ready.

/**
 * Feedback feed.
 */
const Feed = ({ projectId, enableDownvotes = false, ...rest }: Props) => {
  const [activePost, setActivePost] = useState<Post | null>();

  const {
    isOpen: isPostDialogOpen,
    onOpen: onPostDialogOpen,
    onClose: onPostDialogClose,
  } = useDisclosure();

  const queryClient = useQueryClient();

  const { address: connectedAddress } = useAccount(),
    { data: user } = useUserQuery(
      { walletAddress: connectedAddress! },
      {
        enabled: !!connectedAddress,
        select: (data) => data.userByWalletAddress,
      }
    );

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = usePostsQuery(
    { projectId: projectId! },
    { select: (data) => data?.posts?.nodes }
  );

  const { mutate: upvotePost } = useUpvotePostMutation({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: usePostsQuery.getKey({ projectId: projectId! }),
        }),
    }),
    { mutate: deleteUpvote } = useDeleteUpvoteMutation({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: usePostsQuery.getKey({ projectId: projectId! }),
        }),
    }),
    { mutate: deletePost } = useDeletePostMutation({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: usePostsQuery.getKey({ projectId: projectId! }),
        }),
    });

  const upvote = (postId: string) => {
    if (connectedAddress) {
      postId &&
        upvotePost({
          upvote: {
            userId: user?.rowId!,
            postId: postId,
          },
        });
    }
  };

  const downvote = (upvoteId: string) => {
    if (connectedAddress) {
      upvoteId && deleteUpvote({ upvoteId });
    }
  };

  if (isPostsError) return <Center>Error</Center>;

  return (
    <>
      <Flex flexDirection="column" gap={4} w="full" {...rest}>
        {isPostsLoading
          ? [...Array(3)].map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: idx needed as key
              <Stack key={idx} gap={4} w="full" mb={4} _last={{ mb: 0 }}>
                <Skeleton w="40%" h={6} />

                <Skeleton h={12} />
              </Stack>
            ))
          : posts?.map((post) => {
              const upvoteId = post?.upvotes?.nodes?.find(
                (upvote) => upvote?.rowId
              )?.rowId;

              const postId = post?.rowId;

              return (
                <Flex key={post?.rowId} gap={4} h="100%">
                  <VStack gap={0}>
                    <Icon
                      src={UpIcon}
                      color={upvoteId ? "green.500" : "gray.400"}
                      onClick={() =>
                        upvoteId ? downvote(upvoteId) : upvote(postId!)
                      }
                      cursor="pointer"
                    />

                    <Text fontWeight="bold" fontSize="xl">
                      {post?.upvotes?.aggregates?.distinctCount?.rowId}
                    </Text>

                    {enableDownvotes && (
                      <Icon
                        src={DownIcon}
                        color={upvoteId ? "red.500" : "gray.400"}
                        cursor="pointer"
                      />
                    )}
                  </VStack>

                  <Flex
                    cursor="pointer"
                    flexDirection="column"
                    onClick={() => {
                      setActivePost(post as Post);
                      onPostDialogOpen();
                    }}
                  >
                    <Text>{post?.title}</Text>

                    <Text color="gray.500" lineClamp={3}>
                      {post?.description}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
      </Flex>

      {activePost && (
        // @ts-ignore not sure why this is throwing an error
        <Dialog
          open={isPostDialogOpen}
          // @ts-ignore not sure why this is throwing an error
          onOpenChange={({ isOpen }) =>
            isOpen ? onPostDialogOpen() : onPostDialogClose()
          }
          title="test"
        >
          <Flex direction="column" gap={6} maxW="lg">
            <Flex direction="column" gap={1}>
              <Text fontSize="sm" opacity={0.8}>
                <Icon src={PersonIcon} mr={2} /> Created by{" "}
                {activePost?.user?.walletAddress === connectedAddress
                  ? "you"
                  : activePost?.user?.walletAddress}
              </Text>

              <Text fontSize="sm" opacity={0.8}>
                <Icon src={CalendarIcon} mr={3} />

                {dayjs().to(dayjs(activePost?.createdAt))}
              </Text>
            </Flex>

            <Divider />

            <Text>{activePost?.description}</Text>

            {activePost?.user?.walletAddress === connectedAddress && (
              <Button
                colorScheme="red"
                onClick={() => {
                  deletePost({ postId: activePost!.id });
                  onPostDialogClose();
                }}
              >
                Delete
              </Button>
            )}
          </Flex>
        </Dialog>
      )}
    </>
  );
};

export default Feed;
