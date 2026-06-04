import { HiOutlineFolder } from "react-icons/hi2";
import { LuBuilding2, LuChevronRight, LuUser } from "react-icons/lu";

import OverflowText from "@/components/core/OverflowText";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Workspace/org data shape for display purposes.
 * Organization data comes from JWT claims, not a local database table.
 */
interface WorkspaceData {
  rowId?: string;
  name?: string;
  slug?: string;
  organizationId?: string;
  type?: "personal" | "team";
  projects?: {
    totalCount?: number;
  };
}

interface Props extends ComponentProps<"div"> {
  /** Workspace details. */
  workspace: Partial<WorkspaceData>;
}

/**
 * Workspace card.
 */
const WorkspaceCard = ({ workspace, className, ...rest }: Props) => {
  const projectCount = workspace?.projects?.totalCount ?? 0;
  const isPersonal = workspace?.type === "personal";

  return (
    <div
      className={cn(
        "relative flex h-full cursor-pointer flex-col justify-between rounded-xl border border-border-subtle bg-background p-5 transition-all group-hover:border-neutral-400 group-hover:bg-neutral-50 group-hover:shadow-[0_4px_12px_-2px_oklch(0_0_0/0.08)] dark:group-hover:border-neutral-500 dark:group-hover:bg-neutral-800/50",
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <OverflowText className="line-clamp-2 font-semibold text-base leading-[1.3]">
            {workspace.name}
          </OverflowText>

          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-xs",
              isPersonal
                ? "border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                : "border-blue-300 text-blue-600 dark:border-blue-800 dark:text-blue-400",
            )}
          >
            {isPersonal ? (
              <LuUser className="size-3" />
            ) : (
              <LuBuilding2 className="size-3" />
            )}
            {isPersonal ? "Personal" : "Team"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-foreground-subtle text-sm">
          <HiOutlineFolder className="size-4" />
          <span>
            {projectCount} {projectCount === 1 ? "project" : "projects"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end text-foreground-subtle transition-all group-hover:translate-x-0.5 group-hover:text-foreground">
        <LuChevronRight className="size-4" />
      </div>
    </div>
  );
};

export default WorkspaceCard;
