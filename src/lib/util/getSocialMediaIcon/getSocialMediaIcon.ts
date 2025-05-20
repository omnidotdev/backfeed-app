import { HiOutlineLink } from "react-icons/hi2";

import { SOCIAL_MEDIA_ICONS } from "lib/constants";

const getSocialMediaIcon = (url: string) => {
  const icon = Object.entries(SOCIAL_MEDIA_ICONS).find(([key]) =>
    new RegExp(`\\b${key}\\b`).test(url),
  )?.[1];

  return icon ? icon : HiOutlineLink;
};

export default getSocialMediaIcon;
