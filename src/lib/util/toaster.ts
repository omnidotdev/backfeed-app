import { toast } from "sonner";

import type { ReactNode } from "react";

/**
 * Toast content. Mirrors the `{ title, description }` shape the app passes
 * throughout (previously consumed by the Ark UI toaster).
 */
interface ToastContent {
  title?: ReactNode;
  description?: ReactNode;
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
          description: content?.description,
        });
      })
      .catch((error) => {
        const content = resolveContent(messages.error, error);
        toast.error(content?.title ?? "Error", {
          id,
          description: content?.description,
        });
      });

    return promise;
  },
  create: (content: ToastContent) =>
    toast(content.title ?? "", { description: content.description }),
  success: (content: ToastContent) =>
    toast.success(content.title ?? "", { description: content.description }),
  error: (content: ToastContent) =>
    toast.error(content.title ?? "", { description: content.description }),
  warning: (content: ToastContent) =>
    toast.warning(content.title ?? "", { description: content.description }),
  info: (content: ToastContent) =>
    toast.info(content.title ?? "", { description: content.description }),
  loading: (content: ToastContent) =>
    toast.loading(content.title ?? "", { description: content.description }),
  dismiss: (id?: string | number) => toast.dismiss(id),
};

export default toaster;
