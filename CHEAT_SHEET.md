# Expense Dashboard - Quick Cheat Sheet

## 🎯 Essential Code Snippets

### Import Everything
```typescript
import ExpensesDashboard from '@/pages/expense-tracker/expenses-dashboard';
import { useExpense } from '@/hooks/useExpense';
import { messageService } from '@/lib';
import type { IExpense, ICreateExpensePayload } from '@/types/expenseType';
```

### Use All Hooks
```typescript
const { 
  data: expenseList, 
  isLoading, 
  error 
} = useGetExpenses(filters);

const { 
  data: categories 
} = useGetCategories();

const { 
  data: summary 
} = useGetExpenseSummary('month');

const { 
  data: report 
} = useGetExpenseReport(filters);

const { 
  data: trend 
} = useGetMonthlyTrend(6);

const { 
  mutate: createExpense, 
  isPending: isCreating 
} = useCreateExpense();

const { 
  mutate: updateExpense, 
  isPending: isUpdating 
} = useUpdateExpense();

const { 
  mutate: deleteExpense, 
  isPending: isDeleting 
} = useDeleteExpense();

const { 
  data: expenseDetail 
} = useGetExpenseById(expenseId);
```

---

## 🎬 State Management Reference

```typescript
// Dashboard state variables
const [activeView, setActiveView] = useState<'dashboard' | 'list'>('dashboard');
const [showFormModal, setShowFormModal] = useState(false);
const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
const [detailModalOpen, setDetailModalOpen] = useState(false);
const [filters, setFilters] = useState<IExpenseFilters>({
  search: '',
  categoryId: '',
  startDate: '',
  endDate: '',
  paymentMethod: '',
  page: 1
} as any);
const [filterPeriod, setFilterPeriod] = useState<'week' | 'month' | 'year' | 'all'>('month');
const [showFilters, setShowFilters] = useState(false);
```

---

## 🔘 Quick Action Handlers

### Open Modals
```typescript
// Create new
const handleOpenCreateForm = () => {
  setEditingExpense(null);
  setShowFormModal(true);
};

// View detail
const handleViewDetails = (expense: IExpense) => {
  setSelectedExpense(expense);
  setDetailModalOpen(true);
};

// Edit existing
const handleEdit = (expense: IExpense) => {
  setEditingExpense(expense);
  setShowFormModal(true);
};
```

### Submit Handlers
```typescript
// Create/Update
const handleCreateExpense = async (data: ICreateExpensePayload) => {
  try {
    editingExpense 
      ? await updateExpense({ ...data, id: editingExpense.id })
      : await createExpense(data);
    
    messageService.success('Expense saved successfully!');
    setShowFormModal(false);
  } catch (error) {
    messageService.error('Failed to save expense');
  }
};

// Delete
const handleDeleteExpense = async (id: number) => {
  if (confirm('Are you sure?')) {
    try {
      await deleteExpense(id);
      messageService.success('Expense deleted');
      setDetailModalOpen(false);
    } catch (error) {
      messageService.error('Failed to delete');
    }
  }
};
```

### Filter Handlers
```typescript
// Apply filter
const handleFilterChange = (newFilters: any) => {
  setFilters({ ...newFilters, page: 1 });
};

// Clear all
const handleClearFilters = () => {
  setFilters({
    search: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
    page: 1
  } as any);
};

// Pagination
const handleNextPage = () => {
  setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }));
};

const handlePrevPage = () => {
  setFilters(prev => ({ ...prev, page: Math.max(1, (prev.page || 1) - 1) }));
};
```

---

## 📋 Component Structure Quick View

```typescript
export default function ExpensesDashboard() {
  // States (8)
  const [activeView, ...] = useState();
  
  // Queries (6)
  const { data: expenses } = useGetExpenses();
  const { data: categories } = useGetCategories();
  const { data: summary } = useGetExpenseSummary();
  // ... more queries
  
  // Mutations (3)
  const { mutate: createExpense } = useCreateExpense();
  const { mutate: updateExpense } = useUpdateExpense();
  const { mutate: deleteExpense } = useDeleteExpense();
  
  // Handlers (8+)
  const handleOpenCreateForm = () => { ... };
  const handleEdit = (expense) => { ... };
  const handleCreateExpense = (data) => { ... };
  // ... more handlers
  
  // JSX Structure:
  return (
    <div>
      {/* Header with tabs */}
      {activeView === 'dashboard' ? (
        // Dashboard section
      ) : (
        // List section
      )}
      
      {/* Modals */}
      {showFormModal && <ExpenseForm />}
      {detailModalOpen && <ExpenseDetail />}
    </div>
  );
}
```

