import { toast } from "sonner";

import type { ReactNode } from "react";

/** Optional call-to-action button rendered on a toast. */
interface ToastAction {
  label: string;
  onClick: () => void;
}

/**
 * Toast content. Mirrors the `{ title, description }` shape the app passes
 * throughout (previously consumed by the Ark UI toaster).
 */
interface ToastContent {
  title?: ReactNode;
  description?: ReactNode;
  /** Optional CTA button (e.g. "View") rendered on the toast. */
  action?: ToastAction;
  /** Override the auto-dismiss duration (ms); useful when a CTA is present. */
  duration?: number;
}

type ToastResolvable<T> = ToastContent | ((arg: T) => ToastContent);

interface PromiseMessages<T> {
  loading?: ToastContent;
  success?: ToastResolvable<T>;
  error?: ToastResolvable<unknown>;
}

const resolveContent = <T>(
  content: ToastResolvable<T> | undefined,
  arg: T,
): ToastContent | undefined =>
  typeof content === "function"
    ? (content as (arg: T) => ToastContent)(arg)
    : content;

/** Map shared toast content onto sonner's options object. */
const toSonnerOptions = (content?: ToastContent) => ({
  description: content?.description,
  duration: content?.duration,
  action: content?.action
    ? { label: content.action.label, onClick: content.action.onClick }
    : undefined,
});

/**
 * Toaster backed by [sonner](https://sonner.emilkowal.ski). Exposes the same
 * `{ title, description }` API the app already uses so call sites are unchanged.
 */
const toaster = {
  /**
   * Show a loading toast that resolves to success or error based on a promise.
   * The first argument may be a promise or a function returning one.
   */
  promise: <T>(
    input: Promise<T> | (() => Promise<T>),
    messages: PromiseMessages<T> = {},
  ): Promise<T> => {
    const promise = (
      typeof input === "function" ? input() : input
    ) as Promise<T>;

    const id = toast.loading(messages.loading?.title ?? "Loading...", {
      description: messages.loading?.description,
    });

    promise
      .then((data) => {
        const content = resolveContent(messages.success, data);
        toast.success(content?.title ?? "Success", {
          id,
          ...toSonnerOptions(content),
        });
      })
      .catch((error) => {
        const content = resolveContent(messages.error, error);
        toast.error(content?.title ?? "Error", {
          id,
          ...toSonnerOptions(content),
        });
      });

    return promise;
  },
  create: (content: ToastContent) =>
    toast(content.title ?? "", toSonnerOptions(content)),
  success: (content: ToastContent) =>
    toast.success(content.title ?? "", toSonnerOptions(content)),
  error: (content: ToastContent) =>
    toast.error(content.title ?? "", toSonnerOptions(content)),
  warning: (content: ToastContent) =>
    toast.warning(content.title ?? "", toSonnerOptions(content)),
  info: (content: ToastContent) =>
    toast.info(content.title ?? "", toSonnerOptions(content)),
  loading: (content: ToastContent) =>
    toast.loading(content.title ?? "", toSonnerOptions(content)),
  dismiss: (id?: string | number) => toast.dismiss(id),
};

export default toaster;
