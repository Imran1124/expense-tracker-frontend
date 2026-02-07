import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonLoading, RHFTextField, FormProviders } from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import useTimer from '@/hooks/useTimer';
import { authApi, getErrorMessage } from '@/lib';
import { I_DATA, I_NEXT, I_PREV } from './index';

type IProps = {
  next: I_NEXT;
  data: I_DATA;
  prev: I_PREV;
  setData: React.Dispatch<React.SetStateAction<I_DATA>>;
};

const schema = yup.object({
  email: yup.string().email().required(),
  otp: yup.string().required(),
  token: yup.string().required()
});

export default function VerifyOTP({
  next,
  data,
  setData,
  prev
}: Readonly<IProps>) {
  const { minutes, seconds, togglerTimer, runTimer } = useTimer(0.5);
  const postData = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: data.email,
      otp: data.otp,
      token: data.token
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postData.mutateAsync({
        api: authApi.verifyOtp,
        data: data
      });
      if (response?.data?.success) {
        next({ ...data, otp: data?.otp });
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    togglerTimer();
    return () => {
      togglerTimer();
    };
  }, []);

  const resendOtp = async () => {
    try {
      const response = await postData.mutateAsync({
        api: authApi.sendOtpViaEmail,
        data: {
          email: data.email
        }
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setData({
          ...data,
          otp: ''
        });
        methods.setValue('otp', '');
        togglerTimer();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-center mb-2">
          {/* Add logo here if needed */}
        </div>
        <h1 className="text-2xl font-semibold text-center mt-2 text-primary">
          Verify OTP
        </h1>
        <p className="text-center mt-2 text-muted-foreground text-sm">
          Verify your OTP to reset your password
        </p>
        <div className="text-center mt-2 text-sm text-primary">
          {data.email}{' '}
          <button
            onClick={() => prev(data)}
            className="ml-2 text-sm text-primary underline hover:text-primary/80 transition"
          >
            Edit
          </button>
        </div>
      </div>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <RHFTextField
            className="rounded-lg py-4 px-4 w-full bg-background border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-primary"
            name="otp"
            inputValidation={['number', 'removeSpace']}
            placeholder="Enter your OTP"
          />
          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-lg py-4 px-4 mt-2 shadow-md bg-primary text-white hover:bg-primary/90 transition"
            variant="outline"
          >
            Verify OTP
          </ButtonLoading>
          <div className="text-center text-muted-foreground text-xs mt-2">
            <span>Didn't receive the OTP? </span>
            {runTimer ? (
              <>
                <span className="text-sm text-primary font-medium">
                  {minutes}:{seconds}
                </span>
              </>
            ) : (
              <>
                <button
                  className="text-sm text-primary underline hover:text-primary/80 transition"
                  onClick={resendOtp}
                >
                  Resend OTP
                </button>
              </>
            )}
          </div>
        </div>
      </FormProviders>
    </>
  );
}
