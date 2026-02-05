# 🗺️ Expense Tracker - Application Sitemap & Navigation Flow

## Overall Application Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD LAYOUT                              │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │            HEADER (DashboardHeader)                         │ │
│ │  [Logo] [Toggle] [Notifications] [Theme] [Profile Dropdown] │ │
│ └─────────────────────────────────────────────────────────────┘ │
├──────────────────────┬──────────────────────────────────────────┤
│                      │                                            │
│   SIDEBAR            │         MAIN CONTENT                       │
│ (DashboardSidebar)   │       (Outlet - Page Content)             │
│                      │                                            │
│ □ Dashboard          │ ┌────────────────────────────────────┐   │
│ □ Add Expense        │ │  HOME PAGE / DASHBOARD             │   │
│ □ Analytics          │ │  ┌──────────────────────────────┐ │   │
│ □ Categories         │ │  │ User Dashboard (Regular)      │ │   │
│ □ Reports            │ │  │ • Statistics Cards            │ │   │
│ □ Settings           │ │  │ • Budget Progress             │ │   │
│ □ [Users]*           │ │  │ • Category Breakdown          │ │   │
│ □ [Manage Roles]*    │ │  │ • Recent Expenses             │ │   │
│ □ [System Reports]*  │ │  └──────────────────────────────┘ │   │
│                      │ │                                      │   │
│ Help & Support       │ │ ┌──────────────────────────────┐ │   │
│                      │ │ │ Admin Dashboard (Admin)       │ │   │
│                      │ │ │ • System Stats                │ │   │
│                      │ │ │ • Role Management Table       │ │   │
│                      │ │ │ • User Management             │ │   │
│                      │ │ │ • System Expenses             │ │   │
│                      │ │ └──────────────────────────────┘ │   │
│                      │ └────────────────────────────────────┘   │
│                      │ ┌────────────────────────────────────┐   │
│                      │ │  ADD EXPENSE PAGE                  │   │
│                      │ │  • Expense Form                    │   │
│                      │ │  • Tips Sidebar                    │   │
│                      │ │  • Success Notification            │   │
│                      │ └────────────────────────────────────┘   │
│                      │ ┌────────────────────────────────────┐   │
│                      │ │  OTHER PAGES (Placeholders)        │   │
│                      │ │  • Analytics                       │   │
│                      │ │  • Categories                      │   │
│                      │ │  • Reports                         │   │
│                      │ │  • Users Management (Admin)        │   │
│                      │ │  • Role Management (Admin)         │   │
│                      │ │  • System Reports (Admin)          │   │
│                      │ │  • Settings                        │   │
│                      │ └────────────────────────────────────┘   │
│                      │                                            │
├──────────────────────┴──────────────────────────────────────────┤
│                         FOOTER                                   │
│            © 2026 Expense Tracker. All Rights Reserved.         │
└─────────────────────────────────────────────────────────────────┘

* Admin Only Features
```

---

## 📋 Navigation Flow by User Role

### Regular User Flow
```
Login → Home/Dashboard
         ├─→ Dashboard (View Stats)
         ├─→ Add Expense (Create)
         ├─→ Analytics (View)
         ├─→ Categories (View/Organize)
         ├─→ Reports (Export/View)
         └─→ Settings (Personal)
```

### Admin User Flow
```
Login → Home/Admin Dashboard
        ├─→ Dashboard (System Stats)
        │   ├─→ View All Users
        │   ├─→ Add New User
        │   └─→ Manage Roles
        │
        ├─→ Users (Full CRUD)
        │   ├─→ View All Users
        │   ├─→ Create User
        │   ├─→ Edit User
        │   ├─→ Delete User
        │   └─→ Assign Roles
        │
        ├─→ Manage Roles (Full CRUD)
        │   ├─→ View All Roles
        │   ├─→ Create Role
        │   ├─→ Edit Role & Permissions
        │   └─→ Delete Role
        │
        ├─→ System Reports
        │   ├─→ User Analytics
        │   ├─→ Expense Analytics
        │   └─→ System Health
        │
        ├─→ All User Features
        │   ├─→ Add Personal Expense
        │   ├─→ View Personal Dashboard
        │   └─→ Export Personal Reports
        │
        └─→ Settings (Global + Personal)
