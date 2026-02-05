# Expense Management System Implementation Guide

## Overview

This is a complete React/TypeScript expense management system built with React Hook Form, TanStack Query, and Tailwind CSS. The system provides full CRUD operations with advanced filtering, pagination, and a modern UI.

## Components

### 1. **ExpenseForm** (`src/components/expense-form/index.tsx`)
A reusable form component for creating and editing expenses.

**Features:**
- React Hook Form integration with Yup validation
- Support for both create and edit modes
- Auto-fill expense date with today's date
- Tag parsing (comma-separated input)
- Loading states with ButtonLoading component
- Responsive grid layout
- Dark mode support

**Props:**
```typescript
interface ExpenseFormProps {
  isEdit?: boolean;
  initialData?: IExpense;
  categories?: ICategory[];
  onSuccess?: () => void;
  onSubmit: (data: ICreateExpensePayload) => Promise<any>;
  isLoading?: boolean;
}
```

**Usage Example:**
```typescript
import { ExpenseForm } from '@/components';
import { useCreateExpense } from '@/hooks/useExpense';

function MyComponent() {
  const { mutateAsync } = useCreateExpense();

  return (
    <ExpenseForm
      onSubmit={(data) => mutateAsync(data)}
      categories={categories}
      onSuccess={() => console.log('Success!')}
    />
  );
}
```

### 2. **ExpenseList** (`src/components/expense-list/index.tsx`)
A feature-rich table component for displaying and managing expenses.

**Features:**
- Advanced filtering (search, category, date range, payment method)
- Sortable pagination
- Currency formatting (INR)
- Date formatting
- Action buttons (view, edit, delete)
- Empty state handling
- Loading skeleton
- Responsive design
- Dark mode support

**Props:**
```typescript
interface ExpenseListProps {
  expenses: IPaginatedExpenses | undefined;
  isLoading?: boolean;
  onEdit?: (expense: IExpense) => void;
  onDelete?: (expenseId: string) => Promise<void>;
  onFiltersChange?: (filters: IExpenseFilters) => void;
  onViewDetails?: (expense: IExpense) => void;
  categories?: Array<{ _id: string; categoryName: string }>;
}
```

**Usage Example:**
```typescript
import { ExpenseList } from '@/components';
import { useGetExpenses, useDeleteExpense } from '@/hooks/useExpense';

function MyComponent() {
  const [filters, setFilters] = useState<IExpenseFilters>({ page: 1, limit: 10 });
  const { data: expenses, isLoading } = useGetExpenses(filters);
  const { mutateAsync: deleteExpense } = useDeleteExpense();

  return (
    <ExpenseList
      expenses={expenses}
      isLoading={isLoading}
      onDelete={deleteExpense}
      onFiltersChange={setFilters}
      categories={categories}
    />
  );
}
```

### 3. **ExpenseDetail** (`src/components/expense-detail/index.tsx`)
A modal component displaying detailed information about a single expense.

**Features:**
- Full expense details display
- Category and user information
- Tag display
- Timestamp information
- Action buttons (edit, delete)
- Responsive modal with scroll
- Dark mode support

**Props:**
```typescript
interface ExpenseDetailProps {
  expense: IExpense;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (expense: IExpense) => void;
  onDelete?: (expenseId: string) => Promise<void>;
}
```

**Usage Example:**
```typescript
import { ExpenseDetail } from '@/components';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [expense, setExpense] = useState<IExpense | null>(null);

  return (
    <>
      <ExpenseDetail
        expense={expense!}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onEdit={(exp) => console.log('Edit:', exp)}
        onDelete={(id) => console.log('Delete:', id)}
      />
    </>
  );
}
```

## Custom Hooks

### `useGetExpenses(filters)`
Fetches paginated expenses with optional filters.

```typescript
const { data: expenses, isLoading, error } = useGetExpenses({
  page: 1,
  limit: 10,
  q: 'search term',
  categoryId: 'cat-id',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  paymentMethod: 'credit_card'
});
```

### `useCreateExpense()`
Creates a new expense and invalidates related queries.

```typescript
const { mutateAsync, isPending } = useCreateExpense();
await mutateAsync({
  categoryId: '...',
  amount: 500,
  expenseDate: new Date().toISOString(),
  paymentMethod: 'cash',
  description: 'Lunch',
  tags: ['food', 'office']
});
```

### `useUpdateExpense()`
Updates an existing expense.

```typescript
const { mutateAsync, isPending } = useUpdateExpense();
await mutateAsync({
  id: 'expense-id',
  data: { /* updated data */ }
});
```

### `useDeleteExpense()`
Deletes an expense (soft delete).

```typescript
const { mutateAsync, isPending } = useDeleteExpense();
await mutateAsync('expense-id');
```

### `useGetCategories()`
Fetches all available expense categories.

```typescript
const { data: categories, isLoading } = useGetCategories();
```

### `useGetExpenseReport(filters)`
Generates analytical reports based on filters.

```typescript
const { data: report } = useGetExpenseReport({
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  groupBy: 'category' // or 'paymentMethod', 'month', 'day'
});
```

### `useGetExpenseSummary(period)`
Gets dashboard summary statistics.

```typescript
const { data: summary } = useGetExpenseSummary('month'); // 'week' | 'month' | 'year' | 'all'
```

### `useGetMonthlyTrend(months)`
Gets monthly trend data for charts.

```typescript
const { data: trend } = useGetMonthlyTrend(6); // last 6 months
```

## Types

All TypeScript types are defined in `src/types/expenseType.ts`:

