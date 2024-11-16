import { Flex, Text } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  title: string;
}

// NB: this could be an example of an early abstraction. Typing the props and data that should be sent down from the parent through this component and then to the children could be difficult.
// Having DRY styles is nice, but it doesn't always allow for well structured data driven dev. Making note just in case.
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
