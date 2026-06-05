import { Toaster as ArkToaster, Toast } from "@ark-ui/react/toast";
import { X } from "lucide-react";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const Toaster = ({
  className,
  ...rest
}: Omit<ComponentProps<typeof ArkToaster>, "children">) => (
  <ArkToaster {...rest}>
    {(toast) => (
      <Toast.Root
        className={cn(
          "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full relative flex w-[var(--width)] translate-x-[var(--x)] translate-y-[var(--y)] scale-[var(--scale)] flex-col gap-1 rounded-md border bg-popover p-4 text-popover-foreground opacity-[var(--opacity)] shadow-lg transition-all [z-index:var(--z-index)] data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
      >
        <Toast.Title className="pr-6 font-semibold text-sm">
          {toast.title}
        </Toast.Title>

        {toast.description && (
          <Toast.Description className="pr-6 text-muted-foreground text-sm">
            {toast.description}
          </Toast.Description>
        )}

        <Toast.CloseTrigger className="absolute top-3 right-3 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100">
          <X className="size-4" />
        </Toast.CloseTrigger>
      </Toast.Root>
    )}
  </ArkToaster>
);

export { Toaster };
