export default function LoginTitle() {
  return (
    <div className="mx-auto max-w-sm mb-6">
      <div className="flex justify-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full shadow-md border-3 border-white dark:border-slate-700 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white">
              ₹
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold text-center mt-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Expense Tracker
      </h1>

      <p className="text-center mt-1 text-slate-500 dark:text-slate-400 text-sm">
        Welcome back! Please sign in to continue
      </p>
    </div>
  );
}
