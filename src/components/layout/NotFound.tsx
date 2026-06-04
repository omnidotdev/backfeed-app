import { Link } from "@tanstack/react-router";
import { HiOutlineHome } from "react-icons/hi2";
import { LuArrowLeft } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import app from "@/lib/config/app.config";

import type { PropsWithChildren } from "react";

/**
 * 404 not found.
 */
const NotFound = ({ children }: PropsWithChildren) => (
  <div className="flex h-[100dvh] w-full items-center justify-center p-8">
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="text-6xl md:text-7xl">🔄</p>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold text-foreground text-xl">
          {children ?? app.notFound.title}
        </p>

        <p className="max-w-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Link to="/">
          <Button size="lg">
            <HiOutlineHome className="size-5" />
            {app.notFound.returnHome}
          </Button>
        </Link>

        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
        >
          <LuArrowLeft className="size-4" />
          Go back
        </Button>
      </div>
    </div>
  </div>
);

export default NotFound;