```

---

## 🎨 Component Hierarchy

```
DashboardLayout
│
├── DashboardHeader
│   ├── Logo & Branding
│   ├── Sidebar Toggle
│   ├── Notifications Dropdown
│   ├── Theme Toggle
│   └── Profile Dropdown
│       ├── User Info
│       ├── Profile Settings
│       └── Logout
│
├── DashboardSidebar
│   ├── User Profile Card
│   │   ├── Avatar
│   │   ├── Name
│   │   ├── Role
│   │   └── Admin Badge
│   ├── Navigation Items
│   │   ├── Dashboard
│   │   ├── Add Expense
│   │   ├── Analytics
│   │   ├── Categories
│   │   ├── Reports
│   │   ├── Settings
│   │   ├── [Users] - Admin
│   │   ├── [Manage Roles] - Admin
│   │   └── [System Reports] - Admin
│   └── Help Section
│       └── Contact Support
│
├── Main Content Area (Outlet)
│   │
│   ├── Home Page (Router)
│   │   ├── UserDashboard
│   │   │   ├── Welcome Section
│   │   │   ├── StatCard x4
│   │   │   ├── Budget Progress
│   │   │   ├── Expense Categories Chart
│   │   │   ├── Quick Actions
│   │   │   └── Recent Expenses List
│   │   │
│   │   └── AdminDashboard
│   │       ├── Welcome Section
│   │       ├── StatCard x4 (System Stats)
│   │       ├── Role Management Table
│   │       │   ├── Create Role Modal
│   │       │   ├── Edit Role Modal
│   │       │   └── Delete Role Option
│   │       ├── User Management Panel
│   │       └── System Expenses Chart
│   │
│   ├── Add Expense Page
│   │   ├── Expense Form
│   │   │   ├── Title Input
│   │   │   ├── Amount Input
│   │   │   ├── Category Select
│   │   │   ├── Date Picker
│   │   │   ├── Payment Method Select
│   │   │   ├── Description Textarea
│   │   │   └── Tags Input
│   │   ├── Form Actions
│   │   │   ├── Submit Button
│   │   │   └── Clear Button
│   │   └── Tips Sidebar
│   │
│   ├── Role Management Page
│   │   ├── Statistics Cards x4
│   │   ├── Search Box
│   │   ├── Roles Table
│   │   │   ├── Role Info
│   │   │   ├── User Count
│   │   │   ├── Permission Count
│   │   │   ├── Status Badge
│   │   │   └── Actions (Edit/Delete)
│   │   └── Create Role Modal
│   │       ├── Role Name Input
│   │       ├── Description Textarea
│   │       └── Permission Checkboxes (Grouped)
│   │
│   └── Other Pages (Placeholders)
│       ├── Analytics
│       ├── Categories
│       ├── Reports
│       ├── Users
│       ├── System Reports
│       └── Settings
│
└── Footer
    └── Copyright Info
```

---

## 📱 Responsive Layout States

### Desktop (≥ 1024px)
```
┌────────────────────────────────────────────────┐
│ Header                                         │
├──────────┬──────────────────────────────────────┤
│ Sidebar  │                                      │
│ (Visible)│  Main Content                        │
│  264px   │  (Full Width)                        │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### Tablet (768px - 1023px)
```
┌────────────────────────────────────┐
│ Header                             │
├────────┬──────────────────────────┤
│Sidebar │  Main Content            │
│(Hidden)│  (Full Width)            │
│Display │                          │
│on Click│                          │
└────────┴──────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────────┐
│ Header [☰]           │
├──────────────────────┤
│ Main Content         │
│ (Full Width)         │
│                      │
└──────────────────────┘

[Sidebar Overlay on Click]
┌──────────────────────┐
│ Sidebar With Close   │
└──────────────────────┘
```

