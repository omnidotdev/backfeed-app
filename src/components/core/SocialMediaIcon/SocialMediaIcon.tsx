"use client";

import { Icon } from "@omnidev/sigil";

import { getSocialMediaIcon } from "lib/util";

const SocialMediaIcon = ({ url }: { url: string }) => (
  <Icon src={getSocialMediaIcon(url)} />
);

export default SocialMediaIcon;
