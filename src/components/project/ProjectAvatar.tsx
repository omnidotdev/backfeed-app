import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { LuImagePlus, LuTrash2 } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { useUpdateProjectMutation } from "@/generated/graphql";
import { ATTACHMENT_LIMITS, validateFile } from "@/lib/media/mediaConfig";
import { uploadAttachment } from "@/lib/media/uploadAttachment";
import toaster from "@/lib/util/toaster";

interface Props {
  /** Project rowId whose avatar is being edited. */
  projectId: string;
  /** Project name, used for the fallback initial. */
  name: string;
  /** Current avatar URL, if any. */
  image?: string | null;
}

/**
 * Project avatar editor. Uploads an image to object storage (reusing the
 * attachment upload route) and persists the resulting URL to `project.image`,
 * saving immediately rather than waiting for the details form submit.
 */
const ProjectAvatar = ({ projectId, name, image }: Props) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isBusy, setIsBusy] = useState(false);

  const { mutateAsync: updateProject } = useUpdateProjectMutation();

  const persist = async (nextImage: string | null) => {
    await updateProject({ rowId: projectId, patch: { image: nextImage } });
    await queryClient.invalidateQueries({ queryKey: ["Project"] });
    await queryClient.invalidateQueries({ queryKey: ["Projects"] });
  };

  const onSelectFile = async (file: File) => {
    const result = validateFile(file);
    if ("error" in result) {
      toaster.error({ title: result.error });
      return;
    }
    if (result.kind !== "image") {
      toaster.error({ title: "Please choose an image file" });
      return;
    }

    setIsBusy(true);
    try {
      const { url } = await uploadAttachment(file);
      await persist(url);
      toaster.success({ title: "Avatar updated" });
    } catch {
      toaster.error({ title: "Could not upload avatar" });
    } finally {
      setIsBusy(false);
    }
  };

  const onRemove = async () => {
    setIsBusy(true);
    try {
      await persist(null);
      toaster.success({ title: "Avatar removed" });
    } catch {
      toaster.error({ title: "Could not remove avatar" });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-subtle bg-background-subtle">
        {image ? (
          <img src={image} alt="" className="size-full object-cover" />
        ) : (
          <span className="font-semibold text-2xl text-foreground-subtle">
            {name.trim().charAt(0).toUpperCase() || "?"}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={isBusy}
            onClick={() => inputRef.current?.click()}
          >
            <LuImagePlus className="size-4" />
            {image ? "Change" : "Upload"}
          </Button>

          {image && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={isBusy}
              onClick={onRemove}
            >
              <LuTrash2 className="size-4" />
              Remove
            </Button>
          )}
        </div>

        <p className="text-foreground-subtle text-xs">
          PNG, JPG, WebP or GIF, up to{" "}
          {Math.round(ATTACHMENT_LIMITS.image.maxBytes / (1024 * 1024))}MB.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ATTACHMENT_LIMITS.image.mimeTypes.join(",")}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onSelectFile(file);
          event.target.value = "";
        }}
      />
    </div>
  );
};

export default ProjectAvatar;
