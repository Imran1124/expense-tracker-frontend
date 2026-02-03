import { LazyExoticComponent, Suspense, lazy, ElementType } from 'react';
// import SuspenseLoader from '@/components/loaders/Spinner';
import AppLoader from '@/components/loaders/AppLoader';

// ----------------------------------------------------------------------
const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) =>
  (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <AppLoader title="Please wait..." />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

const lazyWithRetries = (importer: () => Promise<{ default: ElementType }>) => {
  const retryImport = async () => {
    try {
      return await importer();
    } catch (error) {
      // window.location.reload();
    }
  };
  return Loadable(lazy(retryImport as any));
};

// -------------------------------Before auth routes--------------------------------
const Login = lazyWithRetries(() => import('@/pages/auth/login'));
const OtpLogin = lazyWithRetries(() => import('@/pages/auth/otp-login'));
const Register = lazyWithRetries(() => import('@/pages/auth/register'));
const ForgetPassword = lazyWithRetries(
  () => import('@/pages/auth/forget-password')
);

const Home = lazyWithRetries(() => import('@/pages/expense-tracker/home'));

export type Route = {
  layout: string;
  pages: {
    id: string;
    name: string;
    path: string;
    element: JSX.Element;
    exact?: boolean;
  }[];
};

const routes: Route[] = [
  {
    layout: 'auth', // before Auth
    pages: [
      {
        id: '1',
        name: 'Login',
        path: 'login',
        element: <Login />
      },
      {
        id: '2',
        name: 'Register',
        path: 'register',
        element: <Register />
      },
      {
        id: '3',
        name: 'Forget Password',
        path: 'forget-password',
        element: <ForgetPassword />
      },
      {
        id: '4',
        name: 'Otp Login',
        path: 'otp-login',
        element: <OtpLogin />
      }
    ]
  },
  {
    layout: 'dashboard', // protected routes
    pages: [
      {
        id: '1',
        name: 'Home',
        path: 'home',
        element: <span>HOe</span>
      }
    ]
  }
];

export default routes;
