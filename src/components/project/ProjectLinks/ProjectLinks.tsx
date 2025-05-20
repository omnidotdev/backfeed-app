"use client";

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
import { BiWorld } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";

import { SocialMediaIcon } from "components/core";
import { getSocialMediaLabel } from "lib/util";

import type { ProjectFragment } from "generated/graphql";

interface Props {
  /** Project. */
  project: ProjectFragment;
}

/**
 * Project links component.
 */
const ProjectLinks = ({ project }: Props) => {
  const firstSocial = project?.projectSocials?.nodes?.[0];
  const remainingSocials = project?.projectSocials?.nodes?.slice(1);

  return (
    <HStack gap={1}>
      {project.website && (
        <Tooltip
          hasArrow={false}
          trigger={
            <Link
              href={project.website}
              isExternal
              color="foreground.default"
              fontSize="xl"
              p={2}
            >
              <Icon src={BiWorld} h={5} w={5} />
            </Link>
          }
          triggerProps={{
            style: { all: "unset" },
          }}
          contentProps={{
            zIndex: "foreground",
            fontSize: "sm",
          }}
        >
          Website
        </Tooltip>
      )}

      {firstSocial && (
        <Tooltip
          hasArrow={false}
          trigger={
            <Link
              href={firstSocial.url}
              isExternal
              color="foreground.default"
              fontSize="xl"
              p={2}
            >
              <SocialMediaIcon url={firstSocial.url} h={5} w={5} />
            </Link>
          }
          triggerProps={{
            style: { all: "unset" },
          }}
          contentProps={{
            zIndex: "foreground",
            fontSize: "sm",
            display: getSocialMediaLabel(firstSocial.url) ? undefined : "none",
          }}
        >
          {getSocialMediaLabel(firstSocial.url)}
        </Tooltip>
      )}

      {!!remainingSocials.length && (
        <Menu
          trigger={
            <Button
              variant="icon"
              bgColor="transparent"
              color="foreground.default"
            >
              <Icon src={HiDotsHorizontal} />
            </Button>
          }
        >
          <MenuItemGroup>
            {remainingSocials.map((social) => (
              <MenuItem key={social?.rowId} value={social?.url!} asChild>
                <Link href={social?.url} isExternal p={2} textDecoration="none">
                  <SocialMediaIcon url={social?.url!} h={5} w={5} />

                  <Text color="foreground.subtle">
                    {getSocialMediaLabel(social?.url!)}
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
