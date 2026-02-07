import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  RHFPasswordField,
  FormProviders
} from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import { I_DATA, I_PREV } from './index';

type IProps = {
  data: I_DATA;
  prev?: I_PREV;
  setData?: React.Dispatch<React.SetStateAction<I_DATA>>;
};

const schema = yup.object({
  email: yup.string().email().required(),
  token: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
});

export default function ChangePassword({ data }: Readonly<IProps>) {
  const navigate = useNavigate();
  const postLogin = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: data.token
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.resetPassword,
        data: {
          email: data.email,
          password: data.password,
          token: data.token
        }
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate('/lms-app/auth/login');
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
          Reset Password
        </h1>
        <p className="text-center mt-2 text-muted-foreground text-sm">
          Reset your password to login to your account
        </p>
      </div>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <RHFPasswordField
            className="rounded-lg py-4 px-4 w-full bg-background border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-primary"
            name="password"
            placeholder="New password"
          />
          <RHFPasswordField
            className="rounded-lg py-4 px-4 w-full bg-background border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-primary"
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-lg py-4 px-4 mt-2 shadow-md bg-primary text-white hover:bg-primary/90 transition"
            variant="default"
          >
            Reset Password
          </ButtonLoading>
        </div>
      </FormProviders>
    </>
  );
}
