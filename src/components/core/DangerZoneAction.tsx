import { HStack, Stack, Text } from "@omnidev/sigil";

import DestructiveAction from "@/components/core/DestructiveAction";

import type { DestructiveActionProps } from "@/components/core/DestructiveAction";

interface Props {
  /** Action title */
  title: string;
  /** Action description */
  description: string;
  /** Destructive action props. */
  actionProps: DestructiveActionProps;
}

/**
 * Organization action. This action is destructive and cannot be undone.
 */
const DangerZoneAction = ({ title, description, actionProps }: Props) => (
  <HStack alignItems="center" justifyContent="space-between">
    <Stack gap={1}>
      <Text fontWeight="semibold">{title}</Text>

      <Text fontSize="sm" color="foreground.muted">
        {description}
      </Text>
    </Stack>

    <DestructiveAction {...actionProps} />
  </HStack>
);

export default DangerZoneAction;
