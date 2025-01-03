const app = {
  name: "Backfeed",
  description: "Streamlined user feedback 📣",
  organization: "Omni",
  productionUrl: "https://backfeed.omni.dev",
  breadcrumb: "Home",
  notFound: {
    statusCode: 404,
    title: "Page Not Found",
    returnHome: "Return home",
  },
  auth: {
    signIn: {
      label: "Sign In",
    },
    signUp: {
      label: "Sign Up",
    },
    signOut: {
      label: "Sign Out",
    },
    profile: {
      label: "Profile",
    },
  },
  actions: {
    cancel: {
      label: "Cancel",
    },
  },
  info: {
    comingSoon: {
      label: "Coming Soon",
    },
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
      emptyState: {
        message: "No organizations found. Would you like to create one?",
        cta: {
          label: "Create Organization",
        },
      },
    },
    recentFeedback: {
      emptyState: {
        message: "No recent feedback found.",
      },
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
      newOrganization: {
        action: {
          submit: "Create Organization",
          pending: "Creating Organization...",
        },
        label: "New Organization",
        description: "Create a new organization by submitting the form below.",
        organizationName: {
          id: "Organization Name",
          placeholder: "Insert organization name...",
          error: "Must be at least 3 characters.",
        },
        organizationSlug: {
          id: "Organization Slug",
          placeholder: "Insert organization slug...",
          error: {
            invalid: "Must be at least 3 characters.",
            duplicate: "Organization slug already exists.",
          },
        },
      },
      newProject: {
        action: {
          submit: "Create Project",
          pending: "Creating Project...",
        },
        label: "New Project",
        description: "Create a new project by submitting the form below.",
        selectOrganization: {
          label: {
            id: "organizations",
            singular: "Organization",
            plural: "Organizations",
          },
          error: "Please select an organization.",
        },
        projectName: {
          id: "Project Name",
          placeholder: "Insert project name...",
          error: "Must be at least 3 characters.",
        },
        projectDescription: {
          id: "Project Description",
          placeholder: "Insert project description...",
          error: "Must be at least 10 characters.",
        },
        projectSlug: {
          id: "Project Slug",
          placeholder: "Insert project slug...",
          error: {
            invalid: "Must be at least 3 characters.",
            duplicate: "Project slug already exists.",
          },
        },
      },
      viewOrganizations: {
        label: "View All Organizations",
      },
    },
  },
  organizationsPage: {
    breadcrumb: "Organizations",
    header: {
      title: "Organizations",
      description: "Manage and monitor all your organizations in one place.",
      cta: {
        newOrganization: {
          label: "New Organization",
        },
      },
    },
    emptyState: {
      message: "No organizations found. Would you like to create one?",
      cta: {
        label: "Create Organization",
      },
    },
    filters: {
      search: {
        placeholder: "Search all organizations...",
      },
    },
    dialogs: {
      deleteOrganization: {
        title: "Delete Organization",
        description: "Are you sure you want to delete this organization?",
        action: {
          label: "Delete",
        },
      },
      leaveOrganization: {
        title: "Leave Organization",
        description: "Are you sure you want to leave this organization?",
        action: {
          label: "Leave",
        },
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
      emptyState: {
        message: "No projects found. Would you like to create one?",
        cta: {
          label: "Create Project",
        },
      },
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
  projectsPage: {
    breadcrumb: "Projects",
    header: {
      title: "Projects",
      description:
        "Manage and monitor all your organization's projects in one place.",
      cta: {
        newProject: {
          label: "New Project",
        },
      },
    },
    emptyState: {
      organizationOwnerMessage:
        "No projects found. Would you like to create one?",
      organizationUserMessage: "No projects found.",
      cta: {
        label: "Create Project",
      },
    },
    filters: {
      search: {
        placeholder: "Search all projects...",
      },
      select: {
        status: {
          label: {
            id: "Status",
            singular: "Status",
            plural: "Statuses",
          },
        },
      },
    },
    dialogs: {
      deleteProject: {
        title: "Delete Project",
        description: "Are you sure you want to delete this project?",
        action: {
          label: "Delete",
        },
      },
    },
  },
  projectPage: {
    header: {
      cta: {
        settings: {
          label: "Project Settings",
        },
        viewAllProjects: {
          label: "View All Projects",
        },
      },
    },
    projectFeedback: {
      title: "Project Feeback",
      inputPlaceholder: "Short, descriptive title",
      textareaPlaceholder: "Describe additional details...",
      submit: "Create",
      totalResponses: "Total Responses",
      details: {
        upvote: "Upvote",
        downvote: "Downvote",
        feedbackLink: "View Feedback",
      },
      emptyState: {
        message: "No posts found. Add a post to start the conversation.",
      },
    },
    projectInformation: {
      title: "Project Information",
      activeUsers: "Active Users",
      created: "Created",
    },
    feedbackMetrics: {
      title: "Feedback Metrics",
      totalFeedback: "Total Feedback",
      totalEngagement: "Total Engagement",
    },
    statusBreakdown: {
      title: "Status Breakdown",
      status: {
        new: "New",
        planned: "Planned",
        inProgress: "In Progress",
        completed: "Completed",
      },
    },
  },
  feedbackPage: {
    breadcrumb: "Feedback",
    details: {
      upvote: "Upvote",
      downvote: "Downvote",
    },
    comments: {
      title: "Comments",
      description: "View all feedback comments.",
      textAreaPlaceholder: "Add a comment...",
      submit: "Add Comment",
      totalComments: "total comments",
      emptyState: {
        message: "No comments found. Add a comment to start the conversation.",
      },
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
