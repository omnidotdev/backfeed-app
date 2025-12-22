import { Badge } from "@omnidev/sigil";

import type { BadgeProps } from "@omnidev/sigil";
import type { PostStatus } from "@/generated/graphql";

interface Props extends BadgeProps {
  /** The status of the post. */
  status: Partial<PostStatus> | null;
}

/*
 * Badge representing the status for feedback.
 */
const StatusBadge = ({ status, children, ...rest }: Props) => (
  <Badge
    variant="outline"
    // NB: Needs to be analyzed at runtime.
    // TODO: Implement check to validate that the status color is a valid color
    style={
      status?.color
        ? {
            color: status.color,
            borderColor: status.color,
            // TODO: Implement when `status.color` is validated first (breaks if not a valid color, i.e. seeded data)
            // backgroundColor: parseColor(status.color).decrementChannel("alpha", 0.95).toString("rgba"),
          }
        : undefined
    }
    {...rest}
  >
    {status?.status ?? "Unknown"}

    {children}
  </Badge>
);

export default StatusBadge;
