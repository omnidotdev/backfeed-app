import { Button } from "@/components/ui/button";
import {
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import cn from "@/lib/utils";

import type { IconType } from "react-icons";

interface ActionProps {
  /** Text displayed on the action button. */
  label: string;
  /** Function to execute when the action button is clicked. */
  onClick: () => void;
  /** Icon displayed in the action button. */
  icon?: IconType;
  /** Whether the action button is disabled. */
  disabled?: boolean;
  /** Optional tooltip shown when the action button is disabled. */
  tooltip?: string;
}

interface Props {
  /** Readable message. */
  message: string;
  /** Optional CTA event. */
  action?: ActionProps;
  /** Additional class names (sizing/spacing). */
  className?: string;
}

/**
 * Empty state component. Displays a message and an optional CTA when a successful query has no results.
 */
const EmptyState = ({ message, action, className }: Props) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-6 rounded-md border border-dashed p-4 text-center",
      className,
    )}
  >
    {message}

    {action && (
      <TooltipRoot>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={action.disabled}
            onClick={action.onClick}
            className="border-primary text-primary hover:bg-primary/10 dark:text-[var(--colors-brand-primary-400)]"
          >
            {action.icon && <action.icon className="size-4" />}
            {action.label}
          </Button>
        </TooltipTrigger>

        {action.disabled && action.tooltip && (
          <TooltipPositioner>
            <TooltipContent className="text-sm">
              {action.tooltip}
            </TooltipContent>
          </TooltipPositioner>
        )}
      </TooltipRoot>
    )}
  </div>
);

export default EmptyState;
