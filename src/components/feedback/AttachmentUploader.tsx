import { useEffect, useRef, useState } from "react";
import {
  LuLoaderCircle,
  LuPaperclip,
  LuPlay,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  ACCEPT_STRING,
  MAX_ATTACHMENTS,
  formatBytes,
  validateFile,
} from "@/lib/media/mediaConfig";
import {
  measureImageDimensions,
  uploadAttachment,
} from "@/lib/media/uploadAttachment";
import toaster from "@/lib/util/toaster";
import cn from "@/lib/utils";

import type { AttachmentUploadResult } from "@/lib/media/uploadAttachment";

/** A successfully uploaded attachment, ready to be linked to a post */
export interface UploadedAttachment extends AttachmentUploadResult {
  width?: number;
  height?: number;
}

type UploadItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: "uploading" | "done" | "error";
  result?: UploadedAttachment;
  error?: string;
};

interface AttachmentUploaderProps {
  /** Called with the current set of successfully uploaded attachments */
  onAttachmentsChange: (attachments: UploadedAttachment[]) => void;
  /** Called when the in-flight upload state changes */
  onUploadingChange?: (uploading: boolean) => void;
  disabled?: boolean;
}

/**
 * Attachment uploader.
 *
 * Lets the user attach images and videos to a feedback post. Files upload
 * immediately on selection (with live previews); the parent receives the
 * resulting metadata to persist alongside the post. Remount (via `key`) to
 * clear all selections.
 */
const AttachmentUploader = ({
  onAttachmentsChange,
  onUploadingChange,
  disabled,
}: AttachmentUploaderProps) => {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep a ref for unmount cleanup of object URLs
  const itemsRef = useRef<UploadItem[]>(items);
  itemsRef.current = items;

  useEffect(
    () => () => {
      for (const item of itemsRef.current) URL.revokeObjectURL(item.previewUrl);
    },
    [],
  );

  // Notify the parent whenever the upload set changes
  useEffect(() => {
    onAttachmentsChange(
      items
        .filter((item) => item.status === "done" && item.result)
        .map((item) => item.result as UploadedAttachment),
    );
    onUploadingChange?.(items.some((item) => item.status === "uploading"));
  }, [items, onAttachmentsChange, onUploadingChange]);

  const uploadOne = async (id: string, file: File) => {
    try {
      const [result, dimensions] = await Promise.all([
        uploadAttachment(file),
        measureImageDimensions(file),
      ]);

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "done",
                result: { ...result, ...(dimensions ?? {}) },
              }
            : item,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "error", error: message } : item,
        ),
      );

      toaster.error({ title: "Upload failed", description: message });
    }
  };

  const addFiles = (files: File[]) => {
    if (disabled || !files.length) return;

    const remaining = MAX_ATTACHMENTS - items.length;
    if (remaining <= 0) {
      toaster.error({
        title: `You can attach up to ${MAX_ATTACHMENTS} files`,
      });
      return;
    }

    if (files.length > remaining) {
      toaster.error({
        title: `Only ${MAX_ATTACHMENTS} attachments allowed`,
        description: `Adding the first ${remaining}.`,
      });
    }

    for (const file of files.slice(0, remaining)) {
      const validation = validateFile(file);
      if ("error" in validation) {
        toaster.error({ title: "Invalid file", description: validation.error });
        continue;
      }

      const id = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);

      setItems((prev) => [
        ...prev,
        { id, file, previewUrl, status: "uploading" },
      ]);
      void uploadOne(id, file);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const atLimit = items.length >= MAX_ATTACHMENTS;

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_STRING}
        multiple
        className="hidden"
        onChange={(event) => {
          addFiles(Array.from(event.target.files ?? []));
          // allow re-selecting the same file
          event.target.value = "";
        }}
      />

      {/* biome-ignore lint/a11y/noStaticElementInteractions: drag-and-drop affordance with an equivalent button control */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-md border border-border-subtle border-dashed px-3 py-2 transition-colors",
          isDragging && "border-primary bg-primary/5",
          disabled && "opacity-60",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          addFiles(Array.from(event.dataTransfer.files ?? []));
        }}
      >
        <span className="text-foreground-subtle text-xs">
          Drag & drop or attach images and videos
        </span>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled || atLimit}
          onClick={() => inputRef.current?.click()}
        >
          <LuPaperclip className="size-4" />
          Attach
        </Button>
      </div>

      {!!items.length && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-md border border-border-subtle bg-background-subtle",
                item.status === "error" && "border-destructive",
              )}
            >
              {item.file.type.startsWith("image/") ? (
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="size-full object-cover"
                />
              ) : (
                <>
                  <video
                    src={item.previewUrl}
                    className="size-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <LuPlay className="size-6 text-white drop-shadow" />
                  </div>
                </>
              )}

              {item.status === "uploading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <LuLoaderCircle className="size-5 animate-spin text-white" />
                </div>
              )}

              {item.status === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-destructive/20 p-1 text-center">
                  <LuTriangleAlert className="size-4 text-destructive" />
                  <span className="line-clamp-2 text-[10px] text-destructive">
                    Failed
                  </span>
                </div>
              )}

              {item.status === "done" && item.result?.fileSize != null && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 px-1 py-0.5 text-[10px] text-white">
                  {formatBytes(item.result.fileSize)}
                </span>
              )}

              <button
                type="button"
                aria-label={`Remove ${item.file.name}`}
                onClick={() => removeItem(item.id)}
                className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
              >
                <LuX className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentUploader;
