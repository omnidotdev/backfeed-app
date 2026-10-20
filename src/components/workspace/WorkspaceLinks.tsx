import Favicon from "@/components/core/Favicon";
import Tooltip from "@/components/core/Tooltip";
import getDomainLabel from "@/lib/util/getDomainLabel";

import type { WorkspaceLink } from "@/lib/util/orgLinks";

interface Props {
  links: WorkspaceLink[];
}

/**
 * Workspace links (website, socials, etc.), shown on the public workspace page
 * as favicon badges. Read from the Gatekeeper organization, the shared source of
 * truth across every Omni product.
 */
const WorkspaceLinks = ({ links }: Props) => {
  const visible = links.filter((link) => link.url);

  if (!visible.length) return null;

  return (
    <div className="flex shrink-0 items-center gap-0.5 border-[var(--colors-neutral-200)] border-l pl-3 dark:border-[var(--colors-neutral-700)]">
      {visible.map((link) => (
        <Tooltip
          key={link.url}
          trigger={
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 text-muted-foreground hover:bg-[var(--colors-neutral-100)] hover:text-foreground dark:hover:bg-[var(--colors-neutral-800)]"
            >
              <Favicon url={link.url} size={4} />
            </a>
          }
        >
          {link.title || getDomainLabel(link.url)}
        </Tooltip>
      ))}
    </div>
  );
};

export default WorkspaceLinks;
