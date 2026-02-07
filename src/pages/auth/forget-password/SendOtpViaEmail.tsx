import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonLoading, RHFTextField, FormProviders } from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import { I_DATA, I_NEXT } from './index';

type IProps = {
  next: I_NEXT;
  data: I_DATA;
};

const schema = yup.object({
  email: yup.string().email().required()
});

export default function SendOtpViaEmail({ next, data }: Readonly<IProps>) {
  const postLogin = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: data.email
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.sendOtpViaEmail,
        data: data
      });
      if (response?.data?.success) {
        next({ ...data, email: data?.email, token: response?.data?.token });
        toast.success(response?.data?.message);
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
          Send OTP
        </h1>
        <p className="text-center mt-2 text-muted-foreground text-sm">
          Enter your email to receive a one-time password
        </p>
      </div>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <RHFTextField
            className="rounded-lg py-4 px-4 w-full bg-background border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-primary"
            name="email"
            inputValidation={['email', 'removeSpace']}
            placeholder="Enter your email"
          />
          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-lg py-4 px-4 mt-2 shadow-md bg-primary text-white hover:bg-primary/90 transition"
            variant="default"
          >
            Send OTP
          </ButtonLoading>
        </div>
      </FormProviders>
    </>
  );
}
