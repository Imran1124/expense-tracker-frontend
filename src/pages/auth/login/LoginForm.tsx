// import { Link } from 'react-router-dom';
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
import { useApi, usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import Spinner from '@/components/loaders/Spinner';

const schema = yup.object({
  isStudent: yup.string().required('Please select login type'),
  schoolUser: yup.string().when('isStudent', {
    is: 'Student',
    then: (schema) => schema.required('School User ID is required'),
    otherwise: (schema) => schema.optional()
  }),
  email: yup.string().when('isStudent', {
    is: 'Email',
    then: (schema) =>
      schema.email('Invalid email format').required('Email is required'),
    otherwise: (schema) => schema.optional()
  }),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
  // captchaAnswer: yup.string().required('Captcha is required')
});

// Captcha Image Component
// const CaptchaImage = ({ captchaText, onRefresh, isLoading }: any) => {
//   const generateCaptchaImage = (text: any) => {
//     const canvas = document.createElement('canvas');
//     canvas.width = 120;
//     canvas.height = 50;
//     const ctx: any = canvas.getContext('2d');

//     // Background with gradient
//     const gradient = ctx.createLinearGradient(0, 0, 120, 50);
//     gradient.addColorStop(0, '#f0f0f0');
//     gradient.addColorStop(1, '#e0e0e0');
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, 120, 50);

//     // Add noise lines
//     ctx.strokeStyle = '#ccc';
//     ctx.lineWidth = 1;
//     for (let i = 0; i < 3; i++) {
//       ctx.beginPath();
//       ctx.moveTo(Math.random() * 120, Math.random() * 50);
//       ctx.lineTo(Math.random() * 120, Math.random() * 50);
//       ctx.stroke();
//     }

//     // Add noise dots
//     ctx.fillStyle = '#ddd';
//     for (let i = 0; i < 30; i++) {
//       ctx.beginPath();
//       ctx.arc(Math.random() * 120, Math.random() * 50, 1, 0, 2 * Math.PI);
//       ctx.fill();
//     }

//     // Draw text with random colors and rotation
//     const chars = text.split('');
//     const colors = ['#333', '#666', '#999', '#444', '#555'];

//     chars.forEach((char: any, index: any) => {
//       ctx.save();
//       ctx.font = 'bold 16px Arial';
//       ctx.fillStyle = colors[index % colors.length];

//       const x = 15 + index * 18 + (Math.random() * 6 - 3);
//       const y = 30 + (Math.random() * 6 - 3);

//       ctx.translate(x, y);
//       ctx.rotate(Math.random() * 0.3 - 0.15);
//       ctx.fillText(char, 0, 0);
//       ctx.restore();
//     });

//     return canvas.toDataURL();
//   };

//   const handleContextMenu = (e: any) => {
//     e.preventDefault();
//     return false;
//   };

//   const handleDragStart = (e: any) => {
//     e.preventDefault();
//     return false;
//   };

//   // const handleSelectStart = (e: any) => {
//   //   e.preventDefault();
//   //   return false;
//   // };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center w-full h-12 bg-gray-100 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600">
//         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       <div className="flex items-center space-x-3">
//         <div className="relative">
//           <img
//             src={captchaText ? generateCaptchaImage(captchaText) : ''}
//             alt="Captcha"
//             className="w-32 h-12 border border-gray-300 dark:border-gray-600 rounded-lg select-none"
//             onContextMenu={handleContextMenu}
//             onDragStart={handleDragStart}
//             style={{
//               userSelect: 'none',
//               WebkitUserSelect: 'none',
//               MozUserSelect: 'none',
//               msUserSelect: 'none',
//               pointerEvents: 'none'
//             }}
//           />
//           {/* Overlay to prevent any interaction */}
//           <div
//             className="absolute inset-0 rounded-lg"
//             onContextMenu={handleContextMenu}
//             onDragStart={handleDragStart}
//             style={{ pointerEvents: 'auto' }}
//           />
//         </div>
//         <button
//           type="button"
//           onClick={onRefresh}
//           className="p-1.5 text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
//           title="Refresh Captcha"
//         >
//           <RefreshCw className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

