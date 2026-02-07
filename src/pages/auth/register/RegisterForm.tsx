import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  FormProviders,
  RHFPasswordField,
  RHFTextField
} from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import RegisterTitle from './RegisterTitle';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  mobile: yup.string().required('Mobile number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

type FormData = yup.InferType<typeof schema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const postRegister = usePostMutation({});

  const methods = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await postRegister.mutateAsync({
        api: authApi.register,
        data: {
          fullName: data.fullName,
          email: data.email,
          mobile: data.mobile,
          roleId: '6981ce0c2974293f82981351',
          password: data.password
        }
      });

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || 'Account created successfully'
        );
        methods.reset({
          fullName: '',
          email: '',
          mobile: '',
          password: ''
        });
        navigate('/expense-tracker/auth/login');
      } else {
        toast.error(response?.data?.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <RegisterTitle />
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          <div>
            <RHFTextField
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              inputValidation={['removeSpecialCharacterExceptSpace']}
            />
          </div>

          <div>
            <RHFTextField
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              inputValidation={['email', 'removeSpace']}
            />
          </div>

          <div>
            <RHFTextField
              name="mobile"
              label="Mobile Number"
              placeholder="Enter your mobile number"
              inputValidation={['number', 'mobile']}
            />
          </div>

          <div>
            <RHFPasswordField
              name="password"
              label="Password"
              placeholder="Create a password"
            />
          </div>

          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-xl py-4 px-4 mt-6 shadow-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:shadow-xl text-white font-bold transition-all duration-300 hover:-translate-y-1 active:scale-95"
            variant="default"
          >
            {methods.formState.isSubmitting
              ? 'Creating account...'
              : 'Create Account'}
          </ButtonLoading>
        </div>
      </FormProviders>
    </>
  );
}
