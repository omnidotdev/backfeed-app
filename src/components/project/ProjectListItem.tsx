import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import OverflowText from "@/components/core/OverflowText";
import { Button } from "@/components/ui/button";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

import type { Project } from "@/generated/graphql";

const projectsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/",
);

interface Props {
  /** Project details. */
  project: Partial<Project>;
  /** Workspace slug from organization context. */
  workspaceSlug: string;
}

/**
 * Project list item.
 */
const ProjectListItem = ({
  project: { slug, name, description, image, posts },
  workspaceSlug,
}: Props) => {
  const navigate = useNavigate();
  const { hasAdminPrivileges } = projectsRoute.useRouteContext();

  const AGGREGATES = [
    {
      type: "user",
      icon: HiOutlineUserGroup,
      value: posts?.aggregates?.distinctCount?.userId ?? 0,
    },
    {
      type: "response",
      icon: HiOutlineChatBubbleLeftRight,
      value: posts?.totalCount ?? 0,
    },
  ];

  return (
    <Link
      to="/workspaces/$workspaceSlug/projects/$projectSlug"
      params={{
        workspaceSlug,
        projectSlug: slug!,
      }}
      role="group"
      className="group"
    >
      <div className="relative mx-auto flex h-40 w-full max-w-full cursor-pointer flex-col justify-between rounded-xl border border-neutral-200 bg-card p-4 transition-all group-hover:bg-neutral-100 dark:border-neutral-800 dark:group-hover:bg-neutral-800">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex max-w-[65svw] items-center gap-2.5">
              {image && (
                <img
                  src={image}
                  alt=""
                  className="size-8 shrink-0 rounded-lg border border-border-subtle object-cover"
                />
              )}

              <OverflowText className="whitespace-nowrap font-semibold text-[var(--colors-primary-text)] group-hover:text-[var(--colors-primary-emphasized)]">
                {name}
              </OverflowText>
            </div>

            {hasAdminPrivileges && (
              <div className="absolute top-0 right-0 m-2">
                <Button
                  variant="ghost"
                  className="px-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate({
                      to: "/workspaces/$workspaceSlug/projects/$projectSlug/settings",
                      params: { workspaceSlug, projectSlug: slug! },
                    });
                  }}
                >
                  <LuSettings className="size-5 text-foreground-muted" />
                </Button>
              </div>
            )}
          </div>

          <OverflowText className="max-w-xl whitespace-nowrap text-foreground-subtle">
            {description}
          </OverflowText>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 justify-self-end">
          {AGGREGATES.map(({ icon: AggIcon, value, type }) => (
            <div key={type} className="flex flex-wrap items-center gap-1">
              <AggIcon className="size-5 text-foreground-subtle" />

              <span className="text-foreground-subtle text-sm tabular-nums">
                {value} {setSingularOrPlural({ value: +value, label: type })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectListItem;
