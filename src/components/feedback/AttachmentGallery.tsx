import { useEffect, useState } from "react";
import { LuPlay, LuX } from "react-icons/lu";

import cn from "@/lib/utils";

import type { AttachmentFragment } from "@/generated/graphql";

interface AttachmentGalleryProps {
  attachments: AttachmentFragment[];
  /** Compact mode for list views (smaller, fixed thumbnails) */
  compact?: boolean;
  className?: string;
}

/**
 * Attachment gallery.
 *
 * Renders a post's image and video attachments. In compact mode (list views)
 * everything is shown as square thumbnails; in full mode (detail view) images
 * open in a lightbox and videos play inline.
 */
const AttachmentGallery = ({
  attachments,
  compact,
  className,
}: AttachmentGalleryProps) => {
  const [lightbox, setLightbox] = useState<AttachmentFragment | null>(null);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  if (!attachments.length) return null;

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: stops card navigation; children are the interactive controls */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: click only stops propagation, no keyboard semantics needed */}
      <div
        className={cn(
          "mt-2 grid gap-2",
          compact ? "grid-cols-4 sm:grid-cols-6" : "grid-cols-2 sm:grid-cols-3",
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {attachments.map((attachment) => (
          <div
            key={attachment.rowId}
            className="aspect-square overflow-hidden rounded-md border border-border-subtle bg-background-subtle"
          >
            {attachment.kind === "image" ? (
              <button
                type="button"
                className="block size-full"
                onClick={() => {
                  if (!compact) setLightbox(attachment);
                }}
              >
                <img
                  src={attachment.url}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
              </button>
            ) : compact ? (
              <div className="relative size-full">
                <video
                  src={attachment.url}
                  className="size-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <LuPlay className="size-6 text-white drop-shadow" />
                </div>
              </div>
            ) : (
              // biome-ignore lint/a11y/useMediaCaption: user-provided media, no captions available
              <video
                src={attachment.url}
                className="size-full bg-black object-contain"
                controls
                preload="metadata"
              />
            )}
          </div>
        ))}
      </div>

      {lightbox && (
        // biome-ignore lint/a11y/noStaticElementInteractions: dismissable lightbox backdrop; Escape key handled globally
        // biome-ignore lint/a11y/useKeyWithClickEvents: Escape key dismissal handled via window listener
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.url}
            alt=""
            className="max-h-full max-w-full rounded-md object-contain"
          />

          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            onClick={() => setLightbox(null)}
          >
            <LuX className="size-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default AttachmentGallery;
