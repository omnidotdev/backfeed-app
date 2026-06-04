import { ark } from "@ark-ui/react";

import cn from "@/lib/utils";

import type { ComponentProps, ReactNode } from "react";

const CardRoot = ({ className, ...rest }: ComponentProps<typeof ark.div>) => (
  <ark.div
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...rest}
  />
);

const CardHeader = ({ className, ...rest }: ComponentProps<typeof ark.div>) => (
  <ark.div className={cn("flex flex-col gap-1.5 p-6", className)} {...rest} />
);

const CardTitle = ({ className, ...rest }: ComponentProps<typeof ark.div>) => (
  <ark.div
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...rest}
  />
);

const CardDescription = ({
  className,
  ...rest
}: ComponentProps<typeof ark.div>) => (
  <ark.div
    className={cn("text-muted-foreground text-sm", className)}
    {...rest}
  />
);

const CardContent = ({
  className,
  ...rest
}: ComponentProps<typeof ark.div>) => (
  <ark.div className={cn("p-6 pt-0", className)} {...rest} />
);

const CardFooter = ({ className, ...rest }: ComponentProps<typeof ark.div>) => (
  <ark.div className={cn("flex items-center p-6 pt-0", className)} {...rest} />
);

interface CardProps extends ComponentProps<typeof CardRoot> {
  title?: string;
  description?: string;
  footer?: ReactNode;
  /**
   * @remarks `ComponentProps<typeof CardHeader>`
   */
  headerProps?: ComponentProps<typeof CardHeader>;
  /**
   * @remarks `ComponentProps<typeof CardTitle>`
   */
  titleProps?: ComponentProps<typeof CardTitle>;
  /**
   * @remarks `ComponentProps<typeof CardDescription>`
   */
  descriptionProps?: ComponentProps<typeof CardDescription>;
  /**
   * @remarks `ComponentProps<typeof CardContent>`
   */
  contentProps?: ComponentProps<typeof CardContent>;
  /**
   * @remarks `ComponentProps<typeof CardFooter>`
   */
  footerProps?: ComponentProps<typeof CardFooter>;
}

const Card = ({
  title,
  description,
  footer,
  headerProps,
  titleProps,
  descriptionProps,
  contentProps,
  footerProps,
  children,
  ...rest
}: CardProps) => (
  <CardRoot {...rest}>
    {(title || description) && (
      <CardHeader {...headerProps}>
        {title && <CardTitle {...titleProps}>{title}</CardTitle>}
        {description && (
          <CardDescription {...descriptionProps}>{description}</CardDescription>
        )}
      </CardHeader>
    )}

    <CardContent {...contentProps}>{children}</CardContent>

    {footer && <CardFooter {...footerProps}>{footer}</CardFooter>}
  </CardRoot>
);

export {
  Card,
  CardRoot,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
};
