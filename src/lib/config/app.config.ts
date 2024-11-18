const app = {
  name: "Backfeed",
  description: "Streamlined user feedback 📣",
  organization: "Omni",
  landingPage: {
    hero: {
      title: "Transform User Feedback into Actionable Insights",
      description:
        "Collect, analyze, and act on user feedback with our powerful platform. Make data-driven decisions and improve your product faster than ever.",
      cta: {
        collect: {
          label: {
            short: "Start",
            long: "Start Collecting Feedback",
          },
        },
        demo: {
          label: {
            short: "Demo",
            long: "Watch Demo",
          },
        },
      },
    },
    features: {
      title: "Everything you need to manage feedback effectively",
      description:
        "Our comprehensive platform provides all the tools you need to collect, analyze, and act on user feedback.",
      pinned: {
        collection: {
          title: "Real-time Feedback Collection",
          description:
            "Gather user feedback instantly with customizable forms and widgets that seamlessly integrate into your product.",
        },
        analytics: {
          title: "Advanced Analytics",
          description:
            "Transform raw feedback into actionable insights with powerful analytics and visualization tools.",
        },
        implementation: {
          title: "Quick Implementation",
          description:
            "Get started in minutes with our simple SDK and comprehensive documentation.",
        },
        workflows: {
          title: "Automated Workflows",
          description:
            "Streamline your feedback process with customizable automation and integration capabilities.",
        },
      },
    },
  },
  dashboardPage: {
    welcomeMessage: "Welcome back",
    description: "Here's what's happening with your feedback today.",
    organizations: {
      title: "Organizations",
      description: "Manage your organizations and their feedback projects",
    },
    aggregates: {
      totalFeedback: {
        title: "Total Feedback",
      },
      activeUsers: {
        title: "Active Users",
      },
      avgResponseTime: {
        title: "Avg. Response Time",
      },
    },
  },
  organizationPage: {
    header: {
      description: "Manage your organization's feedback and projects.",
    },
    projects: {
      title: "Projects",
      description: "Manage feedback collection across your applications",
    },
    stats: {
      title: "Organization Stats",
      description: "Overview of all projects and feedback",
    },
    actions: {
      title: "Quick Actions",
      description: "Common organization tasks",
    },
  },
};

export default app;
