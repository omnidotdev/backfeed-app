"use client";

import { Icon } from "@omnidev/sigil";

import { getSocialMediaIcon } from "lib/util";

import type { IconProps } from "@omnidev/sigil";

interface Props extends Omit<IconProps, "src"> {
  /** URL to dynamically determine icon src. */
  url: string;
}

/**
 * Social media icon component. Dynamically determined based on the url provided.
 */
const SocialMediaIcon = ({ url, ...rest }: Props) => (
  <Icon src={getSocialMediaIcon(url)} {...rest} />
);

export default SocialMediaIcon;
