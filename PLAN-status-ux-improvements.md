# Backfeed: Status UX Improvements (Canny/Productlane Inspiration)

## Current State Analysis

### What's Working
| Feature | File | Status |
|---------|------|--------|
| Status badges with colors | `StatusBadge.tsx` | Working |
| Admin dropdown to change status | `FeedbackCard.tsx` | Working |
| Status filtering in sidebar | `StatusBreakdown.tsx` | Working |
| Optimistic updates | `FeedbackCard.tsx` | Working |
| Status timestamp tracking | `statusUpdatedAt` field | Working |

### What's Missing (vs Canny)

| Feature | Canny Has | Backfeed Status |
|---------|-----------|-----------------|
| Status Management UI | Settings to create/edit/delete/reorder | **Missing** (mutations exist, no UI) |
| Status change with comment | Add note when changing status | **Missing** |
| Email notifications | Notify voters on status change | **Missing** |
| Public Roadmap | Show planned/in-progress publicly | **Missing** |
| Changelog | Public feed of completed items | **Missing** |

---

## Recommended Implementation (Priority Order)

### Phase 1: Status Management UI (High Priority)
**Why:** Backend mutations already exist, just needs frontend UI.

**Add to Workspace Settings:**
- List all status templates with drag-to-reorder
- Edit status: name, displayName, color, description
- Delete status (with confirmation, check for posts using it)
- Add new status template
- Set default status for new feedback

**Files to Create/Modify:**
- `components/workspace/StatusTemplateManager.tsx` (NEW)
- `components/workspace/StatusTemplateForm.tsx` (NEW)
- `components/workspace/WorkspaceSettings.tsx` (add section)
- `lib/options/statusTemplates.ts` (NEW - query options)

**GraphQL (already exists):**
- `createStatusTemplate.mutation.graphql`
- `updateStatusTemplate.mutation.graphql`
- `deleteStatusTemplate.mutation.graphql`

---

### Phase 2: Status Change with Comment (Medium Priority)
**Why:** Quick UX win, follows Canny best practice of explaining status changes.

**Implementation:**
- When admin changes status, show optional comment modal
- Comment appears in feedback's comment thread with status change context
- Store `statusChangeComment` or add special comment type

**Files to Modify:**
- `components/feedback/FeedbackCard.tsx` - Add modal after status select
- `components/feedback/StatusChangeModal.tsx` (NEW)
- May need new GraphQL mutation or extend `updatePost`

---

### Phase 3: Status Change Notifications (Medium Priority)
**Why:** Closes the feedback loop with users.

**Implementation:**
- Email voters when feedback status changes
- Use existing Resend infrastructure (`InviteMemberEmailTemplate.tsx` pattern)
- Add notification preferences (opt-in/out)

**Files to Create:**
- `server/emails/StatusChangeEmailTemplate.tsx` (NEW)
- `backfeed-api/src/lib/notifications/statusChange.ts` (NEW)
- Database: `notification_preferences` table

---

### Phase 4: Public Roadmap (Lower Priority)
**Why:** Transparency feature, requires auth bypass for public routes.

**Implementation:**
- New public route `/workspaces/$slug/roadmap`
- Show feedback items with status: Under Review, Planned, In Progress
- No voting/commenting without auth

---

### Phase 5: Changelog (Lower Priority)
**Why:** Nice-to-have for completed items visibility.

---

## Recommended Starting Point

**Start with Phase 1 (Status Management UI)** because:
1. Backend is ready (mutations exist)
2. Enables admins to customize their workflow
3. Foundation for other features
4. Quick win - estimated 2-3 files

**Optionally add Phase 2 (Status Change with Comment)** as it's a small UX enhancement.

---

## Questions to Address When Resuming

1. **Scope:** Focus on Phase 1 only, or include Phase 2?
2. **Status level:** Keep workspace-level (current) or add project-level customization?
3. **Color picker:** Use predefined palette or full color picker?

---

## Sources
- [Canny Post Statuses](https://help.canny.io/en/articles/673583-post-statuses)
- [Canny Status Changes Best Practices](https://canny.io/blog/status-changes/)
