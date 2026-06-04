import dayjs from "dayjs";
import { HiOutlineFolder } from "react-icons/hi2";

import StatusBadge from "@/components/core/StatusBadge";
import cn from "@/lib/utils";

import type { Post } from "@/generated/graphql";

interface Props {
  /** Feedback details. */
  feedback: Partial<Post>;
  /** Additional class names. */
  className?: string;
}

/**
 * Recent feedback response.
 */
const Response = ({ feedback, className }: Props) => {
  const date = dayjs(feedback?.createdAt).utc().fromNow();

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="line-clamp-1 flex-1 font-medium text-sm">
          {feedback?.title}
        </p>

        <StatusBadge status={feedback?.statusTemplate!} />
      </div>

      <div className="flex items-center gap-3 text-foreground-subtle text-xs">
        <div className="flex items-center gap-1">
          <HiOutlineFolder className="size-3.5" />
          <p className="line-clamp-1">{feedback.project?.name}</p>
        </div>

        <p className="text-muted-foreground">·</p>

        <p>{date}</p>
      </div>
    </div>
  );
};

export default Response;
