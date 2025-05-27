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
import { useState } from "react";
import { FaGlobe } from "react-icons/fa6";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              p={2}
              opacity={{ _hover: 0.8 }}
            >
              <Icon src={FaGlobe} h={4} w={4} />
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
              p={2}
              opacity={{ _hover: 0.8 }}
            >
              <SocialMediaIcon url={firstSocial.url} h={4} w={4} />
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
          {getSocialMediaLabel(firstSocial.url)}
        </Tooltip>
      )}

      {!!remainingSocials.length && (
        <Menu
          open={isMenuOpen}
          onOpenChange={({ open }) => setIsMenuOpen(open)}
          trigger={
            <Button
              variant="icon"
              bgColor="transparent"
              color="foreground.default"
              opacity={{ _hover: 0.8 }}
              _focusVisible={{ outlineColor: "transparent" }}
            >
              <Icon src={HiDotsHorizontal} h={4} w={4} />
            </Button>
          }
          positioning={{ gutter: -4, shift: 8 }}
        >
          <MenuItemGroup>
            {remainingSocials.map((social) => (
              <MenuItem key={social?.rowId} value={social?.url!} asChild>
                <Link href={social?.url} isExternal p={2} textDecoration="none">
                  <SocialMediaIcon url={social?.url!} h={4} w={4} />

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
