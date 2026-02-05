import { useAuth } from '@/store/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, LogOut, User, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const DashboardHeader = ({
  sidebarOpen,
  onToggleSidebar
}: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left Side - Logo and Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-400">
              <span className="text-sm font-bold text-white">$</span>
            </div>
            <h1 className="hidden text-xl font-bold text-gray-900 dark:text-white sm:block">
              Expense Tracker
            </h1>
          </div>
        </div>

        {/* Right Side - Actions and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
                <div className="border-b border-gray-200 dark:border-slate-700 px-4 py-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-slate-700 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Expense limit approaching
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      You've spent 80% of your budget this month
                    </p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Weekly report ready
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Your weekly expense summary is ready
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-white">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role || 'User'}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
                <div className="border-b border-gray-200 dark:border-slate-700 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <div className="p-1">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                    <User size={16} />
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
