import { useStore } from '@/store';
import { useLocation, useParams } from 'react-router-dom';

export default function usePathWisePermission() {
  const { user } = useStore();
  const location = useLocation();
  const params = useParams();
  const pathData = location.pathname;

  const permission = user?.permission?.find((item) => {
    if (item?.path?.includes(':id')) {
      return item?.path.replace(':id', params.id as string) === pathData;
    }
    if (item?.path?.includes('/?')) {
      return item?.path.replace('/?', params.slug as string) === pathData;
    }
    return item?.path === pathData;
  });

  return { permission };
}
