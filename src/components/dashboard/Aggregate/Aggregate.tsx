import { Flex, Icon, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  title: string;
  value: string | number;
  icon: IconType;
}

const Aggregate = ({ title, value, icon }: Props) => (
  <Flex
    direction="column"
    gap={3}
    borderColor="border.subtle"
    p={6}
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="lg"
  >
    <Flex align="center" justify="space-between" gap={2}>
      <Text color="foreground.subtle" fontSize="sm" fontWeight="medium">
        {title}
      </Text>

      <Icon src={icon} w={5} h={5} color="foreground.subtle" />
    </Flex>

    <Flex direction="column" gap={1}>
      <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
        {value}
      </Text>

      <Text fontSize="xs" color="green" fontWeight="medium">
        +4.2069% from last month
      </Text>
    </Flex>
  </Flex>
);

export default Aggregate;
