import { Image } from '@/components/image';
import { BASE_URI } from '@/lib';

export default function LoginTitle() {
  return (
    <div className="mx-auto max-w-sm mb-6">
      <div className="flex justify-center">
        <div className="relative">
          <Image
            src={`${BASE_URI}/${localStorage.getItem('schoolLogo')}`}
            width={80}
            height={80}
            alt="School Logo"
            className="rounded-full shadow-md border-3 border-white dark:border-slate-700 transition-all duration-300 hover:shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
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
