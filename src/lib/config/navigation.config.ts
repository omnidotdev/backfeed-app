interface NavigationLink {
  /** Human-readable label. */
  label: string;
  href: string;
}

interface NavigationRoutes {
  [key: string]: NavigationLink[];
}

const navigationRoutes: NavigationRoutes = {
  landingPage: [{ label: "Pricing", href: "/pricing" }],
};

export default navigationRoutes;
