import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { LuArrowLeft } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import app from "@/lib/config/app.config";

import type { ErrorComponentProps } from "@tanstack/react-router";

/**
 * Default error boundary for caught route errors.
 */
const DefaultCatchBoundary = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-16">
      <p className="text-6xl md:text-7xl">🔄</p>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-bold text-2xl text-destructive">
          Something went wrong
        </p>

        <p className="max-w-lg text-muted-foreground">
          An unexpected error occurred. Please try again or contact{" "}
          <a href={`mailto:${app.organization.supportEmailAddress}`}>
            <span className="text-primary">
              {app.organization.supportEmailAddress}
            </span>
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button onClick={() => router.invalidate()}>Try again</Button>

        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
        >
          <LuArrowLeft className="size-4" />
          {app.globalError.goBack}
        </Button>
      </div>
    </div>
  );
};

export default DefaultCatchBoundary;
