/**
 * Extract a human-readable label from a URL's domain.
 * For example: "https://github.com/org/repo" -> "GitHub"
 *
 * @param url - The URL to extract domain from
 * @returns Human-readable domain label or the hostname
 */
const getDomainLabel = (url: string): string => {
  if (!url) return "";

  try {
    const { hostname } = new URL(url);

    // Known domain mappings for nicer labels
    const domainLabels: Record<string, string> = {
      "github.com": "GitHub",
      "twitter.com": "Twitter",
      "x.com": "X",
      "youtube.com": "YouTube",
      "youtu.be": "YouTube",
      "instagram.com": "Instagram",
      "facebook.com": "Facebook",
      "linkedin.com": "LinkedIn",
      "discord.com": "Discord",
      "discord.gg": "Discord",
      "tiktok.com": "TikTok",
      "reddit.com": "Reddit",
      "medium.com": "Medium",
      "dev.to": "Dev.to",
      "dribbble.com": "Dribbble",
      "behance.net": "Behance",
      "figma.com": "Figma",
      "notion.so": "Notion",
      "producthunt.com": "Product Hunt",
    };

    // Check for known domains (with or without www.)
    const cleanHostname = hostname.replace(/^www\./, "");
    if (domainLabels[cleanHostname]) {
      return domainLabels[cleanHostname];
    }

    // Fall back to cleaned hostname
    return cleanHostname;
  } catch {
    return url;
  }
};

export default getDomainLabel;
