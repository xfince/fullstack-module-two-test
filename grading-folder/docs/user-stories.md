# TaskFlow User Stories

## Epic 1: User Authentication

### US-001: User Registration
**As a** new user  
**I want to** create an account with email and password  
**So that** I can access the task management system

**Acceptance Criteria:**
- User can enter name, email, and password
- Password must be at least 6 characters
- Email must be unique
- User receives confirmation upon successful registration
- User is automatically logged in after registration

### US-002: User Login
**As a** registered user  
**I want to** log in with my credentials  
**So that** I can access my tasks

**Acceptance Criteria:**
- User can enter email and password
- System validates credentials
- User is redirected to dashboard on success
- Error message shown for invalid credentials
- JWT token is generated and stored

### US-003: User Logout
**As a** logged-in user  
**I want to** log out of the system  
**So that** my account remains secure

**Acceptance Criteria:**
- User can click logout button
- Session is terminated
- User is redirected to login page
- Token is removed from storage

---

## Epic 2: Task Management

### US-004: Create Task
**As a** user  
**I want to** create a new task  
**So that** I can track work items

**Acceptance Criteria:**
- User can enter task title (required)
- User can add description (optional)
- User can set priority (low/medium/high)
- User can set status (todo/in-progress/completed)
- User can assign task to team member
- User can set due date
- Task appears in task list immediately

### US-005: View All Tasks
**As a** user  
**I want to** see all my tasks  
**So that** I can track my workload

**Acceptance Criteria:**
- Dashboard displays all tasks
- Tasks show title, priority, status, assignee
- Tasks show due date if set
- Tasks display comment count
- Empty state shown when no tasks exist

### US-006: Update Task
**As a** user  
**I want to** update task details  
**So that** I can keep information current

**Acceptance Criteria:**
- User can change task status
- Quick actions available (Start, Complete, Reopen)
- Changes are saved immediately
- Real-time updates visible to other users
- Success notification shown

### US-007: Delete Task
**As an** admin user  
**I want to** delete tasks  
**So that** I can remove outdated items

**Acceptance Criteria:**
- Only admin users can delete tasks
- Confirmation required before deletion
- Task is removed from all views
- Real-time update sent to all users

### US-008: Filter Tasks
**As a** user  
**I want to** filter tasks by status, priority, and assignee  
**So that** I can focus on relevant items

**Acceptance Criteria:**
- User can filter by status
- User can filter by priority
- User can filter by assignee
- User can search by task title
- User can clear all filters
- Results update immediately

---

## Epic 3: Real-Time Collaboration

### US-009: Real-Time Task Updates
**As a** user  
**I want to** see task updates in real-time  
**So that** I stay informed of changes

**Acceptance Criteria:**
- Task changes appear without page refresh
- Updates visible to all connected users
- Socket connection maintained
- Reconnection on network interruption

### US-010: Notifications
**As a** user  
**I want to** receive notifications for task assignments  
**So that** I know when I have new work

**Acceptance Criteria:**
- Notification appears when task assigned
- Notification bell shows unread count
- User can view notification list
- User can mark notifications as read
- Notifications auto-expire after 30 days

### US-011: Email Notifications
**As a** user  
**I want to** receive email notifications  
**So that** I'm informed even when not in the app

**Acceptance Criteria:**
- Email sent when task assigned
- Email contains task details and link
- Email styled professionally
- Email failures don't block task creation

---

## Epic 4: User Management

### US-012: View Team Members
**As a** user  
**I want to** see all team members  
**So that** I can assign tasks appropriately

**Acceptance Criteria:**
- User list displays all active users
- Shows name and email
- Available in task assignment dropdown

### US-013: Update Profile
**As a** user  
**I want to** update my profile information  
**So that** my details are current

**Acceptance Criteria:**
- User can change name
- User can change email
- User can update password
- Changes saved immediately
- Confirmation shown on success

---

## Epic 5: Task Comments

### US-014: Add Comments
**As a** user  
**I want to** add comments to tasks  
**So that** I can collaborate with team members

**Acceptance Criteria:**
- User can add text comment
- Comment shows user name and avatar
- Comment shows timestamp
- Assignee receives notification
- Comments visible in real-time

---

## Future Enhancements

- File attachments for tasks
- Task tags/labels
- Calendar view
- Activity logs
- Team workspaces
- Advanced search
- Export tasks to CSV
- Dark mode
- Mobile app