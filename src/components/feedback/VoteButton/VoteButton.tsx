import { Button, HStack, Icon } from "@omnidev/sigil";

import type { ButtonProps, VstackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

export interface Props extends ButtonProps {
  /** Number of votes (upvotes or downvotes). */
  votes: number;
  /** Visual icon. */
  icon: IconType;
  contentProps?: VstackProps;
}

/**
 * Vote button. Used to provide either upvotes or downvotes to feedback.
 */
const VoteButton = ({ votes, icon, contentProps, ...rest }: Props) => (
  <Button
    variant="ghost"
    w="full"
    h="max-content"
    p={0}
    bgColor="transparent"
    _hover={{ opacity: 0.8 }}
    {...rest}
  >
    <HStack gap={1} py={1} {...contentProps}>
      <Icon src={icon} w={4} h={4} />

      {votes}
    </HStack>
  </Button>
);

export default VoteButton;