export default function LoginForm({
  setStep
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const postLogin = usePostMutation({});
  const { login } = useStore();
  const methods = useForm({
    defaultValues: {
      isStudent: 'Student',
      schoolUser: '',
      email: '',
      password: ''
      // captchaAnswer: ''
    },
    resolver: yupResolver(schema)
  });

  const loginType = methods.watch('isStudent');

  const getCaptchaText = useApi<{
    success: boolean;
    sessionId: string;
    text: string;
  }>({
    api: authApi?.getCaptcha,
    options: {
      enabled: true
    }
  });

  const refreshCaptcha = () => {
    getCaptchaText.refetch();
    // methods.setValue('captchaAnswer', '');
  };

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.login,
        data: {
          ...(loginType == 'Student'
            ? { schoolUser: data?.schoolUser }
            : { email: data?.email }),
          isStudent: data?.isStudent,
          password: data?.password,
          captchaSessionId: getCaptchaText?.data?.sessionId,
          captchaAnswer: getCaptchaText?.data?.text
        }
      });
      if (response?.data?.success) {
        toast.success('Login successful!');
        await login(response);
      } else {
        toast.error(response?.data?.message);
        refreshCaptcha();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      refreshCaptcha();
    }
  };

  if (getCaptchaText?.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <LoginTitle />
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-6">
          {/* Login Type Selection */}
          <div className="flex justify-center mb-4 ">
            <div className="bg-gray-100 dark:bg-slate-700 p-1 rounded-xl flex shadow-sm">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  value="Student"
                  {...methods.register('isStudent')}
                  className="sr-only"
                />
                <div
                  className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                    loginType === 'Student'
                      ? 'bg-white dark:bg-slate-600 text-primary dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-100 hover:text-gray-800'
                  }`}
                >
                  Student
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  value="Email"
                  {...methods.register('isStudent')}
                  className="sr-only"
                />
                <div
                  className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                    loginType === 'Email'
                      ? 'bg-white dark:bg-slate-600 text-primary dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-100 hover:text-gray-800'
                  }`}
                >
                  Teacher
                </div>
              </label>
            </div>
          </div>

          {/* Dynamic Input Fields */}
          {loginType === 'Student' ? (
            <div className="space-y-2">
              <RHFTextField
                className="rounded-xl py-6 px-5 w-full bg-background border-gray-200  dark:border-gray-500 focus:border-primary"
                name="schoolUser"
                inputValidation={['removeSpace']}
                placeholder="Enter your student ID..."
              />
            </div>
          ) : (
            <div className="space-y-2">
              <RHFTextField
                className="rounded-xl py-6 px-5 w-full bg-background border-gray-200  dark:border-gray-500 focus:border-primary"
                name="email"
                placeholder="Enter your email..."
              />
            </div>
          )}

          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background border-gray-200  dark:border-gray-500 focus:border-primary"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          {/* Captcha Section */}
          {/* <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Security Verification
          </label>

          <CaptchaImage
            captchaText={getCaptchaText?.data?.text}
            onRefresh={refreshCaptcha}
            isLoading={getCaptchaText?.isLoading}
          />

          <RHFTextField
            className="rounded-xl py-4 px-5 w-full bg-background border-gray-200 dark:border-gray-500 focus:border-primary"
            name="captchaAnswer"
            placeholder="Enter the text shown above..."
            autoComplete="off"
          />
        </div> */}

          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-xl py-5 px-4 mt-4 shadow-sm bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
            variant="default"
          >
            {loginType === 'Student' ? 'Login as Student' : 'Login as Teacher'}
          </ButtonLoading>

          <div className="flex justify-center items-center mt-4 text-sm">
            {/* <Link
            to="/auth/forget-password"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Forgot password?
          </Link> */}
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <button
            type="button"
            className="group flex items-center gap-2 text-sm text-primary/80 hover:text-primary font-medium transition-all duration-300 hover:gap-3"
            onClick={() => {
              localStorage.removeItem('SID');
              setStep(0);
            }}
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Change School Code
          </button>
        </div>
      </FormProviders>
    </>
  );
}
