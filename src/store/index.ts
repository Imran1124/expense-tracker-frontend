import { useAuth, type IUser } from './useAuth';
import { useTitle } from './useTitle';
// merge all store hooks using zustand
export { useAuth, type IUser };
export const useStore = () => {
  const authStore = useAuth();
  const titleStore = useTitle();
  return { ...authStore, ...titleStore };
};
