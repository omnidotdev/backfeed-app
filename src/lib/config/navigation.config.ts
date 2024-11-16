interface NavigationLink {
  /** Human-readable label. */
  label: string;
  /** Location (URL). */
  href: string;
}

interface NavigationRoutes {
  [key: string]: NavigationLink[];
}

/**
 * Navigation routes.
 */
const navigationRoutes: NavigationRoutes = {
  landingPage: [{ label: "Pricing", href: "/pricing" }],
};

export default navigationRoutes;
