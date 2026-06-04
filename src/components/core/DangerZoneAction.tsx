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
 * Workspace action. This action is destructive and cannot be undone.
 */
const DangerZoneAction = ({ title, description, actionProps }: Props) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-1">
      <p className="font-semibold">{title}</p>

      <p className="text-muted-foreground text-sm">{description}</p>
    </div>

    <DestructiveAction {...actionProps} />
  </div>
);

export default DangerZoneAction;
