import SOCIAL_MEDIA_ICONS from "@/lib/constants/socialMediaIcons.constant";

/**
 * Get the label associated with a social media URL.
 */
const getSocialMediaIcon = (url: string) => {
  const label = Object.entries(SOCIAL_MEDIA_ICONS).find(([key]) =>
    new RegExp(`\\b${key}\\b`, "i").test(url),
  )?.[1].label;

  const getApexDomain = () => {
    const regex =
      // biome-ignore lint: do not override regex
      /^(?:https?:\/\/)?(?:www\.)?([^\/:]+?\.(?:[a-z]{2,}(?:\.[a-z]{2})?|com|org|net))(?:\/.*)?$/i;
    const match = url.match(regex);

    return match ? match[1] : "Unknown URL";
  };

  return label ? label : getApexDomain();
};

export default getSocialMediaIcon;
