import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardSidebar } from './components/DashboardSidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-slate-900">
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
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center py-4 px-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span>© {new Date().getFullYear()} </span>
              <span className="font-semibold">Expense Tracker</span>
              <small>, All Rights Reserved.</small>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
