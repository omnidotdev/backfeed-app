import cn from "@/lib/utils";

interface Props {
  /** Readable error message. */
  message: string;
  /** Additional class names (sizing/spacing). */
  className?: string;
}

/**
 * Error boundary component. Displays a message when an error occurs from fetching dynamic data.
 */
const ErrorBoundary = ({ message, className }: Props) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-md border border-primary border-dashed text-primary",
      className,
    )}
  >
    {message}
  </div>
);

export default ErrorBoundary;
