import {
  Button,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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

import type { FlexProps } from "@chakra-ui/react";
import type { Post } from "generated/graphql";

interface Props extends FlexProps {
  projectId: string;
  enableDownvotes?: boolean;
}

const voteIconProps = { w: 6, h: 6, cursor: "pointer" };

/**
 * Feedback feed.
 */
const Feed = ({ projectId, enableDownvotes = false, ...rest }: Props) => {
  const [activePost, setActivePost] = useState<Post | null>();

  const {
    isOpen: isPostModalOpen,
    onOpen: onPostModalOpen,
    onClose: onPostModalClose,
  } = useDisclosure();

  const queryClient = useQueryClient();

  const { address: connectedAddress } = useAccount();

  const {
    data: posts = [
      { id: "0", title: "0", description: "0", upvotes: [] },
      { id: "1", title: "1", description: "1", upvotes: [] },
    ],
    isLoading: isPostsLoading,
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

  return (
    <>
      <Flex direction="column" gap={4} {...rest}>
        {posts?.map((post) => {
          const upvoteId = post.upvotes.find((upvote) => upvote.id)?.id;

          return (
            <Skeleton key={post.title} h={12} isLoaded={!isPostsLoading}>
              <Flex gap={6} align="center" h="100%">
                <Flex direction="column" textAlign="center" userSelect="none">
                  {/* TODO CTA if not connected */}
                  <Icon
                    as={UpIcon}
                    mb={-0.5}
                    color={upvoteId ? "green.500" : "gray.400"}
                    onClick={() => {
                      if (connectedAddress) {
                        upvoteId
                          ? deleteUpvote({ upvoteId })
                          : upvotePost({
                              id: upvoteId || "",
                              postId: post.id,
                              userAddress: connectedAddress || "",
                            });
                      }
                    }}
                    {...voteIconProps}
                  />
                  <Text fontWeight="bold" fontSize="xl">
                    {post.upvotes.length}
                  </Text>

                  {enableDownvotes && (
                    <Icon
                      as={DownIcon}
                      mt={-0.5}
                      color={upvoteId ? "red.500" : "gray.400"}
                      {...voteIconProps}
                    />
                  )}
                </Flex>

                <Flex
                  cursor="pointer"
                  direction="column"
                  onClick={() => {
                    setActivePost(post as Post);
                    onPostModalOpen();
                  }}
                  w="100%"
                  p={2}
                >
                  <Text>{post.title}</Text>
                  {/* TODO truncate */}
                  <Text color="gray.500">{post.description}</Text>
                </Flex>
              </Flex>
            </Skeleton>
          );
        })}
      </Flex>

      <Modal
        isOpen={isPostModalOpen}
        onClose={() => {
          setActivePost(null);
          onPostModalClose();
        }}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{activePost?.title}</ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            <Flex direction="column" gap={6}>
              <Flex direction="column" gap={1}>
                <Text fontSize="sm" opacity={0.8}>
                  <Icon as={PersonIcon} mr={2} /> Created by{" "}
                  {activePost?.author.walletAddress === connectedAddress
                    ? "you"
                    : activePost?.author.walletAddress}
                </Text>
                <Text fontSize="sm" opacity={0.8}>
                  <Icon as={CalendarIcon} mr={3} />
                  {dayjs().to(dayjs(activePost?.createdAt))}
                </Text>
              </Flex>

              <Divider />

              <Text>{activePost?.description}</Text>
            </Flex>
          </ModalBody>

          {activePost?.author.walletAddress === connectedAddress && (
            <ModalFooter>
              <Button
                colorScheme="red"
                onClick={() => {
                  deletePost({ postId: activePost!.id });
                  onPostModalClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Feed;
