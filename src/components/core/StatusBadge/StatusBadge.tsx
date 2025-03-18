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
const StatusBadge = ({ status, children, ...rest }: Props) => {
  // TODO: handle validating color from database
  const color = status.color ?? getDefaultStatusColor(status.status!);

  return (
    <Badge variant="outline" color={color} borderColor={color} {...rest}>
      {status.status}

      {children}
    </Badge>
  );
};

export default StatusBadge;
