import { Flex, Text } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  title: string;
}

/**
 * Feedback card.
 */
const FeedbackCard = ({ title, children, ...rest }: Props) => (
  <Flex
    direction="column"
    flex={1}
    h="100%"
    p={6}
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="lg"
    {...rest}
  >
    <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2} mb={4}>
      {title}
    </Text>

    <Flex direction="column" flex={1}>
      {children}
    </Flex>
  </Flex>
);

export default FeedbackCard;
