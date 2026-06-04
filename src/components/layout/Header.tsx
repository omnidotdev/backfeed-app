import { Link, useLocation } from "@tanstack/react-router";
import { LuExternalLink } from "react-icons/lu";

import LogoLink from "@/components/core/LogoLink";
import HeaderActions from "@/components/layout/HeaderActions";
import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

/**
 * Layout header.
 */
const Header = () => {
  const { pathname } = useLocation();
  const isPricing = pathname === "/pricing";

  return (
    <header className="flex h-full w-full border-neutral-200 border-b bg-white/90 py-2 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)] dark:backdrop-blur-lg">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <LogoLink width={12} />

          <div className="flex items-center gap-1">
            <div className="hidden sm:flex">
              <Link to="/pricing" role="group">
                <div
                  className={cn(
                    "flex h-10 items-center rounded-md px-4 transition-colors hover:text-[var(--colors-brand-primary-600)] dark:hover:text-[var(--colors-brand-primary-400)]",
                    isPricing
                      ? "bg-[var(--colors-brand-primary-50)] text-[var(--colors-brand-primary-600)] dark:bg-[var(--colors-brand-primary-950)]/30 dark:text-[var(--colors-brand-primary-400)]"
                      : "text-foreground-muted dark:text-neutral-400",
                  )}
                >
                  Pricing
                </div>
              </Link>
            </div>

            <a
              href={app.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-1 px-4 text-foreground-muted transition-colors hover:text-[var(--colors-brand-primary-600)] sm:flex dark:text-neutral-400 dark:hover:text-[var(--colors-brand-primary-400)]"
            >
              Docs
              <LuExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
