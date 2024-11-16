interface NavigationLink {
  label: string;
  href: string;
}

interface NavigationRoutes {
  [key: string]: NavigationLink[];
}

const navigationRoutes: NavigationRoutes = {
  landingPage: [{ label: "Pricing", href: "/pricing" }],
  dashboardPage: [],
};

export default navigationRoutes;
