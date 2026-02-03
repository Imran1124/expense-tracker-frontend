import SideBarMenu from '@/components/sidebar';
import { Home, Calendar, Phone, CreditCard } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function StudentLayout() {
  const { pathname } = useLocation();
  const path = pathname.split('/').pop();

  // Define navigation items for cleaner rendering
  const navItems = [
    {
      to: '/lms-app',
      icon: Home,
      label: 'Home',
      active: path === 'home'
    },
    {
      to: '/lms-app/student/payment',
      icon: CreditCard,
      label: 'Fees',
      active: path === 'payment'
    },
    {
      to: '/lms-app/student/time-table',
      icon: Calendar,
      label: 'Routine',
      active: path === 'time-table'
    },
    {
      to: '/lms-app/student/emergency-contacts',
      icon: Phone,
      label: 'Emergency',
      active: path === 'emergency-contacts'
    }
  ];

  return (
    <SideBarMenu>
      <div className="mb-16 bg-slate-50 dark:bg-gray-900">
        <Outlet />
      </div>
      {['home', 'payment', 'time-table', 'emergency-contacts'].includes(
        `${path}`
      ) && (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-50 dark:bg-gray-900">
          <div className="mx-2 mb-2">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md rounded-xl border border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center justify-around h-14 px-2">
                {navItems.map((item, index) => (
                  <Link to={item.to} key={index + 1} className="w-1/4">
                    <div className="flex flex-col items-center justify-center transition-all duration-200">
                      <div
                        className={`p-1 rounded-full ${
                          item.active ? 'bg-primary/10' : ''
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={`${
                            item.active
                              ? 'text-primary font-bold'
                              : 'text-gray-500'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          item.active ? 'text-primary' : 'text-gray-500'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </SideBarMenu>
  );
}
