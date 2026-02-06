import { useAuth } from '@/store/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu,
  LogOut,
  User,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Settings
} from 'lucide-react';
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
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200 dark:border-purple-900/30 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 shadow-lg dark:shadow-purple-900/20 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left Side - Logo and Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center rounded-xl p-2 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/40 dark:hover:to-blue-900/40 transition-all duration-300 hover:shadow-md"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-lg shadow-purple-500/30 animate-pulse">
              <span className="text-sm font-bold text-white">₹</span>
            </div>
            <h1 className="hidden text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 sm:block">
              Expense Tracker
            </h1>
          </div>
        </div>

        {/* Right Side - Actions and Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative rounded-xl p-2 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 transition-all duration-300 hover:shadow-md group"
            >
              <Bell
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-lg shadow-red-500/50"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-purple-200 dark:border-purple-900/30 bg-white dark:bg-slate-800 shadow-2xl dark:shadow-purple-900/30 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 transition-all">
                <div className="border-b border-purple-100 dark:border-purple-900/30 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-4 py-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    Notifications
                  </h3>
                </div>
                <div className="divide-y divide-purple-100 dark:divide-purple-900/30 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-purple-500">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Expense limit approaching
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      You've spent 80% of your budget this month
                    </p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-blue-500">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
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
            className="rounded-xl p-2 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/40 dark:hover:to-orange-900/40 transition-all duration-300 hover:shadow-md"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="animate-spin-slow" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/40 dark:hover:to-blue-900/40 transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/30">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName}
                    className="h-9 w-9 rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-white">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  {user?.role || 'User'}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-purple-200 dark:border-purple-900/30 bg-white dark:bg-slate-800 shadow-2xl dark:shadow-purple-900/30 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 transition-all z-50">
                <div className="border-b border-purple-100 dark:border-purple-900/30 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-4 py-4">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    {user?.email}
                  </p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 rounded-lg transition-all duration-200">
                    <User
                      size={18}
                      className="text-purple-600 dark:text-purple-400"
                    />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 rounded-lg transition-all duration-200">
                    <Settings
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                    Settings
                  </button>
                  <div className="border-t border-purple-100 dark:border-purple-900/30 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 rounded-lg transition-all duration-200"
                  >
                    <LogOut size={18} />
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
