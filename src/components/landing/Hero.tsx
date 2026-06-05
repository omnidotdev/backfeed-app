import { useSearch } from "@tanstack/react-router";
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUp,
  FiMessageCircle,
} from "react-icons/fi";

import { Button } from "@/components/ui/button";
import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

// Mockup feedback items for the hero graphic
const MOCK_FEEDBACK = [
  {
    title: "Dark mode support",
    description: "Add a dark theme option for the dashboard",
    upvotes: 47,
    downvotes: 5,
    comments: 12,
    status: "In Progress",
    statusColor: "blue",
  },
  {
    title: "Export to CSV",
    description: "Allow exporting feedback data to spreadsheets",
    upvotes: 31,
    downvotes: 3,
    comments: 5,
    status: "Planned",
    statusColor: "purple",
  },
  {
    title: "Slack integration",
    description: "Get notified when new feedback is submitted",
    upvotes: 24,
    downvotes: 5,
    comments: 8,
    status: "Under Review",
    statusColor: "amber",
  },
];

const STATUS_BG: Record<string, string> = {
  blue: "bg-[var(--colors-blue-100)] dark:bg-[var(--colors-blue-900)]/40",
  purple: "bg-[var(--colors-purple-100)] dark:bg-[var(--colors-purple-900)]/40",
  amber: "bg-[var(--colors-amber-100)] dark:bg-[var(--colors-amber-900)]/40",
};

const STATUS_TEXT: Record<string, string> = {
  blue: "text-[var(--colors-blue-700)] dark:text-[var(--colors-blue-400)]",
  purple:
    "text-[var(--colors-purple-700)] dark:text-[var(--colors-purple-400)]",
  amber: "text-[var(--colors-amber-700)] dark:text-[var(--colors-amber-400)]",
};

interface ActionProps extends ComponentProps<typeof Button> {
  label: {
    short: string;
    long: string;
  };
  icon?: IconType;
}

/**
 * Landing page hero section.
 */
