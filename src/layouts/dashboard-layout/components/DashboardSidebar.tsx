import { useAuth } from '@/store/useAuth';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  Users,
  FileText,
  Lock,
  X,
  Zap
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
  roles?: string[];
  badge?: string;
  access?: string[];
};

export const DashboardSidebar = ({
  isOpen,
  onClose
}: DashboardSidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'Admin';

  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      href: '/expense-tracker/dashboard/home',
      access: ['User', 'Admin']
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Add Expense',
      href: '/expense-tracker/dashboard/create-expense',
      access: ['User', 'Admin']
    },
    {
      icon: <PieChart size={20} />,
      label: 'Categories',
      href: '/expense-tracker/dashboard/categories',
      access: ['Admin']
    },
    {
      icon: <FileText size={20} />,
      label: 'Reports',
      href: '/expense-tracker/dashboard/reports',
      access: ['User', 'Admin']
    },
    {
      icon: <Users size={20} />,
      label: 'Users',
      href: '/expense-tracker/dashboard/users',
      access: ['Admin']
    },
    {
      icon: <Lock size={20} />,
      label: 'Manage Roles',
      href: '/expense-tracker/dashboard/roles',
      badge: 'New',
      access: ['Admin']
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  // Filter nav items based on user role and access permissions
  const filteredNavItems = navItems.filter((item) => {
    if (!item.access) return true;
    return item.access.includes(user?.role || '');
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden transition-all"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 w-72 border-r border-purple-200/50 dark:border-purple-900/30 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900 transition-transform duration-300 ease-in-out shadow-2xl dark:shadow-purple-900/20 lg:static lg:top-0 lg:bottom-auto lg:flex-shrink-0 lg:transform-none lg:shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button for Mobile */}
        <div className="absolute right-4 top-4 lg:hidden z-50">
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-full overflow-y-auto p-5 pt-6 space-y-6">
          {/* User Profile Card */}
          <div className="rounded-2xl border border-purple-200/50 dark:border-purple-900/30 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/30 dark:via-blue-900/20 dark:to-cyan-900/20 p-5 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-lg shadow-purple-500/40">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-white">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {user?.fullName}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-300 font-semibold">
                  {user?.role}
                </p>
              </div>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 w-fit">
                <Zap size={14} />
                Admin Access
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-3">
              Menu
            </p>
            {filteredNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-white shadow-lg shadow-purple-500/40'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/40 dark:hover:to-blue-900/40'
                }`}
              >
                <span
                  className={`flex-shrink-0 transition-transform duration-300 ${isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'}`}
                >
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2.5 py-1 font-bold animate-pulse shadow-lg shadow-red-500/50">
                    {item.badge}
                  </span>
                )}
                {!isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Quick Info Card */}
          <div className="rounded-2xl border border-cyan-200/50 dark:border-cyan-900/30 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                <TrendingUp size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  Smart Tracking
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Monitor your spending with ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
