# 🎨 Expense Tracker - Visual Guide & Page Previews

## Header - Top Navigation Bar

```
┌─────────────────────────────────────────────────────────────────────┐
│  ☰  [$]  Expense Tracker    [🔔] [🌙]  [👤 User] ▼              │
└─────────────────────────────────────────────────────────────────────┘

Features:
• Sidebar toggle button (☰)
• Logo with branded icon ($)
• Notifications bell with unread indicator
• Theme toggle (sun/moon icon)
• User profile dropdown with menu
```

---

## Sidebar - Left Navigation Panel

```
┌──────────────────────┐
│ [👤 User Avatar]     │
│ John Doe             │
│ Admin ■              │
├──────────────────────┤
│ 📊 Dashboard         │
│ ➕ Add Expense        │
│ 📈 Analytics         │
│ 🏷️  Categories        │
│ 📋 Reports           │
│ 👥 Users             │
│ 🔐 Manage Roles (NEW)│
│ 📊 System Reports    │
│ ⚙️  Settings          │
├──────────────────────┤
│ Need Help?           │
│ [Contact Support]    │
└──────────────────────┘
```

---

## 👤 User Dashboard

```
┌────────────────────────────────────────────────────────────────────┐
│ Welcome back, John! 👋                                             │
│ Here's your financial overview for this month                      │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐      │
│  │ Total Expenses  │ │Monthly Budget   │ │Remaining Budget │      │
│  │   $2,450.75     │ │   $5,000.00     │ │  $2,549.25      │      │
│  │ ↗ 12% vs month  │ │ Monthly limit   │ │ ↗ 8% available  │      │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘      │
│  ┌─────────────────┐                                               │
│  │  Daily Average  │                                               │
│  │    $81.69       │                                               │
│  │ Per day spend   │                                               │
│  └─────────────────┘                                               │
│                                                                     │
├─ Monthly Budget Overview ────────────────────────────────────────┤
│ You've spent 49% of your monthly budget                            │
│                                                                     │
│ [████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 49%         │
│ $2,450.75 spent of $5,000.00                                       │
│                                                                     │
├─ Expense Categories ──────────────────────────────────────────────┤
│                                                                     │
│ Food & Dining       [██████████████░] $857.50  (35%)              │
│ Transportation      [██████████░░░░░] $490.15  (20%)              │
│ Entertainment       [██████░░░░░░░░░] $367.61  (15%)              │
│ Shopping            [██████████░░░░░] $490.15  (20%)              │
│ Others              [███░░░░░░░░░░░░] $245.08  (10%)              │
│                                                                     │
├─ Quick Actions ───────────────────────────────────────────────────┤
│                                                                     │
│  [➕ Add New Expense]  [→ View All Expenses]                       │
│                                                                     │
├─ Recent Expenses ─────────────────────────────────────────────────┤
│                                                                     │
│ 🛒 Grocery Shopping        Food & Dining    -$125.50   Today     │
│ ⛽ Gas Station             Transportation   -$65.00    Yesterday  │
│ 🍽️  Restaurant              Food & Dining    -$45.75   2 days ago│
│ 🎬 Movie Tickets           Entertainment    -$30.00   3 days ago│
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 👨‍💼 Admin Dashboard

```
┌────────────────────────────────────────────────────────────────────┐
│ Admin Dashboard 🏢                                                  │
│ Manage users, roles, and system settings                            │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐   │
│  │  Total Users     │ │ Active Today     │ │   New Users      │   │
│  │      175         │ │      42          │ │      12          │   │
│  │ 8% this month    │ │ ↑ 15% vs yes     │ │ This month       │   │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘   │
│  ┌──────────────────┐                                              │
│  │ System Health    │                                              │
│  │      98%         │                                              │
│  │ Operating OK     │                                              │
│  └──────────────────┘                                              │
│                                                                     │
├─ Manage Roles & Permissions ──────────────────────────────────────┤
│                                                                    │
│ Create, manage, and delete user roles with permissions            │
│                                                    [➕ Create New Role]│
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ Role       │ Description          │Users │ Perms │ Status   │  │
│ ├──────────────────────────────────────────────────────────────┤  │
│ │ Admin      │ Full system access   │  2   │  12   │ ✓ Active │  │
│ │ Manager    │ Team & reporting     │  5   │  8    │ ✓ Active │  │
│ │ User       │ Personal expenses    │ 145  │  4    │ ✓ Active │  │
│ │ Guest      │ Read-only access     │  23  │  1    │ ✓ Active │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
├─ User Management ─────────────────────────────────────────────────┤
│                                                                    │
│ [→ View All Users]  [➕ Add New User]  [⚠️ Inactive Users]         │
│                                                                    │
├─ Total System Expenses ───────────────────────────────────────────┤
│                                                                    │
│ All Food & Dining        $2,450.75                                │
│ All Transportation       $1,245.50                                │
│ All Entertainment          $890.25                                │
│ All Shopping             $1,567.80                                │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## ➕ Add Expense Page

