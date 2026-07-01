import {
  FaDiscord,
  FaGithub,
  FaThreads,
  FaXTwitter as FaX,
} from "react-icons/fa6";

import app from "@/lib/config/app.config";

const linkClass =
  "text-neutral-500 transition-colors hover:text-foreground dark:text-neutral-400 dark:hover:text-neutral-200";

/**
 * Layout footer.
 */
const Footer = () => (
  <footer className="bottom-0 flex w-full flex-col items-center justify-center gap-4 border-neutral-200 border-t bg-neutral-50 px-4 py-6 sm:flex-row dark:border-neutral-800 dark:bg-neutral-950">
    {/* Made with megaphone */}
    <p className="text-neutral-500 text-sm dark:text-neutral-400">
      Made with 📣 by{" "}
      <a
        href="https://omni.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground transition-colors hover:text-[var(--colors-brand-primary-600)] dark:text-neutral-200 dark:hover:text-[var(--colors-brand-primary-400)]"
      >
        {app.organization.name}
      </a>
    </p>

    <div className="hidden h-4 w-px bg-border sm:block" />

    {/* Links */}
    <div className="flex items-center gap-4">
      <a
        href={app.docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm ${linkClass}`}
      >
        Docs
      </a>

      <a
        href={app.feedbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm ${linkClass}`}
      >
        Feedback
      </a>

      <a
        href={app.legal.privacy}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm ${linkClass}`}
      >
        Privacy
      </a>

      <a
        href={app.legal.terms}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm ${linkClass}`}
      >
        Terms
      </a>

      <a
        href={app.legal.cookies}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm ${linkClass}`}
      >
        Cookies
      </a>

      <div className="flex items-center gap-3">
        <a
          href={app.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <FaGithub className="size-5" />
        </a>

        <a
          href={app.socials.discord}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <FaDiscord className="size-5" />
        </a>

        <a
          href={app.socials.x}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <FaX className="size-4" />
        </a>

        <a
          href={app.socials.threads}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <FaThreads className="size-5" />
        </a>
      </div>
    </div>

    <div className="hidden h-4 w-px bg-border sm:block" />

    {/* Copyright */}
    <p className="text-neutral-500 text-sm dark:text-neutral-400">
      &copy; {new Date().getFullYear()} {app.organization.name}
    </p>
  </footer>
);

export default Footer;