---

## 🎨 CSS Classes Quick Reference

### Common Gradients
```typescript
// Primary
"from-blue-500 to-blue-600"

// Success
"from-green-400 to-green-600"

// Warning
"from-amber-400 to-amber-600"

// Danger
"from-red-400 to-red-600"

// Info
"from-cyan-400 to-cyan-600"

// Premium
"from-purple-400 to-purple-500"
```

### Common Tailwind Utilities
```typescript
// Responsive grid
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Flex center
"flex items-center justify-center"

// Text sizes
"text-xs text-sm text-base text-lg text-xl"

// Padding
"p-4 md:p-6 lg:p-8"

// Margins
"mb-4 mt-2 space-y-4"

// Rounded
"rounded-md rounded-lg rounded-full"

// Borders
"border border-slate-200 border-l-4"

// Shadows
"shadow-sm shadow-md shadow-lg"

// Hover states
"hover:bg-slate-100 dark:hover:bg-slate-800"

// Dark mode
"dark:bg-slate-900 dark:text-white dark:border-slate-700"
```

---

## 🔗 API Endpoints Reference

```typescript
// From lib/apis.ts

expenseApi = {
  // CRUD
  createExpense: '/expense/create',
  getExpenseById: '/expense/:id',
  updateExpense: '/expense/update/:id',
  deleteExpense: '/expense/delete/:id',
  
  // List & Filters
  listExpenses: '/expense/list',
  
  // Analytics
  expenseReport: '/expense/report',
  expenseSummary: '/expense/summary',
  monthlyTrend: '/expense/monthly-trend',
  
  // Related
  categories: '/expense-category/list',
}

// Usage:
// GET /expense/list?page=1&limit=10
// POST /expense/create
// PUT /expense/update/:id
// DELETE /expense/delete/:id
// GET /expense/:id
// GET /expense/report?startDate=...&endDate=...
// GET /expense/summary?period=month
// GET /expense/monthly-trend?months=6
```

---

## 🎯 Common Patterns

### Pattern: Fetching with Loading State
```typescript
const { data, isLoading, error } = useGetExpenses(filters);

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error.message} />;
if (!data?.expenses?.length) return <EmptyState />;

return <ExpenseList expenses={data.expenses} />;
```

### Pattern: Form with Mutation
```typescript
const { mutate, isPending } = useCreateExpense();

const handleSubmit = async (formData: ICreateExpensePayload) => {
  mutate(formData, {
    onSuccess: () => {
      messageService.success('Created!');
      setShowModal(false);
    },
    onError: (error) => {
      messageService.error(error.message);
    }
  });
};

return (
  <form onSubmit={handleSubmit}>
    <input {...inputProps} />
    <button disabled={isPending}>
      {isPending ? 'Loading...' : 'Submit'}
    </button>
  </form>
);
```

### Pattern: Conditional Modal
```typescript
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-96">
      <h2 className="text-xl font-bold mb-4">Modal Title</h2>
      {/* Content */}
      <div className="flex gap-2 mt-6">
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  </div>
)}
```

### Pattern: Filter Management
```typescript
const [filters, setFilters] = useState({
  search: '',
  categoryId: '',
  startDate: '',
  endDate: '',
  paymentMethod: '',
  page: 1
});

const { data } = useGetExpenses(filters);

const handleFilterChange = (key: string, value: any) => {
  setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
};

const handleClearFilters = () => {
  setFilters({
    search: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
    page: 1
  });
};
```

---

## 🧪 Testing Queries

```typescript
// Test if data is loading
expect(isLoading).toBe(true);

// Test if data is fetched
expect(data).toBeDefined();
expect(data.expenses).toHaveLength(10);

// Test error handling
expect(error).toBeDefined();
expect(error.message).toContain('Failed');

// Test mutation success
await userEvent.click(submitButton);
await waitFor(() => expect(isPending).toBe(false));
expect(data).toBeDefined();

// Test mutation error
expect(error).toBeDefined();
```

---

## 🚨 Error Messages Reference