```
┌────────────────────────────────────────────────────────────────────┐
│ Add New Expense                                                     │
│ Track your spending by adding a new expense                        │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─ EXPENSE FORM ──────────────────┐  ┌─ TIPS ────────────────┐  │
│ │                                  │  │                        │  │
│ │ What did you spend on? *         │  │ 💡 Tips:              │  │
│ │ [Grocery Shopping________________] │  │                        │  │
│ │                                  │  │ 1. Be specific        │  │
│ │ Amount (USD) *                   │  │ 2. Use categories    │  │
│ │ [$_________.00________________]   │  │ 3. Add tags           │  │
│ │                                  │  │ 4. Keep receipts      │  │
│ │ Category                         │  │ 5. Review weekly      │  │
│ │ [Food & Dining____________▼]     │  │                        │  │
│ │                                  │  ├─ Budget Status ───────┤  │
│ │ Date           Payment Method    │  │                        │  │
│ │ [2026-02-05]  [Cash____________] │  │ 49% of budget used    │  │
│ │                                  │  │                        │  │
│ │ Notes (Optional)                 │  │ You're on track! ✓    │  │
│ │ [________________                │  │                        │  │
│ │  ________________                │  └────────────────────────┘  │
│ │  ________________]                │                              │
│ │                                  │                              │
│ │ Tags (Optional)                  │                              │
│ │ [____________][ADD]              │                              │
│ │ [grocery] [shopping] [food]      │                              │
│ │                                  │                              │
│ │ [➕ Add Expense] [Clear Form]     │                              │
│ │                                  │                              │
│ └──────────────────────────────────┘                              │
│                                                                     │
│ ✅ SUCCESS: Expense added successfully!                            │
│    Your expense has been recorded.                                │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Role Management Page

```
┌────────────────────────────────────────────────────────────────────┐
│ Role Management                                                     │
│ Create and manage user roles with permissions [➕ Create New Role]  │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────┐   │
│  │Total Roles │ │Active Roles│ │Total Users │ │  Permissions │   │
│  │     4      │ │     4      │ │    175     │ │      12      │   │
│  └────────────┘ └────────────┘ └────────────┘ └──────────────┘   │
│                                                                     │
│ Search: [🔍search roles...________________________]                │
│                                                                     │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │Role │ Description        │Users│ Perms│Status  │ Actions   │  │
│ ├──────────────────────────────────────────────────────────────┤  │
│ │Admin│ Full access        │ 2   │ 12   │✓Active │ ✏️ ⓘ      │  │
│ │  └─ Created 2024-01-15                                       │  │
│ │                                                              │  │
│ │Mgr. │ Manager team       │ 5   │ 8    │✓Active │ ✏️ 🗑️ ⓘ  │  │
│ │  └─ Created 2024-02-20                                       │  │
│ │                                                              │  │
│ │User │ Personal use       │145  │ 4    │✓Active │ ✏️ ⓘ      │  │
│ │  └─ Created 2024-01-10                                       │  │
│ │                                                              │  │
│ │Guest│ Read-only          │ 23  │ 1    │✓Active │ ✏️ 🗑️ ⓘ  │  │
│ │  └─ Created 2023-12-01                                       │  │
│ │                                                              │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘

Modal: Create/Edit Role
┌────────────────────────────────────┐
│ Create New Role                    │
├────────────────────────────────────┤
│                                    │
│ Role Name:                         │
│ [_________________________]        │
│                                    │
│ Description:                       │
│ [_______________________]          │
│ [_______________________]          │
│                                    │
│ Permissions:                       │
│                                    │
│ USERS                              │
│ ☐ Create Users                     │
│ ☑ Edit Users                       │
│ ☐ Delete Users                     │
│ ☑ View Users                       │
│                                    │
│ ROLES                              │
│ ☐ Create Roles                     │
│ ☐ Manage Roles                     │
│ ☐ Delete Roles                     │
│                                    │
│ DATA                               │
│ ☑ View Own Data                    │
│ ☑ Edit Own Data                    │
│                                    │
│ [Cancel]  [Create Role]            │
│                                    │
└────────────────────────────────────┘
```

---

## 🔔 Profile Dropdown Menu

```
┌──────────────────────────────────┐
│ John Doe                         │
│ john@example.com                 │
├──────────────────────────────────┤
│                                  │
│ 👤 Profile Settings              │
│                                  │
│ 🚪 Logout                        │
│                                  │
└──────────────────────────────────┘
```

---

## 🔔 Notifications - Bell Menu

```
┌──────────────────────────────────────┐
│           Notifications              │
├──────────────────────────────────────┤
│                                      │
│ ⚠️ Expense limit approaching         │
│    You've spent 80% of your budget  │
│    this month                        │
│                                      │
│ 📊 Weekly report ready              │
│    Your weekly expense summary is   │
│    ready to view                    │
│                                      │
└──────────────────────────────────────┘
```

---

## 📱 Mobile View - Sidebar Collapsed

```
Sidebar Collapsed:
┌─────────────────┐
│ ☰  [$] Expense  │
│    [🔔][🌙][👤]│
└─────────────────┘
│                 │
│ Main Content    │
│                 │
└─────────────────┘

