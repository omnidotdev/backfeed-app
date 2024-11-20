import {
  Badge,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import {
  HiOutlineArrowDownCircle,
  HiOutlineArrowUpCircle,
} from "react-icons/hi2";
import { match } from "ts-pattern";

import { PostDialog } from "components/project";

import type { ProjectPost } from "components/project";

interface Props {
  /** Project post. */
  post: ProjectPost;
}

// TODO: Maybe dedup with components/dashboard/Response/Response.tsx

/**
 * Project post.
 */
const Post = ({ post }: Props) => {
  const {
    isOpen: isPostDialogOpen,
    onOpen: onPostDialogOpen,
    onClose: onPostDialogClose,
  } = useDisclosure();

  // TODO: Maybe dedup with components/dashboard/Response/Response.tsx and move to a helper function
  const color = match(post.type)
    .with("Neutral", () => "foreground.subtle")
    .with("Positive", () => "green")
    .with("Bug", () => "red")
    .with("Feature", () => "blue")
    .exhaustive();

  return (
    <>
      <Flex
        gap={6}
        p={6}
        bgColor="background.subtle"
        borderRadius="lg"
        boxShadow="xs"
        pos="relative"
        // TODO: Maybe not open dialog here
        onClick={onPostDialogOpen}
        cursor="pointer"
      >
        <Button
          variant="outline"
          h="full"
          p={0}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Stack gap={2}>
            <Icon src={HiOutlineArrowUpCircle} h={5} w={5} />

            <Text fontSize="lg">{post.upvote.length}</Text>

            <Icon src={HiOutlineArrowDownCircle} h={5} w={5} />
          </Stack>
        </Button>

        <Stack w="full">
          <Flex align="center" justify="space-between">
            <Text fontWeight="semibold">{post.title}</Text>

            <Badge color={color} borderColor={color}>
              {post.type}
            </Badge>
          </Flex>

          <Text fontSize="sm" color="foreground.subtle">
            {post.description}
          </Text>

          <Text color="foreground.muted" fontSize="xs">
            {dayjs(post.lastUpdated).fromNow()}
          </Text>
        </Stack>
      </Flex>

      <PostDialog
        isOpen={isPostDialogOpen}
        onClose={onPostDialogClose}
        onOpen={onPostDialogOpen}
        post={post}
      />
    </>
  );
};

export default Post;
