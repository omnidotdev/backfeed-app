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
 * LQIP sits *behind* the image and the real bytes cross-fade in over it.
 *
 * The fade is driven by real per-image load state, not a hydration flip: a
 * cached image (or one decoded before hydration) shows instantly with the
 * transition suppressed, so a page of cached images never mass-fades at once;
 * only a genuinely-loading image cross-fades smoothly over its blur.
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
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      ) : null}
      <img
        ref={(img) => {
          // Cached / already-decoded images show instantly with no fade (so a
          // page of cached images never mass-fades = the "epileptic" flash);
          // only genuinely-loading images keep the transition and cross-fade in.
          if (img?.complete && img.naturalWidth > 0) {
            img.style.transition = "none";
            img.style.opacity = "1";
          }
        }}
        onLoad={(event) => {
          event.currentTarget.style.opacity = "1";
        }}
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
          // Cross-fade in over the blurred LQIP as the bytes decode; start
          // hidden only when there is an LQIP to reveal over
          opacity: lqip ? 0 : 1,
          transition: "opacity 500ms ease",
        }}
      />
    </div>
  );
}
