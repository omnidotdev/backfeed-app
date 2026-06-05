import { Portal } from "@ark-ui/react/portal";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { LuEllipsis } from "react-icons/lu";

import Favicon from "@/components/core/Favicon";
import Tooltip from "@/components/core/Tooltip";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { projectOptions } from "@/lib/options/projects";
import getDomainLabel from "@/lib/util/getDomainLabel";

const projectRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
);

/**
 * Project links component. Displays project links with auto-fetched favicons.
 */
const ProjectLinks = () => {
  const { organizationId } = projectRoute.useRouteContext();
  const { projectSlug } = projectRoute.useParams();

  const { data: project } = useQuery({
    ...projectOptions({ organizationId, projectSlug }),
    select: (data) => data.projects?.nodes?.[0],
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get links from projectLinks, sorted by order
  const allLinks = (project?.projectLinks?.nodes ?? [])
    .filter((link) => link?.url)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((link) => ({
      url: link?.url ?? "",
      rowId: link?.rowId ?? "",
    }));

  const visibleLinks = allLinks.slice(0, 3);
  const overflowLinks = allLinks.slice(3);

  if (!allLinks.length) return null;

  return (
    <div className="ml-1 flex items-center gap-0.5 border-[var(--colors-neutral-200)] border-l pl-3 dark:border-[var(--colors-neutral-700)]">
      {visibleLinks.map((link) => (
        <Tooltip
          key={link.rowId}
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
          {getDomainLabel(link.url)}
        </Tooltip>
      ))}

      {!!overflowLinks.length && (
        <MenuRoot
          open={isMenuOpen}
          onOpenChange={({ open }) => setIsMenuOpen(open)}
          positioning={{ gutter: -4, shift: 8 }}
        >
          <MenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-auto min-w-0 p-1.5 text-muted-foreground hover:bg-[var(--colors-neutral-100)] hover:text-foreground dark:hover:bg-[var(--colors-neutral-800)]"
            >
              <LuEllipsis className="size-4" />
            </Button>
          </MenuTrigger>

          <Portal>
            <MenuPositioner>
              <MenuContent>
                <MenuItemGroup>
                  {overflowLinks.map((link) => (
                    <MenuItem key={link.rowId} value={link.url} asChild>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 no-underline"
                      >
                        <Favicon url={link.url} size={4} />
                        <span className="text-foreground-subtle">
                          {getDomainLabel(link.url)}
                        </span>
                      </a>
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </MenuContent>
            </MenuPositioner>
          </Portal>
        </MenuRoot>
      )}
    </div>
  );
};

export default ProjectLinks;
