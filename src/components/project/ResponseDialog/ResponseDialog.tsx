import { Button, Dialog, Divider, Flex, Icon, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import {
  IoCalendarOutline as CalendarIcon,
  IoPersonOutline as PersonIcon,
} from "react-icons/io5";

import type { UseDisclosureOptions } from "@omnidev/sigil";
import type { CherrypickRequired } from "lib/types/util";

import type { Response } from "components/project";

interface Props
  extends CherrypickRequired<
    UseDisclosureOptions,
    "isOpen" | "onClose" | "onOpen"
  > {
  /** Project response. */
  response: Response;
}

/**
 * Post dialog details.
 */
const ResponseDialog = ({ isOpen, onOpen, onClose, response }: Props) => (
  // @ts-ignore: TODO not sure why this is throwing an error
  <Dialog
    open={isOpen}
    // @ts-ignore not sure why this is throwing an error
    onOpenChange={({ isOpen }) => (isOpen ? onOpen() : onClose())}
    title={response.title}
    description={response.description}
  >
    <Flex direction="column" gap={6} maxW="lg">
      <Flex direction="column" gap={1}>
        <Text fontSize="sm" opacity={0.8}>
          <Icon src={PersonIcon} mr={2} /> Created by {response.userId}
        </Text>

        <Flex align="center" gap={2}>
          <Icon src={CalendarIcon} mr={3} />

          <Text fontSize="sm" opacity={0.8}>
            {dayjs(response.lastUpdated).fromNow()}
          </Text>
        </Flex>
      </Flex>

      <Divider />

      {/* TODO: Hook this up with query. Close dialog on mutation */}
      <Button disabled colorScheme="red">
        Delete
      </Button>
    </Flex>
  </Dialog>
);

export default ResponseDialog;
