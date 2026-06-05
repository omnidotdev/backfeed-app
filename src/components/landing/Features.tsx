import {
  IoArrowUpCircleOutline,
  IoBarChartOutline,
  IoChatbubblesOutline,
  IoGitNetworkOutline,
} from "react-icons/io5";

const FEATURES = [
  {
    title: "Upvote & Prioritize",
    description:
      "Let users vote on what matters. See what's trending and prioritize based on real demand from your community.",
    icon: IoArrowUpCircleOutline,
  },
  {
    title: "Status Tracking",
    description:
      "Track feedback from New to Completed. Keep your community informed with visual status updates.",
    icon: IoGitNetworkOutline,
  },
  {
    title: "Threaded Discussions",
    description:
      "Dive deeper with comments and replies. Have real conversations about each piece of feedback.",
    icon: IoChatbubblesOutline,
  },
  {
    title: "Real-time Analytics",
    description:
      "See feedback trends at a glance. Weekly charts, status breakdowns, and engagement metrics to guide your decisions.",
    icon: IoBarChartOutline,
  },
];

/**
 * Landing page features section with bento grid layout.
 */
const Features = () => (
  <div className="flex w-full flex-col items-center bg-[var(--colors-neutral-50)] px-6 py-16 md:px-12 md:py-24 dark:bg-[var(--colors-neutral-950)]">
    {/* Section header */}
    <div className="mb-12 flex flex-col items-center text-center">
      <p className="mb-3 font-semibold text-[var(--colors-brand-primary-600)] text-sm uppercase tracking-wide md:text-base dark:text-[var(--colors-brand-primary-400)]">
        Features
      </p>

      <h2 className="mb-4 text-balance font-bold text-3xl leading-tight md:text-4xl lg:text-5xl">
        Everything you need to manage feedback
      </h2>

      <p className="max-w-2xl text-pretty font-medium text-foreground-subtle text-lg md:text-xl">
        A comprehensive platform to collect, analyze, and act on user feedback
        effectively.
      </p>
    </div>

    {/* Bento grid */}
    <div className="grid w-full max-w-6xl auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 lg:grid-cols-2">
      {FEATURES.map(({ title, description, icon: Icon }) => (
        <div
          key={title}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--colors-neutral-200)] bg-white p-6 backdrop-blur-[8px] transition-all duration-[0.4s] hover:-translate-y-1.5 hover:border-[var(--colors-brand-primary-300)] hover:shadow-[0_20px_40px_-10px_oklch(0.650_0.220_6_/_0.15)] md:p-8 dark:border-[var(--colors-neutral-800)] dark:bg-[var(--colors-neutral-900)]/50 dark:hover:border-[var(--colors-brand-primary-700)] dark:hover:shadow-[0_20px_40px_-10px_oklch(0.650_0.220_6_/_0.25)]"
        >
          {/* Background gradient glow */}
          <div className="pointer-events-none absolute top-[-50%] right-[-30%] h-[300px] w-[300px] rounded-full bg-[var(--colors-glow-ruby)] opacity-0 blur-[80px] transition-opacity duration-[0.4s] group-hover:opacity-[0.15] dark:group-hover:opacity-[0.25]" />

          {/* Background icon */}
          <Icon className="absolute top-1/2 right-[-0.5rem] size-28 -translate-y-1/2 text-[var(--colors-brand-primary-100)] opacity-40 transition-all duration-[0.4s] md:size-36 dark:text-[var(--colors-brand-primary-900)]/30 dark:opacity-20" />

          {/* Content */}
          <div className="relative z-[1] flex flex-col gap-3">
            {/* Icon with gradient background */}
            <div className="flex size-14 items-center justify-center rounded-xl border border-[var(--colors-brand-primary-200)] bg-gradient-to-br from-[var(--colors-brand-primary-100)] to-[var(--colors-brand-primary-50)] shadow-[0_4px_12px_-2px_oklch(0.650_0.220_6_/_0.15)] dark:border-[var(--colors-brand-primary-800)]/50 dark:from-[var(--colors-brand-primary-900)]/60 dark:to-[var(--colors-brand-primary-950)]/40 dark:shadow-[0_4px_12px_-2px_oklch(0.650_0.220_6_/_0.2)]">
              <Icon className="size-7 text-[var(--colors-brand-primary-600)] dark:text-[var(--colors-brand-primary-400)]" />
            </div>

            <h3 className="mt-2 font-bold text-xl tracking-tight md:text-2xl">
              {title}
            </h3>

            <p className="text-muted-foreground text-base leading-[1.7] md:text-lg">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Features;
