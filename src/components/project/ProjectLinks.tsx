import {
  Button,
  HStack,
  Icon,
  Link,
  Menu,
  MenuItem,
  MenuItemGroup,
  Text,
  Tooltip,
} from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { LuEllipsis } from "react-icons/lu";

import Favicon from "@/components/core/Favicon";
import { projectOptions } from "@/lib/options/projects";
import getDomainLabel from "@/lib/util/getDomainLabel";

const projectRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
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
    <HStack
      gap={0.5}
      pl={3}
      ml={1}
      borderLeftWidth="1px"
      borderColor={{ base: "neutral.200", _dark: "neutral.700" }}
    >
      {visibleLinks.map((link) => (
        <Tooltip
          key={link.rowId}
          hasArrow={false}
          trigger={
            <Link
              href={link.url}
              isExternal
              color="foreground.muted"
              p={1.5}
              borderRadius="md"
              _hover={{
                color: "foreground.default",
                bgColor: { base: "neutral.100", _dark: "neutral.800" },
              }}
            >
              <Favicon url={link.url} size={4} />
            </Link>
          }
          triggerProps={{
            style: { all: "unset" },
          }}
          contentProps={{
            zIndex: "foreground",
            fontSize: "sm",
            display: isMenuOpen ? "none" : undefined,
          }}
        >
          {getDomainLabel(link.url)}
        </Tooltip>
      ))}

      {!!overflowLinks.length && (
        <Menu
          open={isMenuOpen}
          onOpenChange={({ open }) => setIsMenuOpen(open)}
          trigger={
            <Button
              variant="ghost"
              size="xs"
              p={1.5}
              minW="auto"
              h="auto"
              color="foreground.muted"
              _hover={{
                color: "foreground.default",
                bgColor: { base: "neutral.100", _dark: "neutral.800" },
              }}
            >
              <Icon src={LuEllipsis} h={4} w={4} />
            </Button>
          }
          positioning={{ gutter: -4, shift: 8 }}
        >
          <MenuItemGroup>
            {overflowLinks.map((link) => (
              <MenuItem key={link.rowId} value={link.url} asChild>
                <Link href={link.url} isExternal p={2} textDecoration="none">
                  <Favicon url={link.url} size={4} />
                  <Text color="foreground.subtle">
                    {getDomainLabel(link.url)}
                  </Text>
                </Link>
              </MenuItem>
            ))}
          </MenuItemGroup>
        </Menu>
      )}
    </HStack>
  );
};

export default ProjectLinks;
