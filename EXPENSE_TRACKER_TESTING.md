# Expense Tracker - Testing & Validation Guide

## 🧪 Testing the Implementation

This guide will help you verify that all components work correctly with your backend.

---

## 1️⃣ Initial Setup Check

### Step 1: Verify Files Exist
```bash
# Check that all files were created
ls src/components/expense-form/index.tsx
ls src/components/expense-list/index.tsx
ls src/components/expense-detail/index.tsx
ls src/hooks/useExpense.tsx
ls src/types/expenseType.ts
ls src/pages/expense-tracker/create-expense/page.tsx
```

### Step 2: Verify Imports
Open `src/pages/expense-tracker/create-expense/page.tsx` and check that all imports resolve without errors.

### Step 3: Start Application
```bash
npm run dev
# or
yarn dev
```

---

## 2️⃣ Component Testing

### Test 1: Form Component Loads
1. Navigate to expense form page
2. Verify form renders with all fields:
   - Category select dropdown
   - Amount input field
   - Expense date input
   - Payment method select
   - Description textarea
   - Tags input
   - Reset and Submit buttons

### Test 2: Form Validation
1. Try submitting empty form → Should show validation errors
2. Enter negative amount → Should show error
3. Leave required fields blank → Should show errors
4. Fill all required fields correctly → Should be valid

**Expected Errors:**
- "Category is required"
- "Amount must be greater than 0"
- "Expense date is required"

### Test 3: Form Submission
1. Fill form with valid data:
   - Category: Select any category
   - Amount: 500
   - Date: Today
   - Payment Method: Cash
   - Description: Test expense
   - Tags: lunch, testing

2. Click "Create Expense"
3. Should see success message
4. Form should reset

---

## 3️⃣ List Component Testing

### Test 1: List Loads
1. Navigate to expense list tab
2. Verify table displays with columns:
   - Date
   - Category
   - Description
   - Payment Method
   - Amount
   - Actions

### Test 2: Empty State
If no expenses exist:
1. Should display "No expenses found" message
2. Should show helpful text about creating first expense

### Test 3: Expense Display
If expenses exist:
1. Amounts should format as currency (₹ symbol)
2. Dates should be formatted (DD MMM YYYY)
3. Categories should show as pills/badges
4. Payment methods should be capitalized

### Test 4: Pagination
If you have 10+ expenses:
1. Page buttons should appear
2. Clicking page buttons should load different expenses
3. Current page should be highlighted
4. Previous/Next buttons should be enabled/disabled correctly

---

## 4️⃣ Filter Testing

### Test 1: Search Filter
1. In the filters section, type in the search box
2. Expenses should filter by description/tags (debounced)
3. Clear search should reset

### Test 2: Category Filter
1. Select a category from the dropdown
2. Expenses should filter to only that category
3. Selecting "All Categories" should show all

### Test 3: Date Range Filter
1. Set start date: 2024-01-01
2. Set end date: 2024-12-31
3. Expenses should filter to that date range
4. Clearing dates should show all

### Test 4: Payment Method Filter
1. Select a payment method
2. Expenses should filter to that method only
3. "All Payment Methods" should reset filter

### Test 5: Clear Filters Button
1. Set multiple filters
2. Click "Clear Filters"
3. All filters should reset
4. All expenses should show

---

## 5️⃣ Action Button Testing

### Test 1: View Details (Eye Icon)
1. Click eye icon on any expense
2. Modal should open with full details
3. Modal should show:
   - Amount (highlighted in large font)
   - Category info
   - Payment method
   - Description
   - Tags (if any)
   - User info
   - Timestamps
4. Close button should close modal

### Test 2: Edit (Pencil Icon)
1. Click edit icon on expense
2. Should switch to form tab
3. Form should pre-fill with expense data
4. Amount should be filled correctly
5. Update some fields
6. Submit → Should show success
7. Should return to list

### Test 3: Delete (Trash Icon)
1. Click delete icon
2. Confirmation dialog should appear
3. "Yes" confirms deletion (expense disappears)
4. "No" cancels deletion (stays in list)

---

## 6️⃣ Detail Modal Testing

### Test 1: Modal Display
1. Open detail modal for any expense
2. Verify all information displays correctly
3. Verify formatting (amounts, dates)
4. Check for any missing fields

### Test 2: Modal Actions
1. Click "Edit Expense" button
   - Should close modal
   - Should go to form tab
   - Form should be pre-filled

2. Click "Delete Expense" button
   - Confirmation dialog
   - Delete works correctly

3. Click "Close" button
   - Modal closes
   - No other changes

### Test 3: Modal Responsiveness
1. Resize browser window
2. Modal should be responsive
3. On mobile, modal should fit properly

---

## 7️⃣ Dark Mode Testing

### Test 1: Theme Switch
1. Toggle dark mode in your app
2. Verify all components have dark mode styles:
   - Background colors changed
   - Text colors changed
   - Border colors changed
   - Hover states updated

### Test 2: Component Colors (Dark Mode)
Expected dark mode colors:
- Backgrounds: `dark:bg-gray-800`
- Text: `dark:text-white`
- Borders: `dark:border-gray-700`
- Inputs: `dark:bg-gray-700`

---

## 8️⃣ Error Handling Testing

### Test 1: Network Error (Manual Testing)
```typescript
// Temporarily modify hook to throw error
// Then test error display
```

### Test 2: Invalid Category
- Try updating expense with invalid category
- Should show error message

### Test 3: Duplicate Expense?
- Create same expense twice
- Both should exist (app allows duplicates)

