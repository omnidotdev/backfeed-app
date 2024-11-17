import { Flex, Text } from "@omnidev/sigil";

import type { TooltipProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

/**
 * Feedback tooltip.
 */
const FeedbackTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <Flex
        bgColor="background.default"
        direction="column"
        borderRadius="md"
        borderWidth="1px"
        borderColor="border.subtle"
      >
        <Text
          as="h2"
          color="foreground.subtle"
          w="full"
          textAlign="center"
          py={1}
          bgColor="background.subtle"
          fontSize="sm"
        >
          {label}
        </Text>
        
        <Flex px={4} py={2}>
          {payload.map((pld, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: pld doesn't have an appropriate type for the key. Using `index` as a workaround.
            <Flex key={index} textWrap="nowrap" gap={1}>
              <Text color="brand.primary">{pld.value}</Text>
              <Text color={pld.color}>{pld.dataKey}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  }

  return null;
};

export default FeedbackTooltip;
