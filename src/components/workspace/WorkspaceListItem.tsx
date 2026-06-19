import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { HiOutlineFolder } from "react-icons/hi2";

import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

/**
 * Workspace/org data shape for display purposes.
 * Organization data comes from JWT claims, not a local database table.
 */
interface WorkspaceData {
  rowId?: string;
  name?: string;
  slug?: string;
  organizationId?: string;
  updatedAt?: Date | string;
  logo?: string | null;
  projects?: {
    totalCount?: number;
  };
}

interface Props {
  /** Workspace details. */
  workspace: Partial<WorkspaceData>;
}

/**
 * Workspace list item.
 */
const WorkspaceListItem = ({ workspace }: Props) => {
  // Members are now managed via Gatekeeper IDP, not stored locally
  const AGGREGATES = [
    {
      type: "project",
      icon: HiOutlineFolder,
      value: workspace?.projects?.totalCount,
    },
  ];

  return (
    <Link
      to="/workspaces/$workspaceSlug"
      params={{ workspaceSlug: workspace.slug! }}
      role="group"
      className="group"
    >
      <div className="relative mx-auto flex h-36 w-full max-w-full cursor-pointer flex-col justify-between rounded-xl border border-neutral-200 bg-card p-4 transition-all group-hover:bg-neutral-100 dark:border-neutral-800 dark:group-hover:bg-neutral-800">
        <div className="flex items-start justify-between">
          <div className="flex max-w-[65svw] items-center gap-3">
            <AvatarRoot size="sm" className="shrink-0">
              <AvatarImage
                src={workspace.logo ?? undefined}
                alt={workspace.name}
              />
              <AvatarFallback className="font-semibold uppercase">
                {workspace.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </AvatarRoot>

            <div className="flex min-w-0 flex-col gap-1">
              <span className="break-words font-semibold text-[var(--colors-brand-primary-700)] group-hover:text-[var(--colors-brand-primary-800)] dark:group-hover:text-[var(--colors-brand-primary-600)]">
                {workspace.name}
              </span>

              {workspace.updatedAt && (
                <p className="text-muted-foreground text-sm">{`Updated ${dayjs(
                  workspace.updatedAt,
                ).fromNow()}`}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 justify-self-end">
          {AGGREGATES.map(({ icon: AggIcon, value = 0, type }) => (
            <div key={type} className="flex flex-wrap items-center gap-1">
              <AggIcon className="size-5 text-foreground-subtle" />

              <p className="text-foreground-subtle text-sm tabular-nums">
                {value} {setSingularOrPlural({ value, label: type })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default WorkspaceListItem;