### Test 4: Large Numbers
- Create expense with very large amount
- Should format correctly without truncation

---

## 9️⃣ Performance Testing

### Test 1: List Loading
1. Create 100+ expenses
2. List page should still load quickly
3. Pagination should work smoothly

### Test 2: Filter Performance
1. Apply filters
2. Should be responsive (no lag)
3. Search should debounce correctly

### Test 3: Modal Performance
1. Open/close modal multiple times
2. Should be smooth and quick

---

## 🔟 API Integration Testing

### Test 1: Create Expense
```bash
# Expected POST to: /expense/create
# With body:
{
  "categoryId": "123",
  "amount": 500,
  "expenseDate": "2024-02-05T10:30:00.000Z",
  "paymentMethod": "cash",
  "description": "Test",
  "tags": ["lunch", "test"]
}

# Expected response:
{
  "success": true,
  "message": "Expense created successfully.",
  "data": { expense object }
}
```

### Test 2: Get Expenses
```bash
# Expected GET to: /expense/list?page=1&limit=10&q=...
# Expected response:
{
  "success": true,
  "message": "Expenses fetched successfully.",
  "data": {
    "docs": [...],
    "totalDocs": 100,
    "page": 1,
    "pages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Test 3: Update Expense
```bash
# Expected PUT to: /expense/update/:id
# Expected response: updated expense object
```

### Test 4: Delete Expense
```bash
# Expected DELETE to: /expense/delete/:id
# Expected response:
{
  "success": true,
  "message": "Expense deleted successfully."
}
```

### Test 5: Category Loading
```bash
# check GET /category/get-all-category
# Should return array of categories
```

---

## Manual Test Cases

### User Story 1: Create Expense
1. Open app
2. Go to "Create Expense" tab
3. Fill form with sample data
4. Click "Create Expense"
5. Verify it appears in list
6. ✅ Pass/❌ Fail

### User Story 2: Search & Filter
1. Have 10+ expenses
2. Enter search term
3. Verify filtered results
4. Change category filter
5. Apply date range
6. Results should narrow
7. ✅ Pass/❌ Fail

### User Story 3: Edit Expense
1. Click edit on expense
2. Change some field (e.g., amount)
3. Submit
4. Go to list
5. Verify change persisted
6. ✅ Pass/❌ Fail

### User Story 4: Delete Expense
1. Click delete on expense
2. Confirm deletion
3. Expense disappears from list
4. ✅ Pass/❌ Fail

### User Story 5: View Details
1. Click view icon
2. Modal opens
3. All info displayed correctly
4. Can edit from modal
5. Can delete from modal
6. ✅ Pass/❌ Fail

---

## Browser Testing Checklist

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome | ✓ | ✓ | Primary |
| Firefox | ✓ | ✓ | Secondary |
| Safari | ✓ | ✓ | Test on Mac |
| Edge | ✓ | ✓ | Windows |
| Mobile Chrome | — | ✓ | Android |
| Mobile Safari | — | ✓ | iOS |

---

## Responsive Design Testing

### Mobile (375px)
- [ ] Form fields stack vertically
- [ ] Buttons are full width
- [ ] Table scrolls horizontally
- [ ] Modal fits screen
- [ ] Filters are stacked

### Tablet (768px)
- [ ] 2-column layout works
- [ ] Table is readable
- [ ] All elements fit

### Desktop (1024px+)
- [ ] Multi-column layouts work
- [ ] Full features visible
- [ ] No overflow issues

---

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Form labels present
- [ ] Error messages accessible
- [ ] Color contrasts sufficient
- [ ] Icons have aria-labels

---

## Performance Metrics

Target Performance:
- Page load: < 2 seconds
- Form submit: < 1 second
- List render: < 500ms
- Modal open: < 300ms
- Search debounce: 500ms

---

## Console Check

1. Open DevTools Console (F12)
2. Verify NO errors:
   - Type errors ❌
   - API errors ❌
   - React warnings ❌
3. Check Network tab:
   - All API calls succeed
   - No 404s
   - Proper status codes

---

## Test Summary Template

```
TEST RESULTS - Expense Tracker
Date: ____/____/2024
Tester: ________________

✓ Loaded without errors
✓ Form validation works
✓ Create expense works
✓ List displays correctly
✓ Filters work
✓ Edit functionality works
✓ Delete functionality works
✓ Detail modal works
✓ Dark mode works
✓ Mobile responsive
✓ No console errors

Issues Found:
1. ___________________
2. ___________________

Status: [ ] PASS  [ ] FAIL
```

---

## 🐛 Debugging Tips

### Form Not Submitting?
1. Check console for validation errors
2. Verify categories are loaded
3. Check network tab for API calls
4. Ensure auth token is included

### List Not Loading?
1. Check API endpoint `/expense/list`
2. Verify response format matches `IPaginatedExpenses`
3. Check for CORS errors
4. Verify user authentication

### Modal Not Opening?
1. Check className for modal visibility
2. Verify `isOpen={detailModalOpen}` is true
3. Check z-index (should be 50)
4. Look for console errors

### Validation Not Working?
1. Check Yup schema matches fields
2. Verify field names match schema
3. Check RHFTextField integration
4. Test with invalid data

---

## Quick Test Commands

```bash
# Check for errors
npm run lint

# Build for production
npm run build

# Run type checking
npx tsc --noEmit

# Check for console errors
# Open DevTools Console and refresh
```

---

This testing guide should help you verify that everything works correctly. Start with the initial setup check, then work through each section systematically.

Good luck! 🚀
