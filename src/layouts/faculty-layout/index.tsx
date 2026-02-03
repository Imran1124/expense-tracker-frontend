import SideBarMenu from '@/components/sidebar';
import { Bell, Home, User } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function FacultyLayout() {
  const { pathname } = useLocation();
  const path = pathname.split('/').pop();

  return (
    <SideBarMenu>
      <div className="mb-16">
        <Outlet />
      </div>

      {['home', 'profile', 'notification', 'library-home'].includes(
        `${path}`
      ) && (
        <footer className="fixed bottom-0 left-0 right-0 z-50">
          <div className="mx-2 mb-2">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md rounded-xl border border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center justify-around h-14 px-2">
                <Link to="/lms-app" className="outline-none focus:outline-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative p-1.5 rounded-lg ${
                        path === 'home'
                          ? 'bg-primary/10'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Home
                        size={18}
                        className={
                          path === 'home' ? 'text-primary' : 'text-gray-500'
                        }
                      />
                    </div>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        path === 'home'
                          ? 'font-semibold text-primary'
                          : 'text-gray-500'
                      }`}
                    >
                      Home
                    </span>
                  </div>
                </Link>

                <Link
                  to="/lms-app/profile"
                  className="outline-none focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative p-1.5 rounded-lg ${
                        path === 'profile'
                          ? 'bg-primary/10'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <User
                        size={18}
                        className={
                          path === 'profile' ? 'text-primary' : 'text-gray-500'
                        }
                      />
                    </div>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        path === 'profile'
                          ? 'font-semibold text-primary'
                          : 'text-gray-500'
                      }`}
                    >
                      Profile
                    </span>
                  </div>
                </Link>

                <Link
                  to="/lms-app/notification"
                  className="outline-none focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative p-1.5 rounded-lg ${
                        path === 'notification'
                          ? 'bg-primary/10'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Bell
                        size={18}
                        className={
                          path === 'notification'
                            ? 'text-primary'
                            : 'text-gray-500'
                        }
                      />
                      {/* Optional notification dot */}
                      <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    </div>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        path === 'notification'
                          ? 'font-semibold text-primary'
                          : 'text-gray-500'
                      }`}
                    >
                      Notifs
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </SideBarMenu>
  );
}
