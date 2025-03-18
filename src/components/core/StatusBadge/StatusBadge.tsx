import { Badge } from "@omnidev/sigil";
import { match } from "ts-pattern";

import type { BadgeProps } from "@omnidev/sigil";
import type { PostStatus } from "generated/graphql";

/**
 * Returns the color for the given status (based on default status options).
 */
export const getStatusColor = (status: string) =>
  match(status)
    .with("Open", () => "blue")
    .with("Planned", () => "purple")
    .with("In Progress", () => "yellow")
    .with("Closed", () => "red")
    .with("Resolved", () => "green")
    .otherwise(() => undefined);

interface Props extends BadgeProps {
  /** The status of the post. */
  status: Partial<PostStatus>;
}

/*
 * Badge representing the status for a feedback item.
 */
const StatusBadge = ({ status, children, ...rest }: Props) => {
  // TODO: handle validating color from database
  const color = status.color ?? getStatusColor(status.status!);

  return (
    <Badge variant="outline" color={color} borderColor={color} {...rest}>
      {status.status}

      {children}
    </Badge>
  );
};

export default StatusBadge;
