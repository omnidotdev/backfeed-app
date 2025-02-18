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
          success: {
            title: "Success!",
            description: "Your organization has been successfully created.",
          },
          error: {
            title: "Error",
            description: "An error occurred while creating your organization.",
          },
        },
        label: "New Organization",
        description: "Create a new organization by submitting the form below.",
        organizationName: {
          id: "Organization Name",
          placeholder: "Omni",
          error: "Must be at least 3 characters.",
        },
        organizationSlug: {
          id: "Organization Slug",
          placeholder: "omni-dev",
          error: {
            invalidFormat: "Invalid slug format.",
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 50 characters.",
            duplicate: "Organization slug already exists.",
          },
        },
      },
      newProject: {
        action: {
          submit: "Create Project",
          pending: "Creating Project...",
          success: {
            title: "Success!",
            description: "Your project has been successfully created.",
          },
          error: {
            title: "Error",
            description: "An error occurred while creating your project.",
          },
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
          placeholder: "Backfeed",
          error: "Must be at least 3 characters.",
        },
        projectDescription: {
          id: "Project Description",
          placeholder:
            "Backfeed is an open-source feedback reporting platform.",
          error: "Must be at least 10 characters.",
        },
        projectSlug: {
          id: "Project Slug",
          placeholder: "omni-backfeed",
          error: {
            invalidFormat: "Invalid slug format.",
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 50 characters.",
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
  organizationSettingsPage: {
    breadcrumb: "Settings",
    description: "Manage your organization settings.",
    cta: {
      updateOrganization: {
        title: "Update Organization",
        memberTitle: "Organization Details",
        actions: {
          submit: "Update Organization",
        },
        statuses: {
          pending: "Updating Organization...",
        },
        fields: {
          organizationName: {
            label: "Organization Name",
            errors: {
              minLength: "Must be at least 3 characters.",
            },
          },
          organizationSlug: {
            label: "Organization Slug",
            errors: {
              invalidFormat: "Invalid slug format.",
              minLength: "Must be at least 3 characters.",
              maxLength: "Must be at most 50 characters.",
              duplicate: "Organization slug already exists.",
            },
          },
        },
      },
      deleteOrganization: {
        title: "Delete Organization",
        description:
          "The organization will be permanently deleted, including its projects, posts and comments. This action is irreversible and cannot be undone.",
        actionLabel: "Delete",
        destruciveAction: {
          title: "Delete Organization",
          description: "Are you sure you want to delete this organization?",
          actionLabel: "Delete",
          prompt: "Permanently delete organization",
        },
      },
      leaveOrganization: {
        title: "Leave Organization",
        description:
          "You will no longer have access to this organization and its projects. This action is irreversible and cannot be undone.",
        actionLabel: "Leave",
        destruciveAction: {
          title: "Leave Organization",
          description: "Are you sure you want to leave this organization?",
          actionLabel: "Leave",
        },
      },
      joinOrganization: {
        title: "Join Organization",
        description:
          "You will be able to collaborate with other members of this organization.",
        actionLabel: "Join",
      },
    },
  },
  // TODO update copy with correct pricing information (https://linear.app/omnidev/issue/OMNI-146/set-up-pricing-tiers)
  pricingPage: {
    title: "Pricing",
    pricingCard: {
      perMonth: "/month",
      getStarted: "Get Started",
      enterpriseNotice: "Contact us",
    },
    pricingTiers: {
      recommended: "Recommended",
    },
    pricingFAQ: {
      FAQ: "Frequently Asked Questions",
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
        destructiveInput: {
          prompt: "Permanently delete project",
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
      feedbackTitle: {
        label: "Title",
        placeholder: "This project has been a great success!",
      },
      feedbackDescription: {
        label: "Description",
        placeholder:
          "I really enjoy working with this project. It helped me learn a lot about the industry.",
      },
      createFeedback: {
        errors: {
          invalid: "Invalid format",
          title: "Must be at least 3 characters.",
          description: "Must be at least 10 characters.",
        },
      },
      action: {
        pending: "Submitting...",
        submit: "Submit",
        success: {
          title: "Success!",
          description: "Your feedback has been successfully submitted.",
        },
        error: {
          title: "Error",
          description: "An error occurred while submitting your feedback.",
        },
      },
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
      createComment: {
        pending: "Adding comment...",
        success: {
          title: "Success!",
          description: "Your comment has been successfully added.",
        },
        error: {
          title: "Error",
          description: "An error occurred while adding your comment.",
        },
        errors: {
          invalid: "Invalid format",
          message: "Must be at least 10 characters.",
        },
      },
      title: "Comments",
      description: "View all feedback comments.",
      textAreaPlaceholder: "I agree! This sounds like a great idea.",
      submit: "Add Comment",
      totalComments: "total comments",
      emptyState: {
        message: "No comments found. Add a comment to start the conversation.",
      },
      delete: {
        title: "Delete Comment",
        description: "Are you sure you want to delete this comment?",
        action: {
          label: "Delete",
        },
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
