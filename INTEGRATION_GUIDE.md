# Expense Dashboard - Integration & Usage Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Import the Dashboard
```typescript
// In your router configuration file
import ExpensesDashboard from '@/pages/expense-tracker/expenses-dashboard';

// Or using index export
import ExpensesDashboard from '@/pages/expense-tracker/expenses-dashboard/index';
```

### Step 2: Add Route
```typescript
// In your routes/allRoutes.tsx or similar
{
  path: '/expenses',
  element: <ExpensesDashboard />,
  name: 'Expenses'
}
```

### Step 3: Add Navigation Link
```typescript
// In your sidebar or navigation menu
<Link to="/expenses" className="flex items-center gap-2">
  <span>💰</span> Expenses
</Link>

// Or using a button
<Button onClick={() => navigate('/expenses')}>
  View Expenses
</Button>
```

---

## 📝 Common Use Cases

### 1️⃣ Access from Another Component
```typescript
import { useNavigate } from 'react-router-dom';

export function MyComponent() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/expenses')}>
      Go to Expenses
    </button>
  );
}
```

### 2️⃣ Pass Initial State (Future Enhancement)
```typescript
// Note: Current version doesn't support this, but you can modify the component to accept props:

interface ExpensesDashboardProps {
  initialView?: 'dashboard' | 'list';
  initialFilter?: IExpenseFilters;
  defaultPeriod?: 'week' | 'month' | 'year' | 'all';
}

export default function ExpensesDashboard({ 
  initialView = 'dashboard', 
  initialFilter,
  defaultPeriod = 'month' 
}: ExpensesDashboardProps) {
  // ... rest of component
}
```

### 3️⃣ Programmatically Create Expense
```typescript
// From any component, use the hook directly
import { useCreateExpense } from '@/hooks/useExpense';

export function QuickExpenseForm() {
  const { mutate, isPending } = useCreateExpense();
  
  const handleQuickCreate = () => {
    mutate({
      categoryId: 1,
      amount: 500,
      transactionDate: new Date(),
      paymentMethod: 'CASH',
      description: 'Quick expense',
      tags: ['quick', 'mobile']
    });
  };
  
  return (
    <button onClick={handleQuickCreate} disabled={isPending}>
      {isPending ? 'Creating...' : 'Create Expense'}
    </button>
  );
}
```

### 4️⃣ Add Widget to Dashboard Page
```typescript
// In your main dashboard page
import ExpensesDashboard from '@/pages/expense-tracker/expenses-dashboard';
import { Card } from '@/components/ui/card';

export function MainDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <ExpensesDashboard />
      </Card>
      <Card>
        {/* Other widgets */}
      </Card>
    </div>
  );
}
```

### 5️⃣ Export Data (Enhancement)
```typescript
// To add CSV export to the dashboard:

export function ExportExpenses(expenses: IExpense[]) {
  const csv = expenses.map(e => 
    `${e.transactionDate},${e.category},${e.amount},${e.description}`
  ).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `expenses-${new Date().toISOString()}.csv`;
  link.click();
}
```

---

## 🎨 Customization Guide

### Change Primary Colors
```typescript
// In expenses-dashboard.tsx, replace gradient colors:

// Before:
className="from-blue-500 to-blue-600"

// After (e.g., Purple theme):
className="from-purple-500 to-purple-600"

// Common Gradient Options:
// "from-green-500 to-green-600"   - Green
// "from-indigo-500 to-indigo-600"  - Indigo
// "from-orange-500 to-orange-600"  - Orange
// "from-pink-500 to-pink-600"      - Pink
```

### Adjust Card Styling
```typescript
// Modify Summary Card appearance:

// Current: 4 columns on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Change to 2 columns:
className="grid grid-cols-1 md:grid-cols-2"

// Add shadow/border:
className="... rounded-lg border border-slate-200 shadow-lg"
```

### Modify Table Columns
```typescript
// In the expenses table, add/remove columns:

// Add a new column in the header:
<th className="px-4 py-2 text-left">Budget Status</th>

// Add in the row:
<td className="px-4 py-2">
  {expense.amount > 1000 ? '⚠️ High' : '✅ Normal'}
</td>
```

