"use client";

import { Icon } from "@omnidev/sigil";

import { getSocialMediaIcon } from "lib/util";

interface Props {
  /** URL to dynamically determine icon src. */
  url: string;
}

/**
 * Social media icon component. Dynamically determined based on the url provided.
 */
const SocialMediaIcon = ({ url }: Props) => (
  <Icon src={getSocialMediaIcon(url)} />
);

export default SocialMediaIcon;
