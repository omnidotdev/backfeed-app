import { FiArrowRight } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";

/**
 * Final call to action section.
 */
const CTA = () => {
  const handleGetStarted = () => {
    signIn({ redirectUrl: `${BASE_URL}/dashboard`, action: "sign-up" });
  };

  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden bg-[var(--colors-neutral-900)] px-6 py-20 md:px-12 md:py-28 dark:bg-[var(--colors-neutral-950)]">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute top-[-30%] left-[10%] h-[500px] w-[500px] rounded-full bg-[var(--colors-glow-ruby)] blur-[120px]" />
      <div className="pointer-events-none absolute right-[5%] bottom-[-20%] h-[400px] w-[400px] rounded-full bg-[var(--colors-glow-magenta)] blur-[100px]" />

      {/* Content */}
      <div className="relative z-[1] flex max-w-3xl flex-col items-center text-center">
        <h2 className="mb-6 text-balance font-bold text-3xl text-white leading-tight md:text-4xl lg:text-5xl">
          Ready to transform your feedback process?
        </h2>

        <p className="mb-10 max-w-xl text-pretty font-medium text-[var(--colors-neutral-400)] text-lg md:text-xl">
          Join thousands of teams already using {app.name} to build better
          products. Start free, no credit card required.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            size="md"
            onClick={handleGetStarted}
            className="group font-medium shadow-[0_4px_12px_-2px_oklch(0.650_0.220_6_/_0.2)] transition-all hover:-translate-y-px hover:shadow-[0_8px_20px_-4px_oklch(0.650_0.220_6_/_0.3)]"
          >
            Get Started Free
            <FiArrowRight className="size-4 transition-transform group-hover:translate-x-[3px]" />
          </Button>

          <Button
            size="md"
            variant="outline"
            onClick={() =>
              window.open(app.docsUrl, "_blank", "noopener,noreferrer")
            }
            className="border-neutral-700 font-medium text-white transition-all duration-200 hover:-translate-y-px hover:border-primary hover:text-primary"
          >
            Read the Docs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
