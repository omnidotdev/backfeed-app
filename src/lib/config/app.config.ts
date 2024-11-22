const app = {
  name: "Backfeed",
  description: "Streamlined user feedback 📣",
  organization: "Omni",
  notFound: {
    statusCode: 404,
    title: "Page Not Found",
    returnHome: "Return home",
  },
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
    cta: {
      newProject: {
        label: "New Project",
      },
      newOrganization: {
        label: "New Organization",
      },
    },
  },
  organizationPage: {
    header: {
      description: "Manage your organization's feedback and projects.",
      cta: {
        viewAllProjects: {
          label: "View All Projects",
        },
        newProject: {
          label: "New Project",
        },
      },
    },
    projects: {
      title: "Projects",
      description: "Manage feedback collection across your applications",
    },
    metrics: {
      title: "Organization Metrics",
      description: "Overview of all projects and feedback",
      data: {
        totalProjects: {
          title: "Total Projects",
        },
        totalFeedback: {
          title: "Total Feedback",
        },
        activeUsers: {
          title: "Active Users",
        },
      },
    },
    actions: {
      title: "Quick Actions",
      description: "Common organization tasks",
      cta: {
        createProject: {
          label: "Create New Project",
        },
        manageTeam: {
          label: "Manage Team",
        },
        settings: {
          label: "Organization Settings",
        },
      },
    },
  },
  pricingPage: {
    tiers: [
      {
        title: "Basic",
        price: "$29",
        description: "Perfect for small teams just getting started",
        features: [
          "Up to 1,000 responses per month",
          "Basic analytics dashboard",
          "Email support",
          "1 project",
          "Basic integrations",
        ],
        highlighted: false,
      },
      {
        title: "Professional",
        price: "$79",
        description: "Everything you need for a growing business",
        features: [
          "Up to 10,000 responses per month",
          "Advanced analytics & reporting",
          "Priority email & chat support",
          "Unlimited projects",
          "Advanced integrations",
          "Custom branding",
          "Team collaboration",
        ],
        highlighted: true,
      },
      {
        title: "Enterprise",
        price: "Contact Us",
        description: "Advanced features for large organizations",
        features: [
          "Unlimited responses",
          "Custom analytics solutions",
          "24/7 phone & email support",
          "Dedicated account manager",
          "Custom integrations",
          "SLA guarantee",
          "Advanced security features",
          "On-premise deployment option",
        ],
        highlighted: false,
      },
    ],
    pricingFAQ: {
      items: [
        {
          title: "How does the 14-day trial work?",
          body: "You can try any plan free for 14 days with no credit card required. At the end of your trial, you can choose to subscribe or your account will automatically switch to the free plan.",
        },
        {
          title: "Can I switch plans later?",
          body: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be prorated the difference. When you downgrade, you'll receive credit for your next billing cycle.",
        },
        {
          title: "What payment methods do you accept?",
          body: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also support wire transfers and purchase orders.",
        },
        {
          title:
            "Do you offer discounts for non-profits or educational institutions?",
          body: "Yes, we offer special pricing for non-profits, educational institutions, and open-source projects. Please contact our sales team for more information.",
        },
        {
          title: "What happens to my data if I cancel?",
          body: "You'll have 30 days to export your data after cancellation. After that period, your data will be permanently deleted from our servers.",
        },
        {
          title: "Can I self-host this software?",
          body: "Yes! We offer open access to our API free of charge so you can build your own feedback provider around our infrastructure.",
        },
      ],
    },
    pricingHeader: {
      title: "Simple, transparent pricing",
      description:
        "Choose the perfect plan for your business. All plans include a 14-day free trial with no credit card required.",
    },
  },
};

export default app;
