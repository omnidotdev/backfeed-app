import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const SOCIAL_MEDIA_ICONS = {
  "x.com": { icon: FaXTwitter, label: "Twitter" },
  "twitter.com": { icon: FaXTwitter, label: "Twitter" },
  "youtube.com": { icon: FaYoutube, label: "YouTube" },
  "youtu.be": { icon: FaYoutube, label: "YouTube" },
  "instagram.com": { icon: FaInstagram, label: "Instagram" },
  "facebook.com": { icon: FaFacebook, label: "Facebook" },
  "linkedin.com": { icon: FaLinkedin, label: "LinkedIn" },
  "github.com": { icon: FaGithub, label: "GitHub" },
  "discord.com": { icon: FaDiscord, label: "Discord" },
  "discord.gg": { icon: FaDiscord, label: "Discord" },
};

export default SOCIAL_MEDIA_ICONS;
