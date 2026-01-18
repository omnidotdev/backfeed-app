import { Stack, Text } from "@omnidev/sigil";

import type { FlexProps, StackProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Section title. */
  title: string;
  /** Props to pass to the main content container. */
  contentProps?: StackProps;
}

/**
 * Feedback section.
 */
const FeedbackSection = ({ title, children, contentProps, ...rest }: Props) => (
  <Stack
    position="relative"
    flex={1}
    h="100%"
    bgColor="background.default"
    borderRadius="xl"
    borderWidth="1px"
    borderColor="border.subtle"
    overflow="hidden"
    {...rest}
  >
    <Text
      w="full"
      fontSize="sm"
      fontWeight="semibold"
      color="foreground.default"
      borderBottomWidth="1px"
      borderColor="border.subtle"
      px={5}
      py={4}
    >
      {title}
    </Text>

    <Stack flex={1} overflow="auto" {...contentProps}>
      {children}
    </Stack>
  </Stack>
);

export default FeedbackSection;