### Add More Filter Options
```typescript
// In the filters section, add new filter:

const [statusFilter, setStatusFilter] = useState<string>('');

<select 
  value={statusFilter} 
  onChange={(e) => setStatusFilter(e.target.value)}
  className="px-3 py-2 border rounded-lg"
>
  <option value="">All Status</option>
  <option value="pending">Pending</option>
  <option value="approved">Approved</option>
</select>

// Then use in query:
handleFilterChange({
  ...filters,
  status: statusFilter
});
```

### Customize Date Format
```typescript
// Replace date formatting throughout:

// Current:
new Date(expense.transactionDate).toLocaleDateString()

// Custom formats:
new Date(expense.transactionDate).toLocaleDateString('en-IN')  // Indian format
new Date(expense.transactionDate).toLocaleDateString('en-GB')  // UK format
new Date(expense.transactionDate).toLocaleDateString('de-DE')  // German format

// Or use date library:
import { format } from 'date-fns';
format(new Date(expense.transactionDate), 'dd MMM yyyy')  // 05 Feb 2024
```

### Adjust Page Size
```typescript
// In useGetExpenses hook, change items per page:

// Current: 10 items
params: new URLSearchParams({
  page: filters.page?.toString() || '1',
  limit: '10'  // Change this number
}).toString()

// Change to:
limit: '20'  // Show 20 items per page
limit: '50'  // Show 50 items per page
```

### Add Loading Skeleton Animation
```typescript
// Enhance loading state appearance:

if (isLoading) {
  return (
    <div className="space-y-4">
      <div className="h-20 bg-gradient-to-r from-slate-200 to-slate-300 
                      dark:from-slate-700 dark:to-slate-800 
                      rounded-lg animate-pulse" />
      <div className="h-40 bg-gradient-to-r from-slate-200 to-slate-300 
                      dark:from-slate-700 dark:to-slate-800 
                      rounded-lg animate-pulse" />
    </div>
  );
}
```

---

## 🔧 Advanced Configuration

### Configure Query Cache Duration
```typescript
// In useExpense hook, adjust cache time:

useQuery({
  queryKey: ['expenses', filters],
  queryFn: () => fetchExpenses(filters),
  staleTime: 5 * 60 * 1000,  // 5 minutes
  gcTime: 10 * 60 * 1000,     // 10 minutes (previously cacheTime)
})
```

### Add Request Interceptor
```typescript
// In lib/axios.ts, add error handling:

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
```

### Customize Error Messages
```typescript
// Modify error handling in handlers:

try {
  await mutate(data);
  messageService.success('Expense created successfully!');
} catch (error: any) {
  const message = error.response?.data?.message || 'An error occurred';
  messageService.error(`Failed: ${message}`);
}
```

### Add Analytics Events
```typescript
// Track user actions with analytics:

import { analytics } from '@/lib/analytics';

const handleCreateExpense = async (data: ICreateExpensePayload) => {
  try {
    analytics.track('expense_created', {
      amount: data.amount,
      category: data.categoryId,
      method: data.paymentMethod
    });
    // ... rest of handler
  } catch (error) {
    analytics.track('expense_creation_failed', { error });
  }
};
```

---

## 🛡️ Security Best Practices

### 1. Input Validation
```typescript
// Already handled by Yup in form, but verify:
const schema = yup.object().shape({
  amount: yup.number().positive().required(),
  categoryId: yup.number().required(),
  description: yup.string().max(255).required()
});
```

### 2. CSRF Protection
```typescript
// Ensure axios sends CSRF token:
const token = document.querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

interceptor.request.use(config => {
  if (token) {
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});
```

### 3. XSS Prevention
```typescript
// Never use dangerouslySetInnerHTML
// Current implementation is safe (all content in text nodes)

// ✅ Safe:
<div>{expense.description}</div>

// ❌ Unsafe (don't do this):
<div dangerouslySetInnerHTML={{ __html: expense.description }} />
```

### 4. Rate Limiting
```typescript
// Add debounce to search:
import { useDebouncedValue } from '@/hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebouncedValue(searchTerm, 500);

useEffect(() => {
  handleFilterChange({ ...filters, search: debouncedSearch });
}, [debouncedSearch]);
```

---

## 📱 Mobile Optimization

### Optimize for Touch
```typescript
// Increase touch target size:
<button className="px-4 py-3 min-h-10">  // Min 44px height
  Click Me
</button>

// Add spacing for mobile:
<div className="space-y-3 md:space-y-4 lg:space-y-6">
```