```typescript
// Common errors and solutions

"Cannot read property 'map' of undefined"
→ Data not loaded yet, add null check

"Cannot find name 'messageService'"
→ Import missing: import { messageService } from '@/lib'

"A <Select.Item /> must have a value prop"
→ Don't render empty value options, use conditional

"Invalid API endpoint"
→ Check expenseApi in lib/apis.ts

"Query not invalidating"
→ Ensure queryClient mutation callbacks fire

"Modal not closing"
→ Call setShowModal(false) after success

"Filters not applying"
→ Verify filters object passes to useGetExpenses(filters)

"Dark mode not working"
→ Add 'dark' class to root element

"Styles not applying"
→ Check Tailwind CSS build process
```

---

## 📊 Data Structures Cheat Sheet

### IExpense
```typescript
{
  id: number;
  categoryId: number;
  userId: number;
  amount: number;
  transactionDate: string;
  paymentMethod: 'CASH' | 'CARD' | 'BANK' | ...;
  description: string;
  tags: string[];
  category: { id: number; name: string };
  createdAt: string;
  updatedAt: string;
}
```

### ICreateExpensePayload
```typescript
{
  categoryId: number;
  amount: number;
  transactionDate: Date;
  paymentMethod: string;
  description: string;
  tags: string[];
}
```

### IExpenseFilters
```typescript
{
  search: string;
  categoryId: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  page: number;
}
```

### ICategory
```typescript
{
  id: number;
  name: string;
  icon?: string;
  color?: string;
}
```

---

## 🎯 Quick Integration Checklist

- [ ] Import ExpensesDashboard component
- [ ] Add route `/expenses`
- [ ] Add navigation link
- [ ] Verify API endpoints
- [ ] Check authentication headers
- [ ] Test CRUD operations
- [ ] Verify dark mode
- [ ] Test responsive layouts
- [ ] Check error handling
- [ ] Test all filters
- [ ] Verify toast notifications
- [ ] Test pagination
- [ ] Performance check
- [ ] Mobile test
- [ ] Deploy

---

## 🔍 Debugging Commands

```typescript
// Log state
console.log('Active view:', activeView);
console.log('Filters:', filters);
console.log('Expenses:', data);

// Log mutations
console.log('Mutation status:', isPending);
console.log('Error:', error);

// Test API call
fetch('/api/expense/list')
  .then(r => r.json())
  .then(d => console.log('API Response:', d));

// Check React Query cache
console.log(queryClient.getQueryData(['expenses']));

// Monitor performance
console.time('ExpensesDashboard');
// ... code
console.timeEnd('ExpensesDashboard');
```

---

## 🎯 Performance Tips

1. **Use useMemo for expensive calculations**
   ```typescript
   const totalAmount = useMemo(() => 
     expenses?.reduce((sum, e) => sum + e.amount, 0) || 0,
     [expenses]
   );
   ```

2. **Debounce search input**
   ```typescript
   const debouncedSearch = useDebounce(searchTerm, 500);
   ```

3. **Pagination instead of infinite scroll**
   - Already implemented (10 items/page)

4. **Cache queries (default 5 min)**
   ```typescript
   staleTime: 5 * 60 * 1000
   ```

5. **Code split components**
   ```typescript
   const ExpenseForm = lazy(() => import('./ExpenseForm'));
   ```

---

## 📞 Support Matrix

| Question | Answer | File |
|----------|--------|------|
| How to import? | `import ExpensesDashboard from '@/pages/...'` | INTEGRATION_GUIDE.md |
| How to use hooks? | `const { data } = useGetExpenses(filters);` | EXPENSE_TRACKER_IMPLEMENTATION.md |
| What are the types? | See `src/types/expenseType.ts` | expenseType.ts |
| How to customize? | Edit gradients, colors, breakpoints | INTEGRATION_GUIDE.md |
| What's the layout? | See DASHBOARD_VISUAL_GUIDE.md | DASHBOARD_VISUAL_GUIDE.md |
| How to test? | Use React Testing Library | INTEGRATION_GUIDE.md |
| API endpoints? | See lib/apis.ts | EXPENSE_TRACKER_IMPLEMENTATION.md |
| Need help? | Check README files | *.md files |

---

**Version**: 2.0.0  
**Keywords**: Quick reference, code snippets, patterns, debugging, API, state, handlers  
**Last Updated**: February 2024
