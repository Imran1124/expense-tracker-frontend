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

  console.log('the user is..', user);

  return (
    <Page title="Home">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="w-full h-72 bg-primary rounded-br-3xl rounded-bl-3xl">
          <div className=" flex justify-left items-center gap-4 pl-6">
            <Image
              src={'/pro.png'}
              alt="Avatar"
              className="overflow-hidden rounded-full w-14 border border-white"
            />
            <div>
              <CardTitle className="text-secondary font-bold text-xl  ">
                {user?.fullName}
              </CardTitle>
              <div className="text-secondary italic font-serif text-sm  mt-0 opacity-60">
                Class - 5 (A) | Roll No. - {user?.student?.rollNo}
              </div>
            </div>
          </div>
        </div>

        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-4 sm:px-6 rounded-full -mt-52">
          <div className="grid gap-2.5 grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="col-span-4 mb-2">
              <div className="grid grid-cols-1 gap-4">
                <Card className="flex flex-col -mt-10 rounded-3xl shadow-sm py-4">
                  {/* <CardContent className="mt-2">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setIsFeeChart(true)}
                        className={`${isFeeChart
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-primary'
                          } rounded-md px-4 py-1 font-semibold w-full`}
                      >
                        <small>Fee Chart</small>
                      </button>
                      <Link to="/lms-app/student/time-table">
                        <button
                          onClick={() => setIsFeeChart(false)}
                          className={`${!isFeeChart
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-primary'
                            } rounded-md px-4 py-1 font-semibold w-full`}
                        >
                          <small>Routine</small>
                        </button>
                      </Link>
                    </div>
                  </CardContent> */}
                  {/* <Separator className="" /> */}
                  {/* line */}
                  {/* {isFeeChart ? (
                    <ChartFeeData
                      feeDemandData={feeDemandData}
                      lastPaymentDate={lastTransaction?.data?.data?.createdAt}
                    />
                  ) : (
                    <ChartAttendance
                      attendanceChartData={attendanceChartData}
                    />
                  )} */}
                  <div className="flex flex-col justify-center items-center gap-2">
                    {/* ______________ ALERT MESSAGES _____________ */}
                    {feeDemandData?.data?.data?.length! <= 0 ? (
                      <div className="px-0 relative">
                        <div className="bg-green-400 w-full py-2 rounded-lg bg-opacity-0 px-4">
                          <h1 className="text-sm text-green-400 font-semibold text-center">
                            <span className="text-green-500 font-semibold">
                              Your fee is up to date.
                            </span>
                          </h1>
                        </div>
                      </div>
                    ) : (
                      <div className="px-0 mt-0 relative">
                        <div className="bg-red-400 w-full py-2 pt-0 rounded-lg  bg-opacity-0 px-4">
                          <h1 className="text-sm text-red-400 font-semibold text-center">
                            <span className="text-red-500 font-semibold">
                              !
                            </span>{' '}
                            Alert : Your fee is due. Please pay the fee.
                          </h1>
                        </div>
                      </div>
                    )}

                    <CardTitle className="font-bold text-3xl">
                      ₹ {feeDemandData?.data?.pendingAmount}
                    </CardTitle>
                    <div className="italic font-serif text-sm  mt-0 opacity-60">
                      Due Fee Amount
                    </div>

                    <Link className="mx-auto" to="/lms-app/student/payment">
                      <Button variant={'outline'} className="px-14 mb-2">
                        Fee Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-6 col-span-4"></div>

            <CardContent className="col-span-4">
              <div className="flex items-center gap-2">
                <Link to="/lms-app/student/time-table">
                  <button
                    className={`bg-gray-200 text-primary rounded-md px-4 py-1 font-semibold w-full flex gap-1 items-center border border-white shadow-sm`}
                  >
                    <Image
                      src="/calender.svg"
                      alt="Avatar"
                      className="overflow-hidden w-5"
                    />
                    <small>My Routine</small>
                  </button>
                </Link>
                <Link to="/lms-app/circular-events">
                  <button
                    className={`bg-gray-200 text-primary rounded-md px-4 py-1 font-semibold w-full flex gap-1 items-center border border-white shadow-sm`}
                  >
                    <Image
                      src="/anc.png"
                      alt="Avatar"
                      className="overflow-hidden w-5"
                    />
                    <small>Notice & Events</small>
                  </button>
                </Link>
              </div>
            </CardContent>

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
            <Link to="/lms-app/student/your-faculty">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/teachers.svg"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('faculty')}
                  </CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/lms-app/student/transport">
              <Card
                className="rounded-2xl flex justify-center items-center shadow-sm"
                x-chunk="dashboard-05-chunk-1"
              >
                <div className="py-4 rounded-2xl h-auto w-28">
                  <div className="flex justify-center">
                    <Image
                      src="/transport.svg"
                      alt="Avatar"
                      className="overflow-hidden w-7 h-7"
                    />
                  </div>
                  <CardTitle className="text-xs text-center">
                    {i18n.t('transport')}
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
