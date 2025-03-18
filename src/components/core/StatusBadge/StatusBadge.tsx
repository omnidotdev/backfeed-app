import { Badge } from "@omnidev/sigil";

import { getDefaultStatusColor } from "lib/util";

import type { BadgeProps } from "@omnidev/sigil";
import type { PostStatus } from "generated/graphql";

interface Props extends BadgeProps {
  /** The status of the post. */
  status: Partial<PostStatus>;
}

/*
 * Badge representing the status for a feedback item.
 */
const StatusBadge = ({ status, children, ...rest }: Props) => (
  <Badge
    variant="outline"
    color={getDefaultStatusColor(status.status!)}
    borderColor={getDefaultStatusColor(status.status!)}
    // NB: Overrides for when a status color is present in the database. Needs to be analyzed at runtime.
    // TODO: Implement check to validate that the status color is a valid color
    style={
      status.color
        ? {
            color: status.color,
            borderColor: status.color,
          }
        : undefined
    }
    {...rest}
  >
    {status.status}

    {children}
  </Badge>
);

export default StatusBadge;
