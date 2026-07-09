import cn from "@/lib/utils";

import type { OrgRole } from "@/lib/hooks/useOrgRoleMap";

/** Roles worth flagging on a card (members are the default, shown unbadged). */
const ROLE_LABELS: Partial<Record<OrgRole, string>> = {
  owner: "Owner",
  admin: "Admin",
};

interface Props {
  /** The author's org role, or undefined when unknown/not a member. */
  role?: OrgRole;
  className?: string;
}

/**
 * Small role badge shown beside an author's name on a card (e.g. "Admin"),
 * mirroring how GitHub flags maintainers. Renders nothing for members or unknown
 * roles so ordinary reporters stay unbadged.
 */
const RoleBadge = ({ role, className }: Props) => {
  const label = role ? ROLE_LABELS[role] : undefined;
  if (!label) return null;

  return (
    <span
      className={cn(
        "rounded-full border border-border-subtle bg-background-subtle px-1.5 py-0.5 font-medium text-[0.625rem] text-foreground-subtle leading-none",
        className,
      )}
    >
      {label}
    </span>
  );
};

export default RoleBadge;
