import { buildFallbackUrl, buildSrcset } from "@/lib/media/image-utils";

import type { CSSProperties } from "react";

export type ImageProps = {
  /** Attachment URL (`attachment.url`); the API serves resized derivatives. */
  src: string;
  /** Required alt text. Pass an empty string for purely decorative images. */
  alt: string;
  /**
   * Standard HTML `sizes` describing how wide the image renders at each
   * breakpoint, so the browser can pick the right `srcset` candidate.
   */
  sizes: string;
  /** Inline base64 LQIP (`attachment.lqip`) shown blurred until decode. */
  lqip?: string | null;
  /** Classes for the wrapper, which sizes the slot (e.g. `size-full`). */
  className?: string;
  /** Classes for the inner `<img>` itself. */
  imgClassName?: string;
  /** `object-position` for both the image and its LQIP (focal point). */
  objectPosition?: string;
  /** Eager-load + high fetch priority for above-the-fold images. */
  priority?: boolean;
  /** Extra inline styles for the wrapper. */
  style?: CSSProperties;
};

/**
 * Responsive, blur-up image for attachment media. The browser downloads a
 * right-sized derivative via `srcset`; until it decodes, a smoothly blurred
 * LQIP sits *behind* the image and the real bytes paint over it.
 *
 * The placeholder is a static CSS layer (no opacity state or load handler), so
 * there is no hydration-time fade: a cached image shows instantly and a loading
 * one reveals cleanly over the blur, with no flash.
 */
export function Image({
  src,
  alt,
  sizes,
  lqip,
  className,
  imgClassName,
  objectPosition,
  priority,
  style,
}: ImageProps) {
  const position = objectPosition ?? "center";

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {lqip ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${lqip})`,
            backgroundSize: "cover",
            backgroundPosition: position,
            // Blur + slight overscale smooths the tiny LQIP and hides its edges
            filter: "blur(16px)",
            transform: "scale(1.1)",
          }}
        />
      ) : null}
      <img
        src={buildFallbackUrl(src)}
        srcSet={buildSrcset(src)}
        sizes={sizes}
        alt={alt}
        className={imgClassName}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
        }}
      />
    </div>
  );
}
