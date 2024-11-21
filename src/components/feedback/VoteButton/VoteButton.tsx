import { Button, HStack, Icon } from "@omnidev/sigil";

import type { ButtonProps, VstackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

export interface Props extends ButtonProps {
  /** Number of votes (upvotes or downvotes). */
  votes: number | undefined;
  /** Visual icon. */
  icon: IconType;
  /** Props to pass to the main content container. */
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
    bgColor="transparent"
    opacity={{ base: 1, _disabled: 0.3, _hover: { base: 0.8, _disabled: 0.3 } }}
    {...rest}
  >
    <HStack gap={1} py={1} fontVariant="tabular-nums" {...contentProps}>
      <Icon src={icon} w={4} h={4} />

      {votes ?? 0}
    </HStack>
  </Button>
);

export default VoteButton;
