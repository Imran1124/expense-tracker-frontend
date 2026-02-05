import {
  StatCard,
  ChartCard,
  ListCard,
  RecentExpenseItem
} from './DashboardCards';
import {
  Users,
  TrendingUp,
  AlertCircle,
  Activity,
  Plus,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/store/useAuth';
import { Modal } from '@/components/modal';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: number;
}

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      userCount: 2,
      permissions: 12
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Can manage users and view reports',
      userCount: 5,
      permissions: 8
    },
    {
      id: '3',
      name: 'User',
      description: 'Can view and manage own expenses',
      userCount: 145,
      permissions: 4
    },
    {
      id: '4',
      name: 'Guest',
      description: 'Read-only access',
      userCount: 23,
      permissions: 1
    }
  ]);

  // Mock data
  const systemStats = {
    totalUsers: 175,
    activeToday: 42,
    newThisMonth: 12,
    systemHealth: 98
  };

  const allExpenses = [
    {
      title: 'All Food & Dining',
      category: 'Food & Dining',
      amount: 2450.75,
      date: 'This Month',
      type: 'expense' as const
    },
    {
      title: 'All Transportation',
      category: 'Transportation',
      amount: 1245.5,
      date: 'This Month',
      type: 'expense' as const
    },
    {
      title: 'All Entertainment',
      category: 'Entertainment',
      amount: 890.25,
      date: 'This Month',
      type: 'expense' as const
    },
    {
      title: 'All Shopping',
      category: 'Shopping',
      amount: 1567.8,
      date: 'This Month',
      type: 'expense' as const
    }
  ];

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard 🏢
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage users, roles, and system settings for the expense tracker
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={systemStats.totalUsers}
          icon={<Users size={24} />}
          trend={8}
          trendLabel="this month"
          color="blue"
        />
        <StatCard
          title="Active Today"
          value={systemStats.activeToday}
          icon={<Activity size={24} />}
          trend={15}
          trendLabel="vs yesterday"
          color="green"
        />
        <StatCard
          title="New Users"
          value={systemStats.newThisMonth}
          icon={<TrendingUp size={24} />}
          description="This month"
          color="purple"
        />
        <StatCard
          title="System Health"
          value={`${systemStats.systemHealth}%`}
          icon={<AlertCircle size={24} />}
          description="Operating normally"
          color="yellow"
        />
      </div>

      {/* Role Management */}
      <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Manage Roles & Permissions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create and manage user roles with specific permissions
            </p>
          </div>
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 transition-colors"
          >
            <Plus size={18} />
            Create New Role
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Role Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Users
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Permissions
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {role.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {role.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 text-sm font-semibold">
                      {role.userCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {role.permissions}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Edit size={18} />
                      </button>
                      {role.userCount === 0 && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management and System Expenses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management Quick Access */}
        <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Management
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-600 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                View All Users
              </span>
              <ArrowRight size={18} />
            </button>
            <button className="w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-600 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Add New User
              </span>
              <Plus size={18} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-600 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Inactive Users
              </span>
              <AlertCircle size={18} className="text-yellow-500" />
            </button>
          </div>
        </div>

        {/* System Expenses Overview */}
        <div className="lg:col-span-2">
          <ChartCard title="Total System Expenses">
            <div className="space-y-4">
              {allExpenses.map((expense, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {expense.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {expense.category}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">
                    ${expense.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Create Role Modal */}
      <Modal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        title="Create New Role"
        maxWidth="max-w-md"
        actions={
          <>
            <button
              onClick={() => setShowRoleModal(false)}
              className="flex-1 rounded-lg border border-gray-300 dark:border-slate-600 px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowRoleModal(false);
                // Add logic to create role
              }}
              className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 font-medium text-white transition-colors"
            >
              Create Role
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role Name
            </label>
            <input
              type="text"
              placeholder="e.g., Editor"
              className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              placeholder="Describe what this role can do..."
              className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              {['Create', 'Read', 'Update', 'Delete'].map((perm) => (
                <label
                  key={perm}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    defaultChecked={perm === 'Read'}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {perm}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ArrowRight = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
