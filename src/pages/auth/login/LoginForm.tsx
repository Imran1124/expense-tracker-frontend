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
        <div className="space-y-5">
          <div>
            <RHFTextField
              name="email"
              label="📧 Email Address"
              placeholder="Enter your email..."
              type="email"
            />
          </div>

          <div>
            <RHFPasswordField
              name="password"
              label="🔐 Password"
              placeholder="Enter your password"
            />
          </div>

          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-xl py-4 px-4 mt-6 shadow-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:shadow-xl text-white font-bold transition-all duration-300 hover:-translate-y-1 active:scale-95"
            variant="default"
          >
            {methods.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
          </ButtonLoading>

          <div className="flex justify-center items-center mt-6">
            <Link
              to="/auth/forget-password"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-semibold text-sm"
            >
              🔑 Forgot Password?
            </Link>
          </div>
        </div>
      </FormProviders>
    </>
  );
}
