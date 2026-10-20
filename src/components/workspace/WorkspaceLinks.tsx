import Favicon from "@/components/core/Favicon";
import getDomainLabel from "@/lib/util/getDomainLabel";

import type { WorkspaceLink } from "@/lib/util/orgLinks";

interface Props {
  links: WorkspaceLink[];
}

/**
 * Workspace links (website, socials) shown on the public workspace page as
 * favicon + label chips. Receives public links only (filtered upstream).
 */
const WorkspaceLinks = ({ links }: Props) => {
  const visible = links.filter((link) => link.url);

  if (!visible.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 border-[var(--colors-neutral-200)] border-l pl-3 dark:border-[var(--colors-neutral-700)]">
      {visible.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground text-sm hover:bg-[var(--colors-neutral-100)] hover:text-foreground dark:hover:bg-[var(--colors-neutral-800)]"
        >
          <Favicon url={link.url} size={4} />
          <span className="max-w-[12rem] truncate">
            {link.title || getDomainLabel(link.url)}
          </span>
        </a>
      ))}
    </div>
  );
};

export default WorkspaceLinks;
