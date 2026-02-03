import { Image } from '@/components/image';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Page from '@/components/helmet-page';
import { useTranslate } from '@/hooks/useTanslate';
import { useApi } from '@/hooks/useCustomQuery';
import { feeDemandApi } from '@/lib';
import SkeletonLoader from '@/components/loaders/SkeletonLoader';
import { Separator } from '@/components/ui/separator';
import { STUDENT_FEE_TYPE_LIST } from '../src/pages/lms-app/student/fee/payment/type';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  Book,
  Bell,
  User,
  Clipboard,
  Bus,
  LibraryIcon,
  Receipt,
  Clock,
  UserCheck,
  NotebookPen
} from 'lucide-react';



export default function Home() {
  const { user } = useAuth();
  const { i18n } = useTranslate();

  const feeDemandData = useApi<STUDENT_FEE_TYPE_LIST>({
    api: `${feeDemandApi.feeDemandByStudentId}`,
    options: {
      enabled: true
    }
  });

  if (feeDemandData.isLoading) {
    return (
      <div className="p-6">
        <Card className="mt-1">
          <CardContent>
            <div className="py-2">
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          </CardContent>
        </Card>
        <Separator className="my-4 mb-2" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index + 1}>
              <CardContent className="mt-5">
                <SkeletonLoader />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: <User className="h-6 w-6" />,
      title: i18n.t('details'),
      path: '/lms-app/student/details',
      color: 'bg-blue-50'
    },
    {
      icon: <Receipt className="h-6 w-6" />,
      title: i18n.t('history'),
      path: '/lms-app/student/payment-history',
      color: 'bg-purple-50'
    },
    {
      icon: <User className="h-6 w-6" />,
      title: i18n.t('profile'),
      path: '/lms-app/profile',
      color: 'bg-green-50'
    },
    {
      icon: <Clipboard className="h-6 w-6" />,
      title: i18n.t('verifyReceipt'),
      path: '/lms-app/student/receipt-verify',
      color: 'bg-yellow-50'
    },
    {
      icon: <CalendarIcon className="h-6 w-6" />,
      title: i18n.t('timeTable'),
      path: '/lms-app/student/time-table',
      color: 'bg-red-50'
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: i18n.t('attendance'),
      path: '/lms-app/student/attendance-list',
      color: 'bg-indigo-50'
    },
    {
      icon: <LibraryIcon className="h-6 w-6" />,
      title: i18n.t('library'),
      path: '/lms-app/student/library-home',
      color: 'bg-pink-50'
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: i18n.t('circularEvents'),
      path: '/lms-app/circular-events',
      color: 'bg-orange-50'
    },
    {
      icon: <NotebookPen  className="h-6 w-6" />,
      title: i18n.t('circularEvents'),
      path: '/lms-app/assignment',
      color: 'bg-orange-50'
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: i18n.t('faculty'),
      path: '/lms-app/student/your-faculty',
      color: 'bg-teal-50'
    },
    {
      icon: <Bus className="h-6 w-6" />,
      title: i18n.t('transport'),
      path: '/lms-app/student/transport',
      color: 'bg-cyan-50'
    }
  ];

  return (
    <Page title="Home">
      <main className="flex-1 bg-gray-50 min-h-screen">
        {/* Header Section with Student Profile */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-b-3xl pt-6 pb-24 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="100" fill="white" />
              <path
                d="M130 70L70 130M70 70L130 130"
                stroke="white"
                strokeWidth="12"
              />
            </svg>
          </div>

          <div className="flex items-center gap-4 px-6 relative z-10">
            <div className="h-16 w-16 rounded-full bg-white p-1 shadow-lg">
              <Image
                src={'/pro.png'}
                alt="Avatar"
                className="overflow-hidden rounded-full w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">{user?.fullName}</h1>
              <p className="text-white/80 text-sm">
                Class - 5 (A) | Roll No. - {user?.student?.rollNo}
              </p>
            </div>
          </div>
        </div>

        {/* Fee Card Section */}
        <div className="px-6 -mt-16 relative z-20">
          <Card className="rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5">
              {feeDemandData?.data?.data?.length! <= 0 ? (
                <div className="bg-green-100 rounded-lg px-4 py-3 flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-green-700 font-medium">
                    Your fee is up to date!
                  </p>
                </div>
              ) : (
                <div className="bg-red-100 rounded-lg px-4 py-3 flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-red-700 font-medium">
                    Alert: Your fee is due. Please pay the fee.
                  </p>
                </div>
              )}

              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 font-medium">Due Fee Amount</p>
                <h2 className="text-4xl font-bold text-gray-800 my-2">
                  ₹ {feeDemandData?.data?.pendingAmount || '0'}
                </h2>
                <Link to="/lms-app/student/payment" className="w-full mt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    View Fee Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access Section */}
        <div className="px-6 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Quick Access</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Link to="/lms-app/student/time-table">
              <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm border border-gray-100 whitespace-nowrap">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">My Routine</span>
              </div>
            </Link>
            <Link to="/lms-app/circular-events">
              <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm border border-gray-100 whitespace-nowrap">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Notice & Events</span>
              </div>
            </Link>
            <Link to="/lms-app/student/attendance-list">
              <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm border border-gray-100 whitespace-nowrap">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Attendance</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="px-6 mt-6 pb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            School Services
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <Card className="rounded-xl border-none shadow-sm hover:shadow-md transition-all">
                  <div
                    className={`flex flex-col items-center justify-center p-4 ${item.color}`}
                  >
                    <div className="text-primary mb-2">{item.icon}</div>
                    <CardTitle className="text-xs text-center text-gray-700 font-medium">
                      {item.title}
                    </CardTitle>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Page>
  );
}
