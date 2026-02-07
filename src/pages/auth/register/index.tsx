import RegisterForm from './RegisterForm';
import Page from '@/components/helmet-page';

export default function Register() {
  return (
    <Page title="Register">
      <div className="flex flex-col w-full justify-center min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-transparent dark:from-purple-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-transparent dark:from-blue-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="w-full max-w-md mx-auto px-5 py-6 relative z-10">
          <div className="rounded-3xl bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-purple-900/20 shadow-2xl dark:shadow-purple-900/30 backdrop-blur-xl overflow-hidden border border-purple-200/30 dark:border-purple-900/30">
            {/* <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white">
                    ₹
                  </div>
                </div>
                <h1 className="text-3xl font-bold">Expense Tracker</h1>
                <p className="text-white/80 mt-2 text-sm">
                  Create your account and get started.
                </p>
              </div>
            </div> */}

            <div className="p-8 lg:p-10">
              <RegisterForm />

              <div className="my-6 border-b border-purple-200/30 dark:border-purple-900/30"></div>

              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()}{' '}
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  Expense Tracker
                </span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <a
              href="/expense-tracker/auth/login"
              className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </Page>
  );
}
