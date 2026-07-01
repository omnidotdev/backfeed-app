import { useFieldContext } from "@/lib/hooks/useForm";
import cn from "@/lib/utils";

import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Overrides to apply to the default error text element. */
  errorProps?: ComponentProps<"span">;
}

/**
 * Generalized form `Field` component.
 */
const Field = ({
  errorMap,
  errorProps,
  children,
  className,
  ...rest
}: Props) => {
  const { state } = useFieldContext<string>();

  const errors = (errorMap ??
    state.meta.errorMap.onSubmit ??
    []) as StandardSchemaV1Issue[];

  return (
    <div className={cn("relative flex flex-col gap-1.5", className)} {...rest}>
      {children}

      {!!errors.length && (
        <span
          className="absolute top-0 right-0 h-5 text-primary text-sm dark:text-[var(--colors-brand-primary-400)]"
          {...errorProps}
        >
          {errors[0].message}
        </span>
      )}
    </div>
  );
};

export default Field;
