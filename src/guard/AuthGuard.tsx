import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import AppLoader from '@/components/loaders/AppLoader';

export default function AuthGuard({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const { isInitialized, isAuthenticated, initialize } = useStore();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

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

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to="/expense-tracker" />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
