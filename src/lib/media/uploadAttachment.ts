import { API_BASE_URL } from "@/lib/config/env.config";
import { fetchSession } from "@/server/functions/auth";

import type { MediaKind } from "./mediaConfig";

/** Metadata returned by the attachment upload route */
export interface AttachmentUploadResult {
  /** Public URL to the stored object */
  url: string;
  /** Storage key (path within the bucket) */
  storageKey: string;
  /** MIME type */
  mimeType: string;
  /** File size in bytes */
  fileSize: number;
  /** Resolved media kind */
  kind: MediaKind;
  /** Inline base64 blur-up placeholder, present for images */
  lqip?: string;
}

/**
 * Upload a single file to the attachment upload route. Bytes are streamed to
 * object storage; the returned metadata is later persisted via the
 * `createAttachment` GraphQL mutation, linked to a post.
 */
export const uploadAttachment = async (
  file: File,
): Promise<AttachmentUploadResult> => {
  const { session } = await fetchSession();
  const accessToken = session?.accessToken;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/attachments/upload`, {
    method: "POST",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    body: formData,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? `Upload failed (${response.status})`);
  }

  return response.json() as Promise<AttachmentUploadResult>;
};

/**
 * Best-effort intrinsic dimensions of an image file, measured client-side to
 * avoid layout shift on display. Resolves to null for non-images or on error.
 */
export const measureImageDimensions = (
  file: File,
): Promise<{ width: number; height: number } | null> =>
  new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(null);
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    image.src = url;
  });
