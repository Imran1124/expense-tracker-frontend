import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardSidebar } from './components/DashboardSidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900">
      {/* Header */}
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 space-y-6">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="border-t border-purple-200/30 dark:border-purple-900/30 bg-gradient-to-r from-white via-blue-50/50 to-purple-50/30 dark:from-slate-800 dark:via-purple-900/20 dark:to-slate-800 text-center py-6 px-6 backdrop-blur-sm">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span>© {new Date().getFullYear()} </span>
              <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                Expense Tracker
              </span>
              <small className="text-gray-500 dark:text-gray-400">
                , All Rights Reserved.
              </small>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
