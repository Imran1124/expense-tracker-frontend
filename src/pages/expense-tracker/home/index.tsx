import { useAuth } from '@/store/useAuth';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import { ADMIN_ROLE_ID, SUPER_ADMIN_ROLE_ID } from '@/lib/constant';
import Page from '@/components/helmet-page';

export default function Home() {
  const { user } = useAuth();

  const isAdmin =
    user?.role === 'Admin' ||
    user?.roleId === ADMIN_ROLE_ID ||
    user?.roleId === SUPER_ADMIN_ROLE_ID;

  return (
    <Page title="Dashboard">
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </Page>
  );
}
