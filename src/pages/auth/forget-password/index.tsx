import { useState } from 'react';
import Page from '@/components/helmet-page';
import SendOtpViaEmail from './SendOtpViaEmail';
import VerifyOtp from './VerifyOtp';
import ChangePassword from './ChangePassword';

export type I_DATA = {
  email?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
  token?: string;
};

export type I_NEXT = (newData: I_DATA, finalStep?: boolean) => void;
export type I_PREV = (newData: I_DATA) => void;

export default function ForgetPassword() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<I_DATA>({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
    token: ''
  });

  const next = (newData: I_DATA, finalStep = false) => {
    setData({ ...data, ...newData });
    if (finalStep) {
      return;
    }
    setPage(page + 1);
  };
  const prev = (newData: I_DATA) => {
    setData({ ...data, ...newData });
    setPage(page - 1);
  };

  return (
    <Page title="Forgot Password">
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted-foreground">
        <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
          {{
            0: <SendOtpViaEmail next={next} data={data} />,
            1: (
              <VerifyOtp
                next={next}
                prev={prev}
                data={data}
                setData={setData}
              />
            ),
            2: <ChangePassword prev={prev} data={data} setData={setData} />
          }[page] || null}
        </div>
      </div>
    </Page>
  );
}
