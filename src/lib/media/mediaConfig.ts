/**
 * Attachment media configuration (client advisory checks).
 *
 * Mirrors the server-authoritative config in backfeed-api's
 * `lib/media/mediaConfig.ts`. These checks give fast feedback before upload;
 * the API performs the same validation authoritatively.
 */

/** High-level media kind for an attachment */
export type MediaKind = "image" | "video";

/** Bytes in a megabyte */
const MB = 1024 * 1024;

/** Per-kind limits and the MIME types they accept */
export const ATTACHMENT_LIMITS: Record<
  MediaKind,
  { maxBytes: number; mimeTypes: readonly string[] }
> = {
  image: {
    maxBytes: 20 * MB,
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
    ],
  },
  video: {
    maxBytes: 50 * MB,
    mimeTypes: ["video/mp4", "video/webm", "video/quicktime"],
  },
};

/** Maximum number of attachments per post */
export const MAX_ATTACHMENTS = 6;

/** Value for an `<input type="file" accept>` attribute */
export const ACCEPT_STRING = [
  ...ATTACHMENT_LIMITS.image.mimeTypes,
  ...ATTACHMENT_LIMITS.video.mimeTypes,
].join(",");

/** Resolve the media kind for a MIME type, or null if unsupported */
export const kindFromMimeType = (mimeType: string): MediaKind | null => {
  if (ATTACHMENT_LIMITS.image.mimeTypes.includes(mimeType)) return "image";
  if (ATTACHMENT_LIMITS.video.mimeTypes.includes(mimeType)) return "video";
  return null;
};

/** Human-readable byte size (e.g. "3.2 MB") */
export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < MB) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / MB).toFixed(1)} MB`;
};

/**
 * Validate a candidate file. Returns the resolved kind on success, or an error
 * message describing why the file is rejected.
 */
export const validateFile = (
  file: File,
): { kind: MediaKind } | { error: string } => {
  const kind = kindFromMimeType(file.type);
  if (!kind) return { error: `${file.name}: unsupported file type` };

  const { maxBytes } = ATTACHMENT_LIMITS[kind];
  if (file.size > maxBytes) {
    return {
      error: `${file.name}: exceeds the ${Math.round(maxBytes / MB)}MB ${kind} limit`,
    };
  }

  return { kind };
};
