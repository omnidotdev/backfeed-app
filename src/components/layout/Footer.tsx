import {
  SiDiscord as DiscordIcon,
  SiGithub as GithubIcon,
  SiThreads as ThreadsIcon,
  SiX as XIcon,
} from "@icons-pack/react-simple-icons";
import { AppFooter } from "@omnidotdev/thornberry/app-footer";

import app from "@/lib/config/app.config";

const socialLinkClass =
  "rounded px-2 py-1 transition-colors hover:text-foreground";

/**
 * Layout footer. Renders the shared Omni `<AppFooter>`, which bakes in the
 * "Made with <symbol> by Omni" credit, the omni.dev link, and the legal links so
 * they can't drift. Backfeed supplies only its catalog symbol, docs link, its
 * Feedback link, and its social block.
 */
const Footer = () => (
  <AppFooter
    appSymbol={app.icon}
    docsUrl={app.docsUrl}
    orgUrl={app.organization.url}
    links={
      <a
        href={app.feedbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded px-2 py-1 text-sm transition-colors hover:text-foreground"
      >
        Feedback
      </a>
    }
    socials={
      <>
        <a
          href={app.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={socialLinkClass}
        >
          <GithubIcon className="size-5" />
        </a>

        <a
          href={app.socials.discord}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          className={socialLinkClass}
        >
          <DiscordIcon className="size-5" />
        </a>

        <a
          href={app.socials.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className={socialLinkClass}
        >
          <XIcon className="size-5" />
        </a>

        <a
          href={app.socials.threads}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Threads"
          className={socialLinkClass}
        >
          <ThreadsIcon className="size-5" />
        </a>
      </>
    }
  />
);

export default Footer;
