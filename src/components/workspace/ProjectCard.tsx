import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import OverflowText from "@/components/core/OverflowText";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { IconType } from "react-icons";
import type { Project } from "@/generated/graphql";

interface ProjectMetric {
  /** Visual icon. */
  icon: IconType;
  /** Metric value. */
  value: number | undefined;
  /** Metric type. */
  type: "response" | "user";
}

interface Props extends ComponentProps<"div"> {
  /** Project details. */
  project: Partial<Project>;
}

/**
 * Project, nested within a workspace. A project outlines an application or other kind of product or service that aggregates and contains scoped feedback.
 */
const ProjectCard = ({ project, className, ...rest }: Props) => {
  const PROJECT_METRICS: ProjectMetric[] = [
    {
      icon: HiOutlineChatBubbleLeftRight,
      value: project?.posts?.totalCount,
      type: "response",
    },
    {
      icon: HiOutlineUserGroup,
      value: Number(project?.posts?.aggregates?.distinctCount?.userId),
      type: "user",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex cursor-pointer flex-col rounded-xl border border-neutral-200 bg-card p-8 transition-all group-hover:bg-neutral-100 dark:border-neutral-800 dark:group-hover:bg-neutral-800",
        className,
      )}
      {...rest}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="flex min-h-16 flex-col gap-2 md:min-h-24">
          <OverflowText className="line-clamp-2 font-semibold text-base leading-[1.2] lg:text-lg">
            {project?.name}
          </OverflowText>

          <OverflowText className="line-clamp-2 text-foreground-subtle text-xs lg:text-sm">
            {project?.description}
          </OverflowText>
        </div>

        <div className="grid w-full grid-cols-2 items-start">
          {PROJECT_METRICS.map(({ icon: MetricIcon, value, type }) => (
            <div key={type} className="flex flex-wrap items-center gap-2">
              <MetricIcon className="size-5 text-foreground-subtle" />

              <div className="flex flex-wrap gap-1 text-foreground-subtle text-sm">
                <span>{value ?? 0}</span>

                <span className="hidden sm:inline">
                  {setSingularOrPlural({ value: value ?? 0, label: type })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
