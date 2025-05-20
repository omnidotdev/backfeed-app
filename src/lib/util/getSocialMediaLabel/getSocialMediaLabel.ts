import { SOCIAL_MEDIA_ICONS } from "lib/constants";

/**
 * Get the label associated with a social media url.
 */
const getSocialMediaIcon = (url: string) => {
  const label = Object.entries(SOCIAL_MEDIA_ICONS).find(([key]) =>
    new RegExp(`\\b${key}\\b`, "i").test(url),
  )?.[1].label;

  return label ? label : undefined;
};

export default getSocialMediaIcon;