```typescript
interface IExpense {
  _id?: string;
  userId: string;
  categoryId: string;
  amount: number;
  expenseDate: string | Date;
  paymentMethod?: string;
  description?: string;
  tags?: string[];
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  category?: { _id: string; categoryName: string; description?: string };
  user?: { _id: string; fullName: string; email: string };
}

interface ICreateExpensePayload {
  categoryId: string;
  amount: number;
  expenseDate: string | Date;
  paymentMethod?: string;
  description?: string;
  tags?: string[];
}

interface IExpenseFilters {
  page?: number;
  limit?: number;
  q?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  paymentMethod?: string;
}
```

## Integration Example

Here's a complete example of integrating all components together:

```typescript
import { useState, useCallback } from 'react';
import { 
  ExpenseForm, 
  ExpenseList, 
  ExpenseDetail 
} from '@/components';
import {
  useGetExpenses,
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
  useGetCategories
} from '@/hooks/useExpense';
import { IExpense, ICreateExpensePayload, IExpenseFilters } from '@/types/expenseType';

export default function ExpenseManagement() {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [filters, setFilters] = useState<IExpenseFilters>({ page: 1, limit: 10 });
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);

  // Data fetching
  const { data: expenses, isLoading } = useGetExpenses(filters);
  const { data: categories = [] } = useGetCategories();

  // Mutations
  const { mutateAsync: createExpense, isPending: isCreating } = useCreateExpense();
  const { mutateAsync: updateExpense, isPending: isUpdating } = useUpdateExpense();
  const { mutateAsync: deleteExpense } = useDeleteExpense();

  // Handlers
  const handleCreate = useCallback(async (data: ICreateExpensePayload) => {
    await createExpense(data);
    setActiveTab('list');
  }, [createExpense]);

  const handleUpdate = useCallback(async (data: ICreateExpensePayload) => {
    if (!editingExpense?._id) return;
    await updateExpense({ id: editingExpense._id, data });
    setEditingExpense(null);
    setActiveTab('list');
  }, [editingExpense, updateExpense]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteExpense(id);
    setDetailOpen(false);
  }, [deleteExpense]);

  const handleEdit = useCallback((expense: IExpense) => {
    setEditingExpense(expense);
    setActiveTab('create');
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Expense Management</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('create')}
          className={activeTab === 'create' ? 'font-bold text-blue-600' : ''}
        >
          {editingExpense ? 'Edit' : 'Create'}
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={activeTab === 'list' ? 'font-bold text-blue-600' : ''}
        >
          List
        </button>
      </div>

      {/* Content */}
      {activeTab === 'create' && (
        <ExpenseForm
          isEdit={!!editingExpense}
          initialData={editingExpense || undefined}
          categories={categories}
          onSubmit={editingExpense ? handleUpdate : handleCreate}
          isLoading={isCreating || isUpdating}
          onSuccess={() => setEditingExpense(null)}
        />
      )}

      {activeTab === 'list' && (
        <ExpenseList
          expenses={expenses}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onFiltersChange={setFilters}
          onViewDetails={(expense) => {
            setSelectedExpense(expense);
            setDetailOpen(true);
          }}
          categories={categories}
        />
      )}

      {/* Modal */}
      {selectedExpense && (
        <ExpenseDetail
          expense={selectedExpense}
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
```

## Styling

The system uses Tailwind CSS with full dark mode support. All components respond to:
- `dark:` prefix for dark mode
- Responsive breakpoints (`sm:`, `md:`, `lg:`)
- Transitions and hover states
- Color schemes: blue for primary, green for amounts, red for deletion, amber for editing

## Payment Methods

Available payment methods:
- Cash
- Credit Card
- Debit Card
- Bank Transfer
- Digital Wallet
- Check
- Other

## API Integration

The system integrates with these backend endpoints:

**Expenses:**
- `POST /expense/create` - Create expense
- `GET /expense/list` - Get expenses with pagination
- `GET /expense/detail` - Get expense by ID
- `PUT /expense/update` - Update expense
- `DELETE /expense/delete` - Delete expense

**Analytics:**
- `GET /expense/report` - Get detailed reports
- `GET /expense/summary` - Get dashboard summary
- `GET /expense/trend` - Get monthly trends

**Categories:**
- `GET /category/get-all-category` - Get all categories

## Best Practices

1. **Always handle loading and error states** in parent components
2. **Use the custom hooks** instead of direct axios calls for consistency
3. **Validate dates** using ISO format (YYYY-MM-DD)
4. **Format amounts** using the provided formatAmount utility
5. **Group tags** in the form input using comma separation
6. **Provide feedback** with messageService for all operations
7. **Use TypeScript interfaces** for type safety

## Dependencies

- react-hook-form
- @hookform/resolvers
- yup
- @tanstack/react-query
- lucide-react (for icons)
- axios
- tailwindcss

## File Structure

```
src/
├── components/
│   ├── expense-form/          # Form component
│   ├── expense-list/          # List component
│   ├── expense-detail/        # Detail modal
│   └── index.expense.ts       # Exports
├── hooks/
│   └── useExpense.tsx         # Custom hooks
├── types/
│   └── expenseType.ts         # TypeScript interfaces
├── pages/
│   └── expense-tracker/
│       └── create-expense/
│           └── page.tsx       # Main page
└── lib/
    └── apis.ts                # API endpoints
```

## Notes

- All dates are handled in ISO format internally
- Amounts are stored and displayed in INR currency
- Soft deletes are used (status field set to 0)
- Pagination defaults to page 1, limit 10
- Search works across description, paymentMethod, and tags
- Categories are populated from backend
- User information is auto-populated from authentication context
