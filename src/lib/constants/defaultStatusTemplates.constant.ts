/**
 * Default status templates for workspaces.
 * Must match the backend definitions in AuthzSync.plugin.ts
 */
export const DEFAULT_STATUS_TEMPLATES = [
  {
    name: "open",
    displayName: "Open",
    color: "#3b82f6",
    description: "New and awaiting review",
    sortOrder: 0,
  },
  {
    name: "under_review",
    displayName: "Under Review",
    color: "#f59e0b",
    description: "Being evaluated by the team",
    sortOrder: 1,
  },
  {
    name: "planned",
    displayName: "Planned",
    color: "#8b5cf6",
    description: "Scheduled for implementation",
    sortOrder: 2,
  },
  {
    name: "in_progress",
    displayName: "In Progress",
    color: "#10b981",
    description: "Currently being worked on",
    sortOrder: 3,
  },
  {
    name: "completed",
    displayName: "Completed",
    color: "#22c55e",
    description: "Done",
    sortOrder: 4,
  },
  {
    name: "closed",
    displayName: "Closed",
    color: "#6b7280",
    description: "Will not be implemented",
    sortOrder: 5,
  },
] as const;
