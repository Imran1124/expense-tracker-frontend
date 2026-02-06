import Page from '@/components/helmet-page';
import ExpensesList from './ExpensesList';

export default function Expenses() {
  return (
    <Page title="Add Expense">
      <ExpensesList />
    </Page>
  );
}
