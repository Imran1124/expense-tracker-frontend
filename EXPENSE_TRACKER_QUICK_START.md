# Expense Management System - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Import Components
```typescript
import {
  ExpenseForm,
  ExpenseList,
  ExpenseDetail
} from '@/components/index.expense';

import {
  useGetExpenses,
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
  useGetCategories
} from '@/hooks/useExpense';

import { IExpense, ICreateExpensePayload, IExpenseFilters } from '@/types/expenseType';
```

### Step 2: Basic Setup
```typescript
import { useState } from 'react';

export default function MyExpensePage() {
  const [filters, setFilters] = useState<IExpenseFilters>({ 
    page: 1, 
    limit: 10 
  });
  
  // Fetch data
  const { data: expenses, isLoading } = useGetExpenses(filters);
  const { data: categories = [] } = useGetCategories();
  
  // Create/Update/Delete operations
  const { mutateAsync: createExpense, isPending: isCreating } = useCreateExpense();
  const { mutateAsync: updateExpense, isPending: isUpdating } = useUpdateExpense();
  const { mutateAsync: deleteExpense } = useDeleteExpense();

  return (
    <div className="space-y-8">
      <h1>Expense Management</h1>
      {/* Add components here */}
    </div>
  );
}
```

### Step 3: Add Form Component
```typescript
<ExpenseForm
  isEdit={false}
  categories={categories}
  onSubmit={async (data) => {
    await createExpense(data);
  }}
  isLoading={isCreating}
/>
```

### Step 4: Add List Component
```typescript
<ExpenseList
  expenses={expenses}
  isLoading={isLoading}
  onFiltersChange={setFilters}
  onViewDetails={(expense) => console.log('View:', expense)}
  onEdit={(expense) => console.log('Edit:', expense)}
  onDelete={async (id) => await deleteExpense(id)}
  categories={categories}
/>
```

### Step 5: Add Detail Modal
```typescript
const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
const [modalOpen, setModalOpen] = useState(false);

<ExpenseDetail
  expense={selectedExpense!}
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onEdit={(expense) => console.log('Edit:', expense)}
  onDelete={async (id) => await deleteExpense(id)}
/>
```

## Common Tasks

### Display All Expenses
```typescript
const { data: expenses } = useGetExpenses({ page: 1, limit: 10 });

<ExpenseList
  expenses={expenses}
  categories={categories}
/>
```

### Filter Expenses
```typescript
const [filters, setFilters] = useState<IExpenseFilters>({
  page: 1,
  limit: 10,
  categoryId: 'cat-123',
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});

const { data: expenses } = useGetExpenses(filters);
```

### Create New Expense
```typescript
const { mutateAsync: createExpense } = useCreateExpense();

await createExpense({
  categoryId: 'cat-456',
  amount: 500,
  expenseDate: new Date().toISOString(),
  paymentMethod: 'credit_card',
  description: 'Team lunch',
  tags: ['lunch', 'team']
});
```

### Edit Expense
```typescript
const { mutateAsync: updateExpense } = useUpdateExpense();

await updateExpense({
  id: 'expense-id',
  data: {
    amount: 600,
    description: 'Team lunch at cafe'
  }
});
```

### Delete Expense
```typescript
const { mutateAsync: deleteExpense } = useDeleteExpense();

await deleteExpense('expense-id');
```

### Get Analytics
```typescript
// Get summary
const { data: summary } = useGetExpenseSummary('month');

// Get report
const { data: report } = useGetExpenseReport({
  startDate: '2024-01-01',
  groupBy: 'category'
});

// Get trend
const { data: trend } = useGetMonthlyTrend(6);
```

## Component Prop Examples

### ExpenseForm Props
```typescript
<ExpenseForm
  isEdit={false}                    // Create mode
  initialData={expense}             // Pre-fill data (edit mode)
  categories={categories}           // Available categories
  onSuccess={() => {}}              // Called after successful submit
  onSubmit={createExpense}          // Submit handler
  isLoading={isCreating}            // Show loading state
/>
```

### ExpenseList Props
```typescript
<ExpenseList
  expenses={expenses}               // Paginated expense data
  isLoading={false}                 // Show loading skeleton
  onEdit={(expense) => {}}          // Edit button click
  onDelete={deleteExpense}          // Delete button click
  onFiltersChange={setFilters}      // Filters changed
  onViewDetails={(expense) => {}}   // View details click
  categories={categories}           // For category display
/>
```

### ExpenseDetail Props
```typescript
<ExpenseDetail
  expense={expense}                 // Expense to display
  isOpen={true}                     // Modal visibility
  onClose={() => {}}                // Close button click
  onEdit={(expense) => {}}          // Edit button click
  onDelete={deleteExpense}          // Delete button click
/>
```

## Validation

The form automatically validates:
- **categoryId**: Required
- **amount**: Required, positive number
- **expenseDate**: Required, valid date
- **paymentMethod**: Optional
- **description**: Optional
- **tags**: Optional

## Formatting

The list automatically formats:
- **Amounts**: Currency format (INR)
- **Dates**: DD MMM YYYY format
- **Payment Methods**: Uppercase with spaces

## Dark Mode

All components work with dark mode out of the box using:
- `dark:` Tailwind prefix
- No additional props needed

Example dark classes:
```
dark:bg-gray-800
dark:text-white
dark:border-gray-700
```

## Error Handling

Use `messageService` for user feedback:
```typescript
import { messageService } from '@/lib';

try {
  await createExpense(data);
  messageService.success('Expense created!');
} catch (error) {
  messageService.error('Failed to create expense');
}
```

## Tips & Tricks

1. **Batch Operations**: Use mutation callbacks to update multiple expenses
   ```typescript
   const createMutation = useCreateExpense();
   createMutation.mutate(data, {
     onSuccess: () => {
       // Refetch list
     }
   });
   ```

2. **Debounce Search**: Add debouncing to search input
   ```typescript
   const [search, setSearch] = useState('');
   const debouncedSearch = useDebounce(search, 500);
   
   const { data } = useGetExpenses({
     q: debouncedSearch
   });
   ```

3. **Date Range Presets**: Create reusable date filter configs
   ```typescript
   const dateRanges = {
     thisMonth: {
       startDate: '2024-02-01',
       endDate: '2024-02-29'
     },
     lastMonth: {
       startDate: '2024-01-01',
       endDate: '2024-01-31'
     }
   };
   ```

4. **Pagination**: Easy page navigation
   ```typescript
   const handleNextPage = () => {
     setFilters(f => ({ 
       ...f, 
       page: (f.page || 1) + 1 
     }));
   };
   ```

## File Locations

- **Components**: `src/components/expense-*`
- **Hooks**: `src/hooks/useExpense.tsx`
- **Types**: `src/types/expenseType.ts`
- **Page**: `src/pages/expense-tracker/create-expense/page.tsx`
- **API Endpoints**: `src/lib/apis.ts`

## Next Steps

1. Add the pre-built page: Import from `src/pages/expense-tracker/create-expense/page.tsx`
2. Add routing: Configure routes to the expense pages
3. Add analytics: Use the report/summary/trend hooks for dashboards
4. Add export: Implement CSV/PDF export using the data
5. Add notifications: Connect with your notification system

## Support

For more detailed information, see:
- `EXPENSE_TRACKER_IMPLEMENTATION.md` - Complete documentation
- Component files for JSDoc comments
- Type definitions in `expenseType.ts`