const Hero = () => {
  const { returnTo } = useSearch({ from: "/" });

  const redirectUrl = returnTo || `${BASE_URL}/dashboard`;

  const actions: ActionProps[] = [
    {
      label: {
        short: "Start Free",
        long: "Start Collecting Feedback",
      },
      icon: FiArrowRight,
      onClick: () => signIn({ redirectUrl, action: "sign-up" }),
    },
    {
      label: {
        short: "Docs",
        long: "View Docs",
      },
      variant: "outline",
      onClick: () => window.open(app.docsUrl, "_blank", "noopener,noreferrer"),
    },
  ];

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center overflow-hidden px-6 md:min-h-[85vh]">
      {/* Gradient orbs for cosmic effect */}
      <div className="pointer-events-none absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--colors-glow-ruby)] opacity-40 blur-[120px] [animation:pulse-glow_8s_ease-in-out_infinite] dark:opacity-60" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-15%] h-[600px] w-[600px] rounded-full bg-[var(--colors-glow-magenta)] opacity-30 blur-[140px] [animation:pulse-glow_10s_ease-in-out_infinite] [animation-delay:-3s] dark:opacity-50" />
      <div className="pointer-events-none absolute top-[30%] left-[20%] h-[300px] w-[300px] rounded-full bg-[var(--colors-glow-ruby)] opacity-20 blur-[100px] [animation:float_12s_ease-in-out_infinite] dark:opacity-30" />

      {/* Content */}
      <div className="relative z-[1] flex max-w-4xl flex-col items-center pt-8 text-center">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-[var(--colors-neutral-200)] bg-white/80 px-4 py-1.5 backdrop-blur-[8px] dark:border-[var(--colors-neutral-800)] dark:bg-[var(--colors-neutral-900)]/60">
          <span className="font-medium text-[var(--colors-brand-primary-600)] text-sm dark:text-[var(--colors-brand-primary-400)]">
            Open Source Feedback Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-balance font-bold text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
          Feedback that drives products forward
        </h1>

        {/* Subheadline */}
        <h2 className="mb-10 max-w-2xl text-pretty font-medium text-foreground-subtle text-lg leading-normal md:text-xl lg:text-2xl">
          Collect, prioritize, and act on user feedback. Build what your users
          actually want.
        </h2>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          {actions.map(({ label, icon: ActionIcon, variant, ...rest }, idx) => (
            <Button
              key={label.long}
              size="md"
              variant={variant}
              className={cn(
                "group font-medium transition-all",
                idx === 0 &&
                  "shadow-[0_4px_12px_-2px_oklch(0.650_0.220_6_/_0.2)] hover:-translate-y-px hover:shadow-[0_8px_20px_-4px_oklch(0.650_0.220_6_/_0.3)]",
                idx === 1 &&
                  "border-[var(--colors-neutral-300)] hover:-translate-y-px hover:border-primary hover:text-primary dark:border-[var(--colors-neutral-700)]",
              )}
              {...rest}
            >
              <span className="inline md:hidden">{label.short}</span>
              <span className="hidden md:inline">{label.long}</span>
              {ActionIcon && (
                <ActionIcon className="size-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          ))}
        </div>

        {/* Live demo link - points to Omni's own public feedback board */}
        <a
          href={app.feedbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-1.5 font-medium text-foreground-subtle text-sm transition-colors hover:text-primary"
        >
          See it live on our own feedback board
          <FiArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </a>

        {/* Hero Graphic - Feedback Board Mockup */}
        <div className="mt-16 mb-12 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--colors-neutral-200)] bg-white/90 shadow-[0_25px_50px_-12px_oklch(0_0_0_/_0.15)] backdrop-blur-[12px] dark:border-[var(--colors-neutral-800)] dark:bg-[var(--colors-neutral-900)]/80 dark:shadow-[0_25px_50px_-12px_oklch(0_0_0_/_0.5)]">
          {/* Header bar */}
          <div className="flex items-center justify-between border-[var(--colors-neutral-100)] border-b bg-[var(--colors-neutral-50)] px-5 py-3 dark:border-[var(--colors-neutral-800)] dark:bg-[var(--colors-neutral-900)]">
            <span className="font-medium text-muted-foreground text-sm">
              Feature Requests
            </span>
            <div className="rounded-md bg-[var(--colors-brand-primary-50)] px-2.5 py-1 dark:bg-[var(--colors-brand-primary-950)]">
              <span className="font-semibold text-[var(--colors-brand-primary-600)] text-xs dark:text-[var(--colors-brand-primary-400)]">
                3 items
              </span>
            </div>
          </div>

          {/* Feedback items */}
          <div className="flex flex-col p-2">
            {MOCK_FEEDBACK.map((item, idx) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl p-4 opacity-0 [animation:fade-in-up_0.5s_ease_forwards] transition-colors hover:bg-[var(--colors-neutral-50)] dark:hover:bg-[var(--colors-neutral-800)]/50"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Vote button */}
                <div className="flex min-w-12 flex-col items-center justify-center rounded-lg border border-[var(--colors-neutral-200)] bg-white py-2 transition-all dark:border-[var(--colors-neutral-700)] dark:bg-[var(--colors-neutral-800)]">
                  <FiArrowUp className="size-4 text-[var(--colors-brand-primary-500)] dark:text-[var(--colors-brand-primary-400)]" />
                  <span className="mt-0.5 font-bold text-foreground text-sm">
                    {item.upvotes - item.downvotes}
                  </span>
                  <FiArrowDown className="size-4 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-left font-semibold text-base text-foreground">
                      {item.title}
                    </span>
                    <div
                      className={cn(
                        "rounded-full px-2.5 py-1",
                        STATUS_BG[item.statusColor],
                      )}
                    >
                      <span
                        className={cn(
                          "whitespace-nowrap font-medium text-xs",
                          STATUS_TEXT[item.statusColor],
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-left text-muted-foreground text-sm leading-normal">
                    {item.description}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <FiMessageCircle className="size-3.5 text-foreground-subtle" />
                    <span className="text-foreground-subtle text-xs">
                      {item.comments} comments
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
