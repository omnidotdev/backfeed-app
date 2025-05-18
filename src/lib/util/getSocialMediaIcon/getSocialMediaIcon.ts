import { BiWorld } from "react-icons/bi";

import { SOCIAL_MEDIA_ICONS } from "lib/constants";

const getSocialMediaIcon = (url: string) => {
  const icon = Object.entries(SOCIAL_MEDIA_ICONS).find(([key]) =>
    url.includes(`https://${key}`),
  )?.[1];

  return icon ? icon : BiWorld;
};

export default getSocialMediaIcon;
