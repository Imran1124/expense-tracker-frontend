import { useAuth } from '@/store/useAuth';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  Settings,
  Users,
  FileText,
  Lock,
  Tag,
  BarChart3,
  X
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
    // {
    //   icon: <BarChart3 size={20} />,
    //   label: 'Analytics',
    //   href: '/expense-tracker/dashboard/analytics',
    //   access: ['User', 'Admin']
    // },
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
    // {
    //   icon: <BarChart3 size={20} />,
    //   label: 'System Reports',
    //   href: '/expense-tracker/dashboard/system-reports',
    //   access: ['Admin']
    // }
  ];

  // navItems.push({
  //   icon: <Settings size={20} />,
  //   label: 'Settings',
  //   href: '/expense-tracker/dashboard/settings'
  // });

  const isActive = (href: string) => location.pathname === href;

  // Filter nav items based on user role and access permissions
  const filteredNavItems = navItems.filter((item) => {
    if (!item.access) return true; // Show items without access restrictions
    return item.access.includes(user?.role || '');
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 w-64 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-transform duration-300 ease-in-out lg:static lg:top-0 lg:bottom-auto lg:flex-shrink-0 lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button for Mobile */}
        <div className="absolute right-4 top-4 lg:hidden">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-full overflow-y-auto p-4 pt-4">
          {/* User Profile Card */}
          <div className="mb-6 rounded-lg border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-white">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.fullName}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.role}
                </p>
              </div>
            </div>
            {isAdmin && (
              <span className="inline-block rounded-full bg-blue-600 text-white text-xs font-semibold px-3 py-1">
                Admin
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {filteredNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors relative group ${
                  isActive(item.href)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-red-500 text-white text-xs px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
                {isActive(item.href) && (
                  <div className="absolute inset-y-0 right-0 w-1 rounded-l-full bg-blue-600"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Help Section */}
          {/* <div className="mt-8 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 p-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Need Help?
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Check our documentation or contact support
            </p>
            <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 transition-colors">
              Contact Support
            </button>
          </div> */}
        </div>
      </aside>
    </>
  );
};
