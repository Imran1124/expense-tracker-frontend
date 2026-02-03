import { Image } from '@/components/image';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Page from '@/components/helmet-page';
import { useTranslate } from '@/hooks/useTanslate';
import { useApi } from '@/hooks/useCustomQuery';
import { attendanceApi, feeDemandApi } from '@/lib';
// import { GET_FEE_DEMAND_AMOUNT_TYPE } from './type';
import SkeletonLoader from '@/components/loaders/SkeletonLoader';
import { Separator } from '@/components/ui/separator';
import useLastTransactionData from '@/hooks/useCommonData';
import { STUDENT_FEE_TYPE_LIST } from '../src/pages/lms-app/student/fee/payment/type';
import ChartFeeData from '../src/pages/lms-app/student/home/ChartsFeeData';
import { useAuth } from '@/store/useAuth';
import ChartAttendance from '../src/pages/lms-app/student/home/ChartAttendance';
import { ATTENDANCE_CHART_LIST } from '../src/pages/lms-app/student/home/type';
import { useState } from 'react';

export default function Home() {
  const { user } = useAuth();
  const { i18n } = useTranslate();
  const { lastTransaction } = useLastTransactionData();
  const [isFeeChart, setIsFeeChart] = useState(true);
  // const feeAmount = useApi<GET_FEE_DEMAND_AMOUNT_TYPE>({
  //   api: feeDemandApi.getFeeDemandAmountBySid,
  //   options: {
  //     enabled: true
  //   }
  // });

  const feeDemandData = useApi<STUDENT_FEE_TYPE_LIST>({
    api: `${feeDemandApi.feeDemandByStudentId}`,
    options: {
      enabled: true
    }
  });

  const attendanceChartData = useApi<ATTENDANCE_CHART_LIST>({
    api: `${attendanceApi.GetAttendanceByMonth}`,
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
          {Array.from({ length: 4 })?.map((_, index) => (
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

  return (
    <Page title="Home">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="w-full h-72 bg-primary rounded-br-3xl rounded-bl-3xl flex bg-red-600">
          <Image
            src="/dtl.png"
            alt="Avatar"
            className="overflow-hidden w-7 h-7"
          />
          <div>
            <CardTitle className="text-secondary font-semibold text-xl pl-6 mt-0 opacity-60">
              Welcome!
            </CardTitle>
            <CardTitle className="text-secondary font-bold text-3xl pl-6 ">
              {user?.fullName}
            </CardTitle>
          </div>
        </div>

        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-4 sm:px-6 rounded-full -mt-52">
          <div className="grid gap-2.5 grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="col-span-4 mb-2">
              <div className="grid grid-cols-1 gap-4">
                <Card className="flex flex-col -mt-10 rounded-3xl shadow-sm py-4">
                  <CardContent className="mt-2">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setIsFeeChart(true)}
                        className={`${
                          isFeeChart
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-primary'
                        } rounded-md px-4 py-1 font-semibold w-full`}
                      >
                        <small>Fee Chart</small>
                      </button>
                      <Link to="/lms-app/student/time-table">
                        <button
                          onClick={() => setIsFeeChart(false)}
                          className={`${
                            !isFeeChart
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 text-primary'
                          } rounded-md px-4 py-1 font-semibold w-full`}
                        >
                          <small>Routine</small>
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                  {/* <Separator className="" /> */}
                  {/* line */}
                  {isFeeChart ? (
                    <ChartFeeData
                      feeDemandData={feeDemandData}
                      lastPaymentDate={lastTransaction?.data?.data?.createdAt}
                    />
                  ) : (
                    <ChartAttendance
                      attendanceChartData={attendanceChartData}
                    />
                  )}
                </Card>
              </div>
            </div>
            <div className="col-span-4 mb-2"></div>
            <div className="col-span-4 w-full flex justify-center items-center my-0 mb-1">
              {' '}
              <div className="border-b border-gray-100 w-2/3"></div>
            </div>

            <Link to="/lms-app/student/details">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/dtl.png"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('details')}
                  </CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/lms-app/student/payment-history">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center items-center">
                    <Image
                      src="/his.png"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('history')}
                  </CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/lms-app/profile">
              <Card
                className="rounded-2xl  flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/user.svg"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('profile')}
                  </CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/lms-app/student/receipt-verify">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/receiptVerify.svg"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('verifyReceipt')}
                  </CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/lms-app/student/time-table">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/calender.svg"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('timeTable')}
                  </CardTitle>
                </div>
              </Card>
            </Link>

            <Link to="/lms-app/student/attendance-list">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/attendance.svg"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('attendance')}
                  </CardTitle>
                </div>
              </Card>
            </Link>

            <Link to="/lms-app/student/library-home">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/library.svg"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('library')}
                  </CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/lms-app/circular-events">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/anc.png"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('circularEvents')}
                  </CardTitle>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </Page>
  );
}
