/**
 * Social proof section - simplified for early stage.
 */
const SocialProof = () => (
  <div className="flex w-full flex-col items-center bg-background px-6 py-12 md:px-12 md:py-16">
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
        <span className="font-medium text-muted-foreground text-sm">
          Open Source
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
        <span className="font-medium text-muted-foreground text-sm">
          Self-hostable
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
        <span className="font-medium text-muted-foreground text-sm">
          Privacy-first
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 dark:border-green-900 dark:bg-green-950/50">
        <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400" />
        <span className="font-medium text-green-700 text-sm dark:text-green-400">
          99.9% Uptime
        </span>
      </div>
    </div>
  </div>
);

export default SocialProof;
