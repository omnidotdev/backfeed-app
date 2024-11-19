import { Flex, Text } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Card title. */
  title: string;
  /** Props to pass to the main content container. */
  contentProps?: FlexProps;
}

/**
 * Feedback card.
 */
const FeedbackCard = ({ title, children, contentProps, ...rest }: Props) => (
  <Flex
    position="relative"
    direction="column"
    flex={1}
    h="100%"
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="lg"
    overflow="auto"
    {...rest}
  >
    <Text
      position="absolute"
      top={0}
      w="full"
      backgroundColor="background.subtle"
      fontSize="2xl"
      fontWeight="semibold"
      boxShadow="xs"
      lineHeight={1.2}
      p={6}
    >
      {title}
    </Text>

    <Flex
      // alignItems="center"
      // justifyContent="center"
      direction="column"
      flex={1}
      p={{ base: 6, md: 10 }}
      mt={16}
      {...contentProps}
    >
      {children}
    </Flex>
  </Flex>
);

export default FeedbackCard;
