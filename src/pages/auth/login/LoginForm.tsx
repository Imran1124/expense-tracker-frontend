import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginTitle from './LoginTitle';
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFPasswordField
} from '@/components/forms';
import { useStore } from '@/store';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import { Link } from 'react-router-dom';

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

export default function LoginForm() {
  const postLogin = usePostMutation({});
  const { login } = useStore();
  const methods = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.login,
        data: {
          email: data?.email,
          password: data?.password
        }
      });
      if (response?.data?.success) {
        toast.success('Login successful!');
        await login(response);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <LoginTitle />
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <RHFTextField
              className="rounded-xl py-6 px-5 w-full bg-background border-gray-200  dark:border-gray-500 focus:border-primary"
              name="email"
              placeholder="Enter your email..."
            />
          </div>

          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background border-gray-200  dark:border-gray-500 focus:border-primary"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-xl py-5 px-4 mt-4 shadow-sm bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
            variant="default"
          >
            Login
          </ButtonLoading>

          <div className="flex justify-center items-center mt-4 text-sm">
            <Link
              to="/auth/forget-password"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </FormProviders>
    </>
  );
}