---

## 🔐 Access Control Matrix

| Feature | Regular User | Admin | Super Admin |
|---------|:------------:|:-----:|:-----------:|
| Dashboard | ✅ | ✅ | ✅ |
| Add Expense | ✅ | ✅ | ✅ |
| View Own Expenses | ✅ | ✅ | ✅ |
| Analytics | ✅ | ✅ | ✅ |
| Categories | ✅ | ✅ | ✅ |
| Reports | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ |
| Users Management | ❌ | ✅ | ✅ |
| Manage Roles | ❌ | ✅ | ✅ |
| System Reports | ❌ | ✅ | ✅ |
| System Settings | ❌ | ✅ | ✅ |

---

## 📊 Data Flow

### User Dashboard Data Flow
```
useAuth() → Get User Data
         → Fetch Expenses (API)
         → Calculate Stats
         → Group by Category
         → Format for Display
         → Render Dashboard
```

### Admin Dashboard Data Flow
```
useAuth() → Get Admin User
         → Fetch All Users (API)
         → Fetch All Expenses (API)
         → Fetch All Roles (API)
         → Calculate System Stats
         → Render Admin Dashboard
```

---

## 🔗 URL Routes

```
/expense-tracker/
├── home                    ← Dashboard (Auto-selects User/Admin)
├── create-expense          ← Add Expense Form
├── analytics               ← Analytics Dashboard
├── categories              ← Category Management
├── reports                 ← Reports Page
├── settings                ← Settings Page
├── users                   ← User Management (Admin)
├── roles                   ← Role Management (Admin)
└── system-reports          ← System Reports (Admin)
```

---

## 🎯 Key Interactions

### 1. Add Expense Workflow
```
User clicks "Add Expense"
    ↓
Form Displayed
    ↓
User fills form
    ↓
Validation checks (required fields)
    ↓
Submit button enabled/disabled
    ↓
User clicks "Add Expense"
    ↓
API call to create expense
    ↓
Success notification
    ↓
Form cleared for new entry
```

### 2. Role Management Workflow
```
Admin clicks "Manage Roles"
    ↓
Role Management Page loaded
    ↓
List of roles displayed
    ↓
Admin clicks "Create New Role" or Edit icon
    ↓
Modal opens with form
    ↓
Admin selects permissions
    ↓
Admin submits
    ↓
API call to create/update role
    ↓
List refreshed
```

### 3. User Login to Dashboard
```
User logs in
    ↓
Auth token stored
    ↓
useAuth() hook detects authentication
    ↓
Check user role (isAdmin?)
    ↓
Navigate to /expense-tracker/home
    ↓
Home page checks role
    ↓
Render appropriate dashboard
    ↓
Sidebar shows role-based items
```

---

## 📈 Growth Path

### Phase 1 (Current)
- ✅ Layout & Navigation
- ✅ Dashboard Views (User & Admin)
- ✅ Basic Expense Tracking
- ✅ Role Management

### Phase 2 (Next)
- Expense Analytics
- Advanced Category Management
- Report Generation
- User Management

### Phase 3 (Future)
- Real-time Notifications
- Recurring Expenses
- Budget Alerts
- Data Export (PDF/Excel)
- Mobile App
- Multi-currency Support

---

## 🎨 Design Consistency

### Typography
- **H1**: text-3xl, bold (Main headings)
- **H3**: text-lg, semibold (Section headings)
- **Body**: text-sm, regular (Content)
- **Labels**: text-xs, semibold, gray-700 (Form labels)

### Spacing
- **Page padding**: 24-32px (6-8 units)
- **Section gap**: 24px (6 units)
- **Card padding**: 24px (6 units)
- **Component gap**: 12-16px (3-4 units)

### Interactions
- **Hover effects**: subtle background change
- **Focus states**: Blue ring outline
- **Active states**: Blue background
- **Transitions**: 200-300ms

---

**Last Updated**: February 5, 2026
**Version**: 1.0.0