### Responsive Grid Adjustments
```typescript
// Current responsive layout:
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

// For mobile-first design, adjust:
// Mobile (< 768px): 1 column
// Tablet (768px-1024px): 2 columns  
// Desktop (> 1024px): 4 columns

// To invert (start with 4, reduce):
lg:grid-cols-4 md:grid-cols-2 grid-cols-1
```

### Optimize Images/Icons
```typescript
// Already lightweight (Lucide React)
// Ensure responsive:
<Eye size={16} className="md:w-5 md:h-5" />
<Edit2 size={16} className="md:w-5 md:h-5" />
<Trash2 size={16} className="md:w-5 md:h-5" />
```

---

## 🧪 Testing

### Unit Test Example
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ExpensesDashboard from './expenses-dashboard';

describe('ExpensesDashboard', () => {
  const queryClient = new QueryClient();
  const renderComponent = () => render(
    <QueryClientProvider client={queryClient}>
      <ExpensesDashboard />
    </QueryClientProvider>
  );

  it('renders dashboard and list tabs', () => {
    renderComponent();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('All Expenses')).toBeInTheDocument();
  });

  it('switches views on tab click', async () => {
    renderComponent();
    const listTab = screen.getByRole('button', { name: /all expenses/i });
    await userEvent.click(listTab);
    // Assert list view is shown
  });

  it('opens form modal on add button click', async () => {
    renderComponent();
    const addButton = screen.getByRole('button', { name: /add expense/i });
    await userEvent.click(addButton);
    // Assert form modal is visible
  });
});
```

### Integration Test Example
```typescript
it('creates expense end-to-end', async () => {
  renderComponent();
  
  // Click add button
  await userEvent.click(screen.getByText('+ Add Expense'));
  
  // Fill form
  await userEvent.type(screen.getByLabelText(/amount/i), '500');
  await userEvent.selectOption(
    screen.getByLabelText(/category/i), 
    'Food'
  );
  
  // Submit
  await userEvent.click(screen.getByText('Create Expense'));
  
  // Assert success
  await screen.findByText(/Success/i);
});
```

---

## 🐛 Debugging Tips

### Enable Query Debugging
```typescript
// Install React Query DevTools
npm install @tanstack/react-query-devtools

// Add to your app:
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <Routes />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### Log State Changes
```typescript
// Add logging:
const [activeView, setActiveView] = useState<'dashboard' | 'list'>('dashboard');

useEffect(() => {
  console.log('Active view changed:', activeView);
}, [activeView]);
```

### Monitor API Calls
```typescript
// Use browser DevTools Network tab
// Check:
// 1. Request URL and parameters
// 2. Response status code
// 3. Response payload
// 4. Request/Response headers
```

### Profile Performance
```typescript
// In React DevTools:
// 1. Open Profiler tab
// 2. Record interaction
// 3. Check render times
// 4. Identify slow components
```

---

## 📊 Performance Checklist

- [ ] Query caching configured (5 min default)
- [ ] Pagination implemented (10 items/page)
- [ ] Search debounced (500ms)
- [ ] Images optimized (Lucide icons)
- [ ] Unnecessary re-renders avoided (useMemo, useCallback)
- [ ] Bundle size checked (target < 500KB)
- [ ] Lazy loading implemented for modals
- [ ] Dark mode doesn't cause flickering
- [ ] Responsive breakpoints tested
- [ ] Animation performance smooth (60fps)

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module '@/pages/expense-tracker/expenses-dashboard'"
**Solution**: 
- Verify file exists at correct path
- Check tsconfig paths configuration
- Clear node_modules and reinstall

### Issue: Filters not clearing properly
**Solution**:
```typescript
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
```

### Issue: Modal not closing after submit
**Solution**:
```typescript
const handleSuccess = () => {
  setShowFormModal(false);
  queryClient.invalidateQueries({ queryKey: ['expenses'] });
  messageService.success('Success!');
};
```

### Issue: Dark mode colors not applying
**Solution**: Verify Tailwind config includes dark mode
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ... rest
};
```

---

## 📚 Related Documentation

- **PREMIUM_EXPENSE_DASHBOARD.md** - Feature overview and setup
- **DASHBOARD_VISUAL_GUIDE.md** - UI layout and structure  
- **EXPENSE_TRACKER_IMPLEMENTATION.md** - API reference
- **EXPENSE_TRACKER_QUICK_START.md** - Quick reference

---

**Version**: 2.0.0  
**Last Updated**: February 2024
