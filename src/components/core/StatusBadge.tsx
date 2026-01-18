import { Flex, Text } from "@omnidev/sigil";
import Color from "colorjs.io";

import type { FlexProps } from "@omnidev/sigil";
import type { StatusTemplate } from "@/generated/graphql";

interface Props extends FlexProps {
  /** The status template for the post. */
  status: Partial<StatusTemplate> | null;
}

/**
 * Get background color with opacity from status color.
 */
const getBackgroundColor = (
  color: string | null | undefined,
): string | undefined => {
  if (!color) return undefined;
  try {
    const parsed = new Color(color);
    parsed.alpha = 0.15;
    return parsed.toString({ format: "rgba" });
  } catch {
    return undefined;
  }
};

/*
 * Badge representing the status for feedback.
 */
const StatusBadge = ({ status, children, ...rest }: Props) => {
  const bgColor = getBackgroundColor(status?.color);

  return (
    <Flex
      align="center"
      gap={1}
      px={2.5}
      py={1}
      borderRadius="full"
      style={{
        backgroundColor: bgColor,
        color: status?.color ?? undefined,
      }}
      {...rest}
    >
      <Text fontSize="xs" fontWeight="medium" whiteSpace="nowrap">
        {status?.displayName ?? "Unknown"}
      </Text>

      {children}
    </Flex>
  );
};

export default StatusBadge;
