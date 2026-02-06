import { useApi } from './useCustomQuery';
import { expenseApi } from '@/lib';

export const useCategoryList = () => {
  const termMasterData = useApi<{
    success: boolean;
    message: string;
    data: {
      docs: {
        _id: string;
        categoryName: string;
        status: number;
        description: string;
        createdAt: string;
        updatedAt: string;
      }[];
      totalDocs: number;
      limit: number;
      page: number;
      totalPages: number;
      pagingCounter: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
  }>({
    api: `${expenseApi.getAllCategories}?page=1&limit=100`,
    key: 'getAllCategoriesMaster',
    options: {
      enabled: true
    }
  });
  return termMasterData;
};

export const useRoleList = () => {
  const roleMasterData = useApi<{
    success: boolean;
    message: string;
    data: {
      docs: {
        _id: string;
        roleName: string;
        status: number;
        createdAt: string;
        updatedAt: string;
      }[];
      totalDocs: number;
      limit: number;
      page: number;
      totalPages: number;
      pagingCounter: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
  }>({
    api: `${expenseApi.getAllRoles}?page=1&limit=100`,
    key: 'getAllRolesMaster',
    options: {
      enabled: true
    }
  });
  return roleMasterData;
};
