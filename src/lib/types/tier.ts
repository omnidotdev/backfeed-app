/**
 * Subscription tier levels.
 * Note: This is defined locally since tier is now determined by subscription status,
 * not stored in the database schema.
 */
export enum Tier {
  Free = "free",
  Basic = "basic",
  Team = "team",
  Enterprise = "enterprise",
}
