import { Button, Icon, VStack } from "@omnidev/sigil";

import type { ButtonProps, VstackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

export interface Props extends ButtonProps {
  /** Number of votes (upvotes or downvotes). */
  votes: number;
  /** Visual icon. */
  icon: IconType;
  contentProps?: VstackProps;
}

const VoteButton = ({ votes, icon, contentProps, ...rest }: Props) => (
  <Button
    variant="outline"
    color="colorPalette.default"
    borderColor="colorPalette.default"
    backgroundColor={{
      base: { base: "colorPalette.50", _dark: "colorPalette.950" },
      _hover: { base: "colorPalette.100", _dark: "colorPalette.900" },
    }}
    w="full"
    h="max-content"
    p={0}
    {...rest}
  >
    <VStack gap={1} py={1} {...contentProps}>
      <Icon src={icon} w={4} h={4} />
      {votes}
    </VStack>
  </Button>
);

export default VoteButton;
