import { useCreateWorkspace } from "@omnidotdev/providers/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import generateSlug from "@/lib/util/generateSlug";
import { fetchSession } from "@/server/functions/auth";
import {
  checkWorkspaceHandleAvailability,
  createOrganization,
} from "@/server/functions/organizations";

import type { ReactNode } from "react";
import type { Organization } from "@/server/functions/organizations";

type Availability = "unknown" | "checking" | "available" | "taken";

const MIN_HANDLE_LENGTH = 3;

const TRIGGER_CLASS =
  "inline-flex h-9 items-center gap-2 rounded-md border bg-background px-4 font-medium text-sm shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground";

interface Props {
  /** Trigger label (defaults to "New workspace") */
  children?: ReactNode;
  /** Override the trigger button classes */
  className?: string;
}

/**
 * Self-contained "create workspace" trigger + modal.
 *
 * Drives the ecosystem-wide creation flow (`useCreateWorkspace` from
 * `@omnidotdev/providers`): a live namespace availability check, the
 * `createOrganization` server fn (the Gatekeeper client must run server-side),
 * and `fetchSession` to refresh claims. A workspace IS a Gatekeeper
 * organization. Deliberately dependency-light (native elements + Tailwind
 * tokens) so it drops into any app regardless of its design system version. On
 * success it lands the user in the new workspace, which resolves immediately via
 * the route's `getOrganizationBySlug` fallback while the JWT claims catch up.
 */
const CreateWorkspaceButton = ({ children, className }: Props) => {
  const router = useRouter();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState<Availability>("unknown");
  const [error, setError] = useState<string | null>(null);

  const slug = name.trim() ? (generateSlug(name.trim()) ?? "") : "";

  const { create, isCreating } = useCreateWorkspace<Organization>({
    checkAvailability: (handle) =>
      checkWorkspaceHandleAvailability({ data: { slug: handle } }),
    createWorkspace: (input) => createOrganization({ data: input }),
    refreshSession: () => fetchSession(),
  });

  // Live availability check, debounced. The flow re-checks at submit; this is
  // purely for inline feedback while typing.
  useEffect(() => {
    if (slug.length < MIN_HANDLE_LENGTH) {
      setAvailability("unknown");
      return;
    }

    setAvailability("checking");
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const { available } = await checkWorkspaceHandleAvailability({
          data: { slug },
        });
        if (!cancelled) setAvailability(available ? "available" : "taken");
      } catch {
        if (!cancelled) setAvailability("unknown");
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [slug]);

  const close = useCallback(() => {
    setOpen(false);
    setName("");
    setAvailability("unknown");
    setError(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const org = await create({ name: name.trim(), slug });
      if (!org?.slug) return;

      close();

      await router.invalidate();
      navigate({
        to: "/workspaces/$workspaceSlug",
        params: { workspaceSlug: org.slug },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create workspace",
      );
    }
  };

  const canSubmit =
    slug.length >= MIN_HANDLE_LENGTH &&
    availability !== "taken" &&
    availability !== "checking" &&
    !isCreating;

  return (
    <>
      <button
        type="button"
        className={className ?? TRIGGER_CLASS}
        onClick={() => setOpen(true)}
      >
        {children ?? "New workspace"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-semibold text-lg">Create workspace</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-muted-foreground text-sm">
              A workspace is where your projects and feedback live.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <input
                // biome-ignore lint/a11y/noAutofocus: focus the sole field when the modal opens
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Workspace name"
                autoComplete="off"
                className="h-9 rounded-md border bg-background px-3 text-sm"
              />

              {slug && (
                <p className="text-muted-foreground text-xs">
                  URL: <span className="font-mono">{slug}</span>
                </p>
              )}

              {slug.length >= MIN_HANDLE_LENGTH &&
                availability === "available" && (
                  <p className="text-green-600 text-xs">Available</p>
                )}

              {slug.length >= MIN_HANDLE_LENGTH && availability === "taken" && (
                <p className="text-destructive text-xs">
                  That handle is already taken. Handles are unique across Omni.
                </p>
              )}

              {error && <p className="text-destructive text-xs">{error}</p>}

              <p className="text-muted-foreground text-xs">
                Your workspace is part of your Omni account and works across
                Omni products.
              </p>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={close}
                  disabled={isCreating}
                  className={TRIGGER_CLASS}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex h-9 items-center rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm shadow-xs transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {isCreating ? "Creating..." : "Create workspace"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateWorkspaceButton;
