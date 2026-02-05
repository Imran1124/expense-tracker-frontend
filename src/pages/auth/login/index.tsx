import LoginForm from './LoginForm';
import Page from '@/components/helmet-page';

export default function Login() {
  return (
    <Page title="Login">
      <div className="flex flex-col w-full justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="w-full max-w-sm mx-auto px-5 py-6 rounded-xl bg-white dark:bg-slate-800 shadow-md transition-all duration-300">
          {/* <LoginTitle /> */}

          <LoginForm />

          <div className="my-4 border-b border-slate-200 dark:border-slate-700"></div>

          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Expense Tracker.
          </div>
        </div>
      </div>
    </Page>
  );
}
