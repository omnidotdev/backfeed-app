"use client";

import { Icon } from "@omnidev/sigil";

import { getSocialMediaIcon } from "lib/util";

import type { IconProps } from "@omnidev/sigil";

interface Props extends Omit<IconProps, "src"> {
  /** URL to dynamically determine icon source. */
  url: string;
}

/**
 * Social media icon, dynamically determined based on the provided URL.
 */
const SocialMediaIcon = ({ url, ...rest }: Props) => (
  <Icon src={getSocialMediaIcon(url)} {...rest} />
);

export default SocialMediaIcon;
