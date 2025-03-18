import { Badge } from "@omnidev/sigil";
import { match } from "ts-pattern";

import { capitalizeFirstLetter } from "lib/util";

import type { BadgeProps } from "@omnidev/sigil";
import type { PostStatus } from "generated/graphql";

// TODO: remove `getStatusColor` when logic for handling status is customizable / fully stored in the database.

/**
 * Returns the color for the given status.
 */
const getStatusColor = (status: string) =>
  match(status)
    .with("open", () => "blue")
    .with("planned", () => "purple")
    .with("in_progress", () => "yellow")
    .with("closed", () => "red")
    .with("resolved", () => "green")
    .otherwise(() => undefined);

interface Props extends BadgeProps {
  /** The status of the post. */
  status: PostStatus["status"];
}

/*
 * Badge representing the status for a feedback item.
 */
const StatusBadge = ({ status, children, ...rest }: Props) => (
  <Badge
    variant="outline"
    color={getStatusColor(status)}
    borderColor={getStatusColor(status)}
    {...rest}
  >
    {capitalizeFirstLetter(status)}

    {children}
  </Badge>
);

export default StatusBadge;
