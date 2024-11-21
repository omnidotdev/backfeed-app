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
  feedbackPage: {
    backToProject: "Back to Project",
    details: {
      title: "Feedback Details",
      description: "View feedback details. Feel free to upvote or downvote.",
    },
    comments: {
      title: "Comments",
      description: "View all feedback comments.",
      textAreaPlaceholder: "Add a comment...",
      submit: "Add Comment",
      totalComments: "total comments",
    },
    statusHistory: {
      title: "Status History",
      description: "View feedback status history.",
      currentStatus: "Current Status",
      created: "Created",
      updated: "Updated",
    },
  },
};

export default app;
