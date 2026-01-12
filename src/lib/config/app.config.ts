// TODO: dedupe as much as possible.

/**
 * Application configuration.
 */
const app = {
  name: "Backfeed",
  description: "Streamlined user feedback 📣",
  productionUrl: "https://backfeed.omni.dev",
  docsUrl: "https://docs.omni.dev/core/backfeed",
  socials: {
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
  },
  organization: {
    name: "Omni",
    supportEmailAddress: "support@omni.dev",
  },
  breadcrumb: "Home",
  unsavedChanges: {
    description: "You have unsaved changes.",
  },
  forms: {
    errors: {
      slug: {
        regex: "Invalid slug format.",
        minLength: "Must be at least 3 characters.",
        maxLength: "Must be at most 50 characters.",
      },
      regex: {
        invalid: "Must not contain special characters.",
      },
      id: {
        format: "Invalid UUID format.",
      },
      workspace: {
        name: {
          minLength: "Must be at least 3 characters.",
          maxLength: "Must be at most 90 characters.",
        },
      },
      project: {
        name: {
          minLength: "Must be at least 3 characters.",
          maxLength: "Must be at most 60 characters.",
        },
        description: {
          maxLength: "Must be at most 240 characters.",
        },
      },
    },
  },
  globalError: {
    title: "Error",
    description:
      "We're sorry, but an error occurred while rendering this page, please try again. If the issue persists, please reach out at",
    goBack: "Back",
  },
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
  header: {
    routes: {
      pricing: {
        label: "Pricing",
      },
      docs: {
        label: "Docs",
      },
      invitations: {
        title: "Invitations",
        noInvites: "No new invitations",
        description: "You've been invited to join these workspaces.",
        join: "Join",
      },
    },
  },
  landingPage: {
    hero: {
      title: "Transform User Feedback into Actionable Insights",
      description:
        "Collect, analyze, and act on user feedback with our powerful platform. Make data-driven decisions and improve your product faster than ever.",
      imageAlt: "Hero",
      cta: {
        collect: {
          label: {
            short: "Start",
            long: "Start Collecting Feedback",
          },
        },
        docs: {
          label: {
            short: "Docs",
            long: "View Docs",
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
          title: "Feedback Collection",
          description:
            "Gather and colocate user feedback across multiple projects, products, and services.",
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
    workspaces: {
      title: "Workspaces",
      description: "Quickly view workspaces that you are a member of",
      emptyState: {
        message: "No workspaces found. Would you like to create one?",
        cta: {
          label: "Create Workspace",
        },
      },
    },
    recentFeedback: {
      endOf: "End of Feedback",
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
      viewWorkspaces: {
        label: "View All Workspaces",
      },
      newWorkspace: {
        action: {
          submit: "Create Workspace",
          pending: "Creating Workspace...",
          success: {
            title: "Success!",
            description: "Your workspace has been successfully created.",
          },
          error: {
            title: "Error",
            description: "An error occurred while creating your workspace.",
          },
        },
        label: "New Workspace",
        description: "Create a new workspace",
        workspaceName: {
          id: "Workspace Name",
          placeholder: "Omni",
          errors: {
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 90 characters.",
            invalidFormat: "Invalid workspace name.",
          },
        },
        workspaceSlug: {
          id: "Workspace Slug",
          placeholder: "omni-dev",
          error: {
            invalidFormat: "Invalid slug format.",
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 50 characters.",
            duplicate: "Workspace already exists.",
          },
        },
      },
      // TODO: This is not being used on the dashboard page currently. Move to another page location.
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
        description: "Create a new project",
        selectWorkspace: {
          label: {
            id: "workspaces",
            singular: "Workspace",
            plural: "Workspaces",
          },
          placeholder: "Select a workspace",
          error: "Please select a workspace.",
        },
        workspaceId: {
          error: {
            max: "Maximum number of projects reached.",
          },
        },
        projectName: {
          id: "Project Name",
          // TODO extract to `app.name` after i18n copy moved to locale JSON (https://linear.app/omnidev/issue/OMNI-233/extract-i18n-copy-outside-of-appconfigts-into-locale-json)
          placeholder: "Backfeed",
          errors: {
            invalid: "Invalid project name.",
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 60 characters.",
          },
        },
        projectDescription: {
          id: "Project Description",
          placeholder:
            // TODO extract to `app.name` after i18n copy moved to locale JSON (https://linear.app/omnidev/issue/OMNI-233/extract-i18n-copy-outside-of-appconfigts-into-locale-json)
            "Backfeed is an open-source feedback reporting platform.",
          minLength: "Must be at least 10 characters.",
          maxLength: "Must be at most 240 characters.",
        },
        projectSlug: {
          id: "Project Slug",
          // TODO extract to `omni-${app.name}` after i18n copy moved to locale JSON (https://linear.app/omnidev/issue/OMNI-233/extract-i18n-copy-outside-of-appconfigts-into-locale-json)
          placeholder: "omni-backfeed",
          error: {
            invalidFormat: "Invalid slug format.",
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 50 characters.",
            duplicate: "Project already exists.",
          },
        },
      },
    },
  },
  profileAccountPage: {
    breadcrumb: "Account",
    description: "View and manage your account information.",
    fields: {
      username: {
        label: "Username",
      },
      name: {
        label: "Name",
      },
      email: {
        label: "Email",
        ariaLabel: {
          show: "Show email",
          hide: "Hide email",
        },
      },
    },
    cta: {
      updateProfile: {
        label: "Manage Profile",
      },
      changePassword: {
        label: "Change Password",
      },
      deleteAccount: {
        title: "Close Your Account",
        description:
          "Want to delete your account, or need other assistance? Contact us at ",
      },
    },
  },
  profileInvitationsPage: {
    breadcrumb: "Invitations",
    description: "View and manage your workspace invitations.",
    table: {
      headers: {
        workspaceName: "Workspace Name",
        invitationDate: "Invitation Date",
        actions: "Actions",
      },
      emptyState: {
        label: "No workspace invites found.",
      },
      actions: {
        accept: {
          label: "Accept",
        },
        delete: {
          label: "Delete",
        },
      },
    },
  },
  profileWorkspacesPage: {
    breadcrumb: "Workspaces",
    description: "View and manage your workspaces.",
    table: {
      headers: {
        productName: "Product Name",
        status: "Status",
        amount: "Amount",
      },
      emptyState: {
        label:
          "No currently owned workspaces. Create a new workspace to get started.",
      },
      actions: {
        subscribe: {
          label: "Subscribe",
        },
        manageSubscription: {
          label: "Manage",
        },
      },
    },
  },
  workspacesPage: {
    breadcrumb: "Workspaces",
    header: {
      title: "Workspaces",
      cta: {
        newWorkspace: {
          label: "New Workspace",
        },
      },
    },
    emptyState: {
      message: "No workspaces found. Would you like to create one?",
      cta: {
        label: "Create Workspace",
      },
    },
    filters: {
      search: {
        placeholder: "Search all workspaces...",
      },
    },
  },
  workspacePage: {
    header: {
      cta: {
        viewProjects: {
          label: "View All Projects",
          tooltip: "No projects to view.",
        },
        newProject: {
          label: "New Project",
          tooltip: "Upgrade your plan to create more projects.",
        },
      },
    },
    projects: {
      title: "Projects",
      description: "Manage projects across this workspace",
      emptyState: {
        workspaceOwnerMessage:
          "No projects found. Would you like to create one?",
        workspaceUserMessage: "No projects found.",
        tooltip: "Upgrade your plan to create a project.",
        cta: {
          label: "Create Project",
        },
      },
    },
    metrics: {
      title: "Workspace Metrics",
      description:
        "Overview of all projects and feedback within this workspace",
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
    management: {
      title: {
        member: "Workspace Management",
        anon: "Workspace Details",
      },
      description: {
        member: "Manage workspace details, members, and more",
        anon: "View workspace members and projects",
      },
      cta: {
        manageTeam: {
          label: "Members",
        },
        invitations: {
          label: "Invitations",
        },
        settings: {
          label: "Settings",
        },
      },
    },
  },
  workspaceMembersPage: {
    breadcrumb: "Members",
    description: "View and manage the workspace's members and their roles.",
    filters: {
      search: {
        placeholder: "Search all workspace members...",
      },
      role: {
        placeholder: "Select Roles",
      },
    },
    membersMenu: {
      makeAdmin: "Give administrative privileges",
      removeAdmin: "Remove administrative privileges",
      removeMember: "Remove from workspace",
    },
    ownersTable: {
      headers: {
        owners: "Owners",
        role: "Role",
      },
    },
    membersTable: {
      headers: {
        members: "Members",
        role: "Role",
      },
    },
    cta: {
      addOwner: {
        title: "Add Owner",
        description: "Add a new owner to your workspace.",
        label: "New Owner",
        noMembersFound: "No members found",
        comboboxLabel: {
          singular: "Member",
          plural: "Members",
        },
        form: {
          rowId: {
            placeholder: "Search for or select a member...",
          },
          submit: "Add Owner",
          pending: "Adding Owner...",
          cancel: "Cancel",
        },
      },
    },
  },
  workspaceSettingsPage: {
    breadcrumb: "Settings",
    dangerZone: {
      title: "Danger Zone",
      description:
        "Below are destructive actions that are irreversible and cannot be undone.",
    },
    cta: {
      updateWorkspace: {
        title: "Update Workspace",
        memberTitle: "Workspace Details",
        action: {
          submit: "Update Workspace",
          pending: "Updating Workspace...",
        },
        fields: {
          workspaceName: {
            label: "Workspace Name",
            errors: {
              minLength: "Must be at least 3 characters.",
              maxLength: "Must be at most 90 characters.",
              invalid: "Invalid workspace name.",
            },
          },
          workspaceSlug: {
            label: "Workspace Slug",
            errors: {
              invalidFormat: "Invalid slug format.",
              minLength: "Must be at least 3 characters.",
              maxLength: "Must be at most 50 characters.",
              duplicate: "Workspace already exists.",
            },
          },
        },
      },
      deleteWorkspace: {
        title: "Delete Workspace",
        description:
          "The workspace will be permanently deleted, including its projects, posts and comments.",
        actionLabel: "Delete",
        destruciveAction: {
          title: "Delete Workspace",
          description: "Are you sure you want to delete this workspace?",
          actionLabel: "Delete",
          prompt: "permanently delete workspace",
        },
      },
      leaveWorkspace: {
        title: "Leave Workspace",
        description:
          "You will no longer have access to this workspace and its projects.",
        actionLabel: "Leave",
        destruciveAction: {
          title: "Leave Workspace",
          description: "Are you sure you want to leave this workspace?",
          actionLabel: "Leave",
        },
      },
    },
  },
  workspaceInvitationsPage: {
    breadcrumb: "Invitations",
    description: "View and manage the workspace's invitations.",
    invitationsMenu: {
      resend: "Resend",
      delete: "Delete",
    },
    invitationsTable: {
      headers: {
        email: "Email",
        invitationDate: "Invitation Date",
      },
    },
    cta: {
      inviteMember: {
        title: "Invite Members",
        description:
          "Invite new members to your workspace. Enter emails individually, or paste up to 10 comma-separated emails.",
        form: {
          email: {
            label: "Email(s)",
            placeholder: "hello@omni.dev",
          },
          submit: "Invite Members",
          pending: "Inviting Members...",
        },
        toast: {
          loading: {
            title: "Sending invite links...",
          },
          success: {
            title: "Success!",
            description: "Your invite links have been sent!",
          },
          errors: {
            title: "Error",
            default: "Failed to send invite(s)",
            currentOwner: "You're already a member.",
            duplicateInvite: "Invite already sent to an email provided.",
            currentMember: "A user is already a member.",
            alreadyInList:
              "At least one email entered or pasted is already in the list",
            maxEmails1: "Please paste less than",
            maxEmails2: "emails",
          },
        },
        emailTemplate: {
          from: {
            value1: "Backfeed Support",
          },
          subject: {
            value1: "You have been invited to join the",
            value2: "workspace on",
          },
          heading: "Join **{workspaceName}** on **Backfeed**",
          greeting: "Hello",
          statement:
            "**{inviterUsername}** ([{inviterEmail}](mailto:{inviterEmail})) invited you to join **{workspaceName}** on **Backfeed**.",
          cta: "Join the workspace",
          supportMessagePrefix:
            "If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please email us at ",
          supportEmail: "support@omni.dev",
        },
      },
    },
  },
  pricingPage: {
    title: "Pricing",
    pricingHeader: {
      title: "Simple, transparent pricing",
      description:
        "Start for free. As your business grows, upgrade to fit your needs.",
      monthly: "Monthly",
      annual: "Annual",
      savings: "save 25%",
    },
    pricingCard: {
      user: "user",
      month: "month",
      year: "year",
      getStarted: "Get started",
      enterprise: "Contact sales",
      customPricing: "Custom",
    },
    pricingMatrix: {
      feature: "Feature",
      features: {
        gdpr: "GDPR Compliance",
        communitySupport: "Community Support",
        unlimitedFeedback: "Unlimited Feedback",
        unlimitedWorkspaces: "Unlimited Workspaces",
        unlimitedProjects: "Unlimited Projects",
        webhooks: "Webhooks",
        apiAccess: "API Access",
        customTags: "Custom Tags",
        customCategories: "Custom Categories",
        customAnalytics: "Custom Analytics",
        internalCollaborationTools: "Internal Collaboration Tools",
        customBranding: "Custom Branding",
        thirdPartyIntegrations: "Third-Party Integrations",
        customSso: "Custom SSO (SAML, OpenID Connect)",
        customData: "Data Retention Policies",
        customOnboardingTraining: "Custom Onboarding & Training",
        slaBackedSupport: "SLA-backed Support",
        selfHostingAssistance: "Self-hosting Assistance",
        integrationSupportForInternalTools:
          "Integration Support for Internal Tools",
        customAiBasedFeedbackAnalysis: "Custom AI-based Feedback Analysis",
      },
    },
    pricingTiers: {
      recommended: "Recommended",
      comingSoon: "Coming Soon",
    },
    pricingFaq: {
      FAQ: "Frequently Asked Questions",
      items: [
        {
          title: "Can I switch plans later?",
          body: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be prorated the difference. When you downgrade, you'll receive credit for your next billing cycle.",
        },
        {
          title: "What payment methods do you accept?",
          body: "We accept a wide variety of payment methods, including all major credit card providers and PayPal.",
        },
        {
          title: "What happens to my data if I cancel?",
          body: "If you cancel your subscription, your data will be safe on our servers unless you explicitly reach out to us to permanently delete it, or we contact you to warn about deletion. We will never delete your data without your explicit consent or without fair warning from us.",
        },
        {
          title: "Can I self-host this software?",
          // TODO extract to `app.name` after i18n copy moved to locale JSON (https://linear.app/omnidev/issue/OMNI-233/extract-i18n-copy-outside-of-appconfigts-into-locale-json)
          body: "Yes! Backfeed is open source software. Instructions for self-hosting will be available soon.",
        },
      ],
    },
  },
  projectsPage: {
    breadcrumb: "Projects",
    header: {
      title: "Projects",
      cta: {
        newProject: {
          label: "New Project",
          tooltip: "Upgrade your plan to create more projects.",
        },
      },
    },
    emptyState: {
      workspaceOwnerMessage: "No projects found. Would you like to create one?",
      workspaceUserMessage: "No projects found.",
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
          prompt: "permanently delete project",
        },
      },
    },
  },
  projectSettingsPage: {
    breadcrumb: "Settings",
    dangerZone: {
      title: "Danger Zone",
      description:
        "Below are destructive actions that are irreversible and cannot be undone.",
    },
    cta: {
      updateProject: {
        title: "Update Project",
        description: "Edit project details.",
        memberTitle: "Project Details",
        action: {
          submit: "Update Project",
          pending: "Updating Project...",
        },
        fields: {
          projectName: {
            label: "Project Name",
            errors: {
              minLength: "Must be at least 3 characters.",
            },
          },
          projectDescription: {
            label: "Project Description",
            errors: {
              minLength: "Must be at least 10 characters.",
              maxLength: "Must be at most 240 characters.",
              invalid: "Invalid project description.",
            },
          },
          projectSlug: {
            label: "Project Slug",
            errors: {
              invalidFormat: "Invalid slug format.",
              minLength: "Must be at least 3 characters.",
              maxLength: "Must be at most 50 characters.",
              duplicate: "Project already exists.",
            },
          },
          projectSocials: {
            errors: {
              unique: "URLs must be unique.",
            },
          },
        },
      },
      updateProjectStatuses: {
        title: "Project Statuses",
        description:
          "Customize statuses that are used to track progress on feedback.",
        actions: {
          reset: {
            label: "Reset",
          },
          remove: {
            label: "Remove status",
          },
          add: {
            label: "Add Status",
          },
          // NB: these labels are the same due to the nature of the form. When adding or removing rows, the `onSubmit` errors are re-mapped, causing state to be updated for `isSubmitting`. This PR hopefully resolves this issue: https://github.com/TanStack/form/pull/1324
          update: {
            submit: "Update Statuses",
            pending: "Update Statuses",
            toast: {
              loading: {
                title: "Updating project statuses...",
              },
              success: {
                title: "Success!",
                description: "Statuses updated successfully",
              },
              error: {
                title: "Error",
                description:
                  "An error occurred while updating project statuses.",
              },
            },
          },
        },
        // ! NB: Important to keep the order of these fields intact, and each one must include a label. They are used to define the header of the update project statuses form table.
        fields: {
          isDefault: {
            label: "Default",
            info: "Indicates whether this will be the default status for newly created feedback.",
          },
          status: {
            label: "Status",
            placeholder: "New",
            errors: {
              invalid: "Invalid format.",
              minLength: "Status must be at least 3 characters.",
              maxLength: "Status must be at most 20 characters.",
            },
          },
          description: {
            label: "Description",
            placeholder: "Newly created",
            errors: {
              minLength: "Description must be at least 10 characters.",
              maxLength: "Description must be at most 40 characters.",
            },
          },
          color: {
            label: "Color",
            errors: {
              startsWith: "Invalid color format.",
              length: "Invalid color format.",
            },
          },
          remove: {
            label: "Remove",
          },
        },
      },
      deleteProject: {
        title: "Delete Project",
        description:
          "The project will be permanently deleted, including its posts and comments.",
        actionLabel: "Delete",
        destructiveAction: {
          title: "Delete Project",
          description: "Are you sure you want to delete this project?",
          actionLabel: "Delete",
          prompt: "permanently delete project",
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
      title: "Project Feedback",
      endOf: "End of Feedback",
      disabled: "Maximum amount of feedback reached.",
      search: {
        placeholder: "Search feedback...",
      },
      sortBy: {
        label: {
          id: "sort by",
          singular: "Sort By",
          plural: "Sort By",
        },
      },
      feedbackTitle: {
        label: "Title",
        placeholders: [
          "Add dark mode support",
          "Improve mobile navigation",
          "Add keyboard shortcuts",
          "Better error messages",
          "Export data to CSV",
        ],
      },
      feedbackDescription: {
        label: "Description",
        placeholders: [
          "It would be great to have a dark mode option for better visibility at night.",
          "The mobile menu is hard to use on smaller screens. A hamburger menu would help.",
          "Power users would love keyboard shortcuts for common actions like save and submit.",
          "When something goes wrong, the error messages are confusing. More detail would help.",
          "I need to export my data for reporting. A CSV export option would be really useful.",
        ],
      },
      createFeedback: {
        title: "New Feedback",
        errors: {
          invalid: "Invalid format",
          title: {
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 90 characters.",
          },
          description: {
            minLength: "Must be at least 10 characters.",
            maxLength: "Must be at most 500 characters.",
          },
        },
      },
      updateFeedback: {
        errors: {
          invalid: "Invalid format",
          title: {
            minLength: "Must be at least 3 characters.",
            maxLength: "Must be at most 90 characters.",
          },
          description: {
            minLength: "Must be at least 10 characters.",
            maxLength: "Must be at most 500 characters.",
          },
        },
        action: {
          loading: {
            title: "Updating...",
          },
          pending: "Updating...",
          submit: "Update",
          success: {
            title: "Success!",
            description: "Your feedback has been successfully updated.",
          },
          error: {
            title: "Error",
            description: "An error occurred while updating your feedback.",
          },
        },
      },
      deleteFeedback: {
        title: "Delete Feedback",
        description: "Are you sure you want to delete this feedback?",
        action: {
          label: "Delete",
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
        message: "No posts found based on the selected filters.",
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
      endOf: "End of Comments",
      disabled: "Maximum number of comments reached.",
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
          maxLengthMessage: "Must be at most 500 characters.",
        },
      },
      createReply: {
        loading: {
          title: "Replying...",
        },
        success: {
          title: "Success!",
          description: "Your reply has been successfully added.",
        },
        error: {
          title: "Error",
          description: "An error occurred while adding your reply.",
        },
        errors: {
          maxLengthMessage: "Must be at most 240 characters.",
        },
        action: {
          pending: "Replying...",
          submit: "Reply",
        },
      },
      deleteReply: {
        title: "Delete Reply",
        description: "Are you sure you want to delete this reply?",
        action: {
          label: "Delete",
        },
      },
      title: "Comments",
      description: "View all feedback comments.",
      textAreaPlaceholder: "I agree! This sounds like a great idea.",
      action: {
        pending: "Adding Comment...",
        submit: "Add Comment",
      },
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
