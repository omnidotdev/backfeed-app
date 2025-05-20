import { HiOutlineLink } from "react-icons/hi2";

import { SOCIAL_MEDIA_ICONS } from "lib/constants";

/**
 * Get the icon associated with a social media url.
 */
const getSocialMediaIcon = (url: string) => {
  const icon = Object.entries(SOCIAL_MEDIA_ICONS).find(([key]) =>
    new RegExp(`\\b${key}\\b`, "i").test(url),
  )?.[1].icon;

  return icon ? icon : HiOutlineLink;
};

export default getSocialMediaIcon;
