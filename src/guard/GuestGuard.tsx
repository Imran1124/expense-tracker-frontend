import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '@/store';
// import Spinner from '@/components/loaders/Spinner';
import AppLoader from '@/components/loaders/AppLoader';

// ----------------------------------------------------------------------

export default function GuestGuard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isInitialized, initialize } = useStore();
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AppLoader title="Please wait..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/expense-tracker/dashboard/home" />;
  }

  return <>{children}</>;
}
