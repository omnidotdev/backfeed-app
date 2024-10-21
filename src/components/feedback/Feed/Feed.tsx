import {
  Button,
  Divider,
  Flex,
  VStack,
  Stack,
  Dialog,
  Icon,
  Text,
  Skeleton,
  useDisclosure,
  Center,
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
} from "generated/graphql";

import type { FlexProps } from "@omnidev/sigil";
import type { Post } from "generated/graphql";

interface Props extends FlexProps {
  projectId: string;
  enableDownvotes?: boolean;
}

/**
 * Feedback feed.
 */
const Feed = ({ projectId, enableDownvotes = false, ...rest }: Props) => {
  const [activePost, setActivePost] = useState<Post | null>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { address: connectedAddress } = useAccount();

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = usePostsQuery({ projectId }, { select: (data) => data.findManyPost });

  const { mutate: upvotePost } = useUpvotePostMutation({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: usePostsQuery.getKey({ projectId }),
        }),
    }),
    { mutate: deleteUpvote } = useDeleteUpvoteMutation({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: usePostsQuery.getKey({ projectId }),
        }),
    }),
    { mutate: deletePost } = useDeletePostMutation({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: usePostsQuery.getKey({ projectId }),
        }),
    });

  const upvote = (upvoteId: string | undefined, postId: string) => {
    if (connectedAddress) {
      upvoteId
        ? deleteUpvote({ upvoteId })
        : upvotePost({
            id: upvoteId || "",
            postId: postId,
            userAddress: connectedAddress || "",
          });
    }
  };

  if (isPostsError) return <Center>Error</Center>;

  return (
    <>
      <Flex flexDirection="column" gap={4} w="full" {...rest}>
        {isPostsLoading
          ? [...Array(3)].map((_, idx) => (
              <Stack key={idx} gap={4} w="full" mb={4} _last={{ mb: 0 }}>
                <Skeleton w="40%" h={6} />
                <Skeleton h={12} />
              </Stack>
            ))
          : posts?.map((post) => {
              const upvoteId = post.upvotes.find((upvote) => upvote.id)?.id;

              return (
                <Flex key={post.id} gap={4} h="100%">
                  <VStack gap={0}>
                    <Icon
                      src={UpIcon}
                      color={upvoteId ? "green.500" : "gray.400"}
                      onClick={() => upvote(upvoteId, post.id)}
                      cursor="pointer"
                    />

                    <Text fontWeight="bold" fontSize="xl">
                      {post.upvotes.length}
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
                      onOpen();
                    }}
                  >
                    <Text>{post.title}</Text>
                    <Text color="gray.500" lineClamp={3}>
                      {post.description}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
      </Flex>

      {activePost && (
        // @ts-ignore not sure why this is throwing an error
        <Dialog
          open={isOpen}
          // @ts-ignore not sure why this is throwing an error
          onOpenChange={({ open }) => (open ? onOpen() : onClose())}
          title="test"
        >
          <Flex direction="column" gap={6} maxW="lg">
            <Flex direction="column" gap={1}>
              <Text fontSize="sm" opacity={0.8}>
                <Icon src={PersonIcon} mr={2} /> Created by{" "}
                {activePost?.author.walletAddress === connectedAddress
                  ? "you"
                  : activePost?.author.walletAddress}
              </Text>
              <Text fontSize="sm" opacity={0.8}>
                <Icon src={CalendarIcon} mr={3} />
                {dayjs().to(dayjs(activePost?.createdAt))}
              </Text>
            </Flex>

            <Divider />

            <Text>{activePost?.description}</Text>

            {activePost?.author.walletAddress === connectedAddress && (
              <Button
                colorScheme="red"
                onClick={() => {
                  deletePost({ postId: activePost!.id });
                  onClose();
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
