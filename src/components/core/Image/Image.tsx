"use client";

import { sigil } from "@omnidev/sigil";
import NextImage from "next/image";

/**
 * Sigil-enhanced Next.js Image.
 */
const Image = sigil(
  NextImage,
  {},
  { shouldForwardProp: (prop) => ["width", "height"].includes(prop) }
);

export default Image;
