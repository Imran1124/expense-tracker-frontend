import { Card, CardContent } from '@/components/ui/card';
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
// import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const { i18n } = useTranslate();
  // const [greeting, setGreeting] = useState('');
  // const [currentTime, setCurrentTime] = useState('');

  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) setGreeting('Good Morning');
  //   else if (hour < 18) setGreeting('Good Afternoon');
  //   else setGreeting('Good Evening');

  //   const updateTime = () => {
  //     const now = new Date();
  //     const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  //     setCurrentTime(now.toLocaleTimeString('en-US', options as any));
  //   };
  //   updateTime();
  //   const interval = setInterval(updateTime, 60000);
  //   return () => clearInterval(interval);
  // }, []);

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

  const isPendingFee = feeDemandData?.data?.data?.length! > 0;

  return (
    <Page title="Home">
      <div className="font-sans bg-slate-50 min-h-screen pb-12">
        {/* Top Header with Time and Greeting */}
        {/* <div className="bg-white px-6 pt-4 pb-2 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs font-medium text-slate-500">
                {currentTime}
              </div>
              <h1 className="text-xl font-extrabold text-slate-800">
                {greeting},
              </h1>
              <h2 className="text-lg font-bold text-primary">
                {user?.fullName}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full ring-2 ring-primary/20 p-0.5 shadow-md">
              <Image
                src={'/pro.png'}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div> */}

        {/* Student Info Banner */}
        <div className="mx-4 my-4">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-4 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

            <div className="relative z-10">
              <div className="flex flex-col text-white">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-bold">Class 5 (A)</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-bold">
                    Roll No: {user?.student?.rollNo}
                  </span>
                </div>
                <Link to="/lms-app/profile" className="mt-2">
                  <Button className="bg-white hover:bg-white/90 text-blue-500 text-xs font-bold px-4 py-1 rounded-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Status Card */}
        <div className="mx-4 my-4">
          <Card className="rounded-2xl overflow-hidden border-none shadow-lg">
            <div className="bg-white p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-slate-800 text-lg">Fee Status</h3>
                {isPendingFee ? (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                    DUE
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                    PAID
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-slate-500 text-sm font-medium">
                    Due Fee Amount
                  </span>
                  <h3 className="text-slate-900 text-2xl font-extrabold">
                    ₹ {feeDemandData?.data?.pendingAmount || '0'}
                  </h3>
                </div>
              </div>

              {isPendingFee && (
                <div className="bg-yellow-50 p-3 rounded-xl mb-3 border border-yellow-100">
                  <div className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-yellow-700">
                      Please clear your pending fees before the due date to
                      avoid late payment charges.
                    </p>
                  </div>
                </div>
              )}

              <Link to="/lms-app/student/payment" className="block w-full">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 font-bold rounded-xl">
                  View Fee Details
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-6">
          <h3 className="font-bold text-slate-800 text-lg mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/lms-app/student/time-table">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-4 shadow-md h-32">
                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="text-white font-bold">Time Table</h4>
                <p className="text-white/80 text-xs">
                  View your class schedule
                </p>
              </div>
            </Link>

            <Link to="/lms-app/student/attendance-list">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 shadow-md h-32">
                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h4 className="text-white font-bold">Attendance</h4>
                <p className="text-white/80 text-xs">
                  Check your attendance status
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Menu Services */}
        <div className="px-4 mt-6">
          <h3 className="font-bold text-slate-800 text-lg mb-3">
            School Services
          </h3>
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  icon: '👨‍🏫',
                  title: i18n.t('faculty'),
                  path: '/lms-app/student/your-faculty',
                  color: 'bg-blue-50'
                },
                {
                  icon: '📚',
                  title: i18n.t('library'),
                  path: '/lms-app/student/library-home',
                  color: 'bg-purple-50'
                },
                {
                  icon: '📋',
                  title: i18n.t('details'),
                  path: '/lms-app/student/details',
                  color: 'bg-pink-50'
                },
                {
                  icon: '🚌',
                  title: i18n.t('transport'),
                  path: '/lms-app/student/transport',
                  color: 'bg-green-50'
                },
                {
                  icon: '📢',
                  title: i18n.t('circularEvents'),
                  path: '/lms-app/circular-events',
                  color: 'bg-yellow-50'
                },
                {
                  icon: '🧾',
                  title: i18n.t('history'),
                  path: '/lms-app/student/payment-history',
                  color: 'bg-orange-50'
                },
                {
                  icon: '🔍',
                  title: i18n.t('verifyReceipt'),
                  path: '/lms-app/student/receipt-verify',
                  color: 'bg-teal-50'
                },
                {
                  icon: '😀',
                  title: i18n.t('profile'),
                  path: '/lms-app/profile',
                  color: 'bg-indigo-50'
                }
              ].map((item, index) => (
                <Link key={index} to={item.path}>
                  <div
                    className={`${item.color} rounded-xl p-2 flex flex-col items-center shadow-sm`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs font-semibold text-slate-700 text-center leading-tight">
                      {item.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="px-4 mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-lg">Announcements</h3>
            <Link to="/lms-app/circular-events">
              <span className="text-blue-600 text-sm font-medium">
                View All
              </span>
            </Link>
          </div>

          <Card className="rounded-2xl border-none shadow-md overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    Annual Sports Day
                  </h4>
                  <p className="text-sm text-slate-500">
                    Registration ends tomorrow. Don't miss out!
                  </p>
                  <div className="text-xs text-slate-400 mt-1">
                    March 8, 2025
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    Mid-Term Examination
                  </h4>
                  <p className="text-sm text-slate-500">
                    Starts from March 15. Prepare well!
                  </p>
                  <div className="text-xs text-slate-400 mt-1">
                    March 5, 2025
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
