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

// --------------------------------Protected Routes---------------------------------
const Home = lazyWithRetries(() => import('@/pages/expense-tracker/home'));
const Expenses = lazyWithRetries(
  () => import('@/pages/expense-tracker/expenses')
);

const Categories = lazyWithRetries(
  () => import('@/pages/expense-tracker/categories')
);

const Users = lazyWithRetries(() => import('@/pages/expense-tracker/users'));
const Roles = lazyWithRetries(() => import('@/pages/expense-tracker/roles'));

const Report = lazyWithRetries(() => import('@/pages/expense-tracker/reports'));

const Profile = lazyWithRetries(
  () => import('@/pages/expense-tracker/profile')
);

const ForgotPassword = lazyWithRetries(
  () => import('@/pages/auth/forget-password')
);

export type Route = {
  layout: string;
  pages: {
    id: string;
    name: string;
    path: string;
    element: JSX.Element;
    exact?: boolean;
    access?: string[];
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
      },
      {
        id: '5',
        name: 'Forgot Password',
        path: 'forgot-password',
        element: <ForgotPassword />
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
        element: <Home />,
        access: ['User', 'Admin']
      },
      {
        id: '2',
        name: 'Add Expense',
        path: 'create-expense',
        element: <Expenses />,
        access: ['User', 'Admin']
      },

      {
        id: '4',
        name: 'Categories',
        path: 'categories',
        element: <Categories />,
        access: ['Admin']
      },

      {
        id: '6',
        name: 'Users',
        path: 'users',
        element: <Users />,
        access: ['Admin']
      },
      {
        id: '7',
        name: 'Manage Roles',
        path: 'roles',
        element: <Roles />,
        access: ['Admin']
      },
      {
        id: '8',
        name: 'Reports',
        path: 'reports',
        element: <Report />,
        access: ['User', 'Admin']
      },
      {
        id: '9',
        name: 'Profile',
        path: 'profile',
        element: <Profile />,
        access: ['User', 'Admin']
      }
    ]
  }
];

export default routes;
