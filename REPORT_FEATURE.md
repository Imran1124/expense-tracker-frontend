# Tab-Wise Report Feature Documentation

## Overview
Created a tab-wise expense report page that displays different reports based on user role.

## File Structure

### Main Files Created/Modified:

1. **`src/pages/expense-tracker/reports/index.tsx`** (Modified)
   - Main report page with role-based tab switching
   - Shows conditional tabs based on user role
   - If admin: Shows "User Report" and "Admin Report" tabs
   - If user: Shows only "User Report" tab
   - Default tab is "Admin Report" for admins, "User Report" for regular users

2. **`src/pages/expense-tracker/reports/UserReportTab.tsx`** (New)
   - Displays user's own expense report
   - Uses API: `getUserReport`
   - Features:
     - Filters: Search, Category, Date Range, Payment Method, Limit
     - Table view with pagination
     - Export to Excel functionality
     - Responsive design

3. **`src/pages/expense-tracker/reports/AdminReportTab.tsx`** (New)
   - Displays all users' expense report (admin view)
   - Uses API: `getAdminReport`
   - Features:
     - Same filters as User Report
     - Additional "User" column to show who made the expense
     - Table view with pagination
     - Export to Excel functionality
     - Responsive design

4. **`src/pages/expense-tracker/reports/AdminUserReport.tsx`** (Existing - Can be removed if no longer needed)
   - Original component, kept for reference

## API Endpoints

- **User Report**: `/expense/user/report` - Fetches user's own expenses
- **Admin Report**: `/expense/admin/report` - Fetches all users' expenses (admin only)

## Features

### User Report Tab
- Search expenses by description
- Filter by category
- Filter by date range (start and end date)
- Filter by payment method (cash, credit card, debit card, UPI, bank transfer)
- Configurable page size (10, 20, 50, 100)
- Pagination with Previous/Next buttons
- Export data to Excel file
- Responsive table layout
- Color-coded payment methods
- Currency formatted amounts (INR)

### Admin Report Tab
- All features from User Report
- Additional "User" column showing who made the expense
- View all users' expenses in one place
- Manage expenses across the organization

## Role-Based Behavior

```typescript
User Role: "admin"
├── User Report Tab ✓
└── Admin Report Tab ✓

User Role: Other (e.g., "user", "faculty")
└── User Report Tab ✓
```

## Styling

- Uses existing component library:
  - Tailwind CSS for styling
  - Dark mode support
  - Responsive grid layout
  - Custom color schemes for payment methods
  - Hover effects and transitions

- Matches project's design system with:
  - Rounded borders (rounded-xl, rounded-3xl)
  - Border colors (border-border/60, border-border/70)
  - Background colors (bg-background, bg-card, bg-muted)
  - Text styles (text-foreground, text-muted-foreground)

## Usage

The report page is automatically accessible from the expense tracker menu. Users will see:
- Tabs at the top to switch between report types
- Only relevant tabs based on their role
- Full filtering and export capabilities for their respective data

## Components Used

- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from `@/components/ui/tabs`
- `Page` (Helmet wrapper) from `@/components/helmet-page`
- Custom `useApi` hook from `@/hooks/useCustomQuery`
- `useCategoryList` from `@/hooks/useMaster`
- `useAuth` from `@/store/useAuth` for role detection

## Notes

- The implementation checks user role using `user?.role?.toLowerCase() === 'admin'`
- All filters reset to initial state when "Reset" button is clicked
- Pagination is automatic based on the response data
- Excel export includes formatted dates and payment method names
- Currency formatting is set to Indian Rupees (INR) with no decimal places
