import { Button, Dialog, Flex, Text, Divider, Icon } from "@omnidev/sigil";
import dayjs from "dayjs";
import {
  IoCalendarOutline as CalendarIcon,
  IoPersonOutline as PersonIcon,
} from "react-icons/io5";

import type { CherrypickRequired } from "lib/types/util";
import type { UseDisclosureOptions } from "@omnidev/sigil";

import type { ProjectPost } from "components/project";

interface Props
  extends CherrypickRequired<
    UseDisclosureOptions,
    "isOpen" | "onClose" | "onOpen"
  > {
  /** Project post. */
  post: ProjectPost;
}

/**
 * Post dialog details.
 */
const PostDialog = ({ isOpen, onOpen, onClose, post }: Props) => (
  // @ts-ignore: TODO not sure why this is throwing an error
  <Dialog
    open={isOpen}
    // @ts-ignore not sure why this is throwing an error
    onOpenChange={({ isOpen }) => (isOpen ? onOpen() : onClose())}
    title={post.title}
    description={post.description}
  >
    <Flex direction="column" gap={6} maxW="lg">
      <Flex direction="column" gap={1}>
        <Text fontSize="sm" opacity={0.8}>
          <Icon src={PersonIcon} mr={2} /> Created by {post.userId}
        </Text>

        <Flex align="center" gap={2}>
          <Icon src={CalendarIcon} mr={3} />

          <Text fontSize="sm" opacity={0.8}>
            {dayjs(post.lastUpdated).fromNow()}
          </Text>
        </Flex>
      </Flex>

      <Divider />

      <Button
        disabled
        colorScheme="red"
        onClick={() => {
          onClose();
        }}
      >
        Delete
      </Button>
    </Flex>
  </Dialog>
);

export default PostDialog;
