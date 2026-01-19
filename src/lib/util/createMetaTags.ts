import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";

// TODO JSDoc
interface Params {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
}

// TODO improve type safety

/**
 * Create meta tags.
 */
const createMetaTags = ({
  title: _title,
  description: _description,
  url: _url,
  keywords,
  image,
}: Params = {}) => {
  const title = _title ? `${_title} | ${app.name}` : app.name,
    description = _description ?? app.description,
    url = _url ?? BASE_URL;

  const tags = [
    { title: title },
    {
      name: "description",
      content: description,
    },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    { name: "twitter:creator", content: "@omnidotdev" },
    { name: "twitter:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: description,
    },
    { property: "og:url", content: url },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: image },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]
      : [
          { name: "twitter:image", content: `${BASE_URL}/og.png` },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: `${BASE_URL}/og.png` },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]),
  ];

  return tags;
};

export default createMetaTags;