Sidebar Open (Overlay):
┌────────────────────┐
│ [X] [👤 User]      │
│ John Doe | Admin ■ │
├────────────────────┤
│ 📊 Dashboard       │
│ ➕ Add Expense     │
│ 📈 Analytics       │
│ 🏷️  Categories     │
│ 📋 Reports         │
│ ⚙️  Settings        │
│                    │
│ Help              │
│ [Contact Support] │
│                    │
└────────────────────┘
```

---

## Color Palette Reference

```
┌─────────────────────────────────────────────────────┐
│ PRIMARY COLORS                                      │
├─────────────────────────────────────────────────────┤
│ ■ Blue #2563EB        (Main actions, active)        │
│ ■ Dark Blue #1D4ED8   (Hover, dark mode variant)    │
│                                                     │
│ SUCCESS COLORS                                      │
│ ■ Green #16A34A       (Success, positive trends)    │
│ ■ Dark Green #15803D  (Dark mode variant)           │
│                                                     │
│ WARNING COLORS                                      │
│ ■ Yellow #EAB308      (Warnings, high budget)       │
│ ■ Dark Yellow #CA8A04 (Dark mode variant)           │
│                                                     │
│ DANGER COLORS                                       │
│ ■ Red #DC2626         (Errors, expenses)            │
│ ■ Dark Red #991B1B    (Dark mode variant)           │
│                                                     │
│ NEUTRAL COLORS                                      │
│ ■ White (Light mode background)                     │
│ ■ Gray #6B7280 (Text, secondary)                    │
│ ■ Slate #1E293B (Dark mode background)              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Interactive Elements

### Buttons
```
Primary (Blue):
[➕ Add Expense]
Hover: Darker blue
Active: Darker blue with shadow

Secondary (Gray):
[Cancel]
Hover: Light gray background

Danger (Red):
[🗑️ Delete]
Hover: Light red background
```

### Inputs & Forms
```
Text Input:
[_________________________]
Focus: Blue border + ring

Select Dropdown:
[Food & Dining____________▼]
Open: Shows list of options

Checkbox:
☑ Permission name
☐ Disabled permission

Toggle:
[🌙] Dark Mode Toggle
```

### Cards
```
┌─────────────────────────┐
│ Card Title              │
│                         │
│ Content here...         │
│                         │
│ Border: Light gray/   │
│ Hover: Subtle shadow  │
│                         │
└─────────────────────────┘
```

---

## Animation & Transitions

### Hover Effects
- Buttons: Slight color transition (200ms)
- Cards: Subtle shadow increase
- Links: Color change smooth transition

### Page Transitions
- 300ms ease-in-out
- Smooth fade in/out

### Sidebar Collapse
- 300ms ease transition
- Smooth transform effect

### Theme Toggle
- Instant color switch
- Smooth element transitions

---

## Spacing & Layout

### Page Layout
```
Content Area:
- Top padding: 24px
- Side padding: 32px (desktop), 24px (mobile)
- Bottom padding: 24px
```

### Cards & Sections
```
- Card padding: 24px internal
- Section gap: 24px vertical
- Component gap: 12px
```

### Typography
```
H1: 30px, bold, margin-bottom: 8px
Subtitle: 14px, gray-500, margin-bottom: 24px
H3: 18px, semibold, margin-bottom: 16px
Body: 14px, gray-900, line-height: 1.5
Label: 12px, semibold, gray-700, margin-bottom: 8px
```

---

## Responsive Design

### Desktop (1024px+)
- Full sidebar visible
- 2-3 column layouts
- Full-width tables
- All elements visible

### Tablet (768px - 1023px)
- Collapsible sidebar
- 2 column layouts
- Scrollable tables
- Optimized spacing

### Mobile (< 768px)
- Sidebar overlay
- 1 column layouts
- Horizontal scroll tables
- Reduced padding
- Stack all components

---

*Visual Guide - Expense Tracker Layout*
*Version 1.0.0 - February 5, 2026*
