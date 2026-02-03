import { useApi } from './useCustomQuery';
import { circularApi, assignmentApi, commonApi, timeTableApi } from '@/lib';
import {
  I_CLASS_MSTR_LIST,
  I_SECTION_MSTR_VIEW,
  SESSION_MSTR_LIST
} from '@/types/commonType';

export type I_LIST_TYPE<T> = {
  success: boolean;
  message: string;
  data: {
    docs: Array<T>;
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: null;
  };
};

type MONTH_MSTR = {
  _id: string;
  month: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MONTH_MSTR_VIEW = {
  success: boolean;
  data: MONTH_MSTR;
};

type MONTH_MSTR_LIST = I_LIST_TYPE<MONTH_MSTR>;

export const useMonthMasterList = () => {
  const monthMasterData = useApi<MONTH_MSTR_LIST>({
    api: `${timeTableApi.getAllMonths}?page=1&limit=100`,
    options: {
      enabled: true
    }
  });
  return monthMasterData;
};

// ========================================================== assignment =================================
export type assignmentType = {
  _id: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
};

export type assignmentType_LIST = I_LIST_TYPE<assignmentType>;

export const useAssignmentList = ({
  page = 1,
  limit = 5,
  classId
}: {
  classId: string | null;
  page?: number;
  limit?: number;
}) => {
  const assignmentData = useApi<assignmentType_LIST>({
    api: `${assignmentApi.assignmentByClassId}?page=${page}&limit=${limit}&classIds=${classId}`,
    value: [page, limit, classId],
    options: {
      enabled: true
    }
  });
  return assignmentData;
};

// ==========================================================circular event================================

export type circularEventType = {
  _id: string;
  type: string;
  title: string;
  description: string;
  classIds: [
    {
      classId: string;
      className: string;
    }
  ];
  circularEventDate: string;
  isActionBtn: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type circularEventType_LIST = I_LIST_TYPE<circularEventType>;

export const useCircularEventList = ({
  page = 1,
  limit = 5,
  classId,
  type
}: {
  classId: string | null;
  page?: number;
  limit?: number;
  type?: string | null;
}) => {
  const typeEvent = type ? `type=${type}` : null;
  const circularEventData = useApi<circularEventType_LIST>({
    api: `${circularApi.circularByClassId}?page=${page}&limit=${limit}&classIds=${classId}&${typeEvent}`,
    value: [page, limit, classId],
    options: {
      enabled: true
    }
  });
  return circularEventData;
};

export const useClassMasterList = () => {
  const classMasterData = useApi<I_CLASS_MSTR_LIST>({
    api: `${commonApi.classList}?page=1&limit=200`,
    options: {
      enabled: true
    }
  });
  return classMasterData;
};

export const useSectionMasterList = (classId: string) => {
  const sectionMasterData = useApi<I_SECTION_MSTR_VIEW>({
    api: `${commonApi.getSectionByClassId}/${classId}`,
    options: {
      enabled: !!classId
    }
  });
  return sectionMasterData;
};

// session list master
export const useSessionMasterList = () => {
  const sessionMasterData = useApi<SESSION_MSTR_LIST>({
    api: `${commonApi.getAllSessions}?page=1&limit=100`,
    options: {
      enabled: true
    }
  });
  return sessionMasterData;
};

export const useActiveSessionMasterList = () => {
  const sessionMasterData = useApi<{
    success: boolean;
    message: string;
    data: [
      {
        _id: string;
        session: string;
        status: number;
      }
    ];
  }>({
    api: `${commonApi.getAllActiveSession}`,
    options: {
      enabled: true
    }
  });
  return sessionMasterData;
};

export const useTermsList = () => {
  const termMasterData = useApi<{
    success: boolean;
    message: string;
    data: {
      docs: [
        {
          _id: string;
          termsName: string;
          description: string;
        }
      ];
    };
  }>({
    api: `${commonApi.getAllTerm}?page=1&limit=100`,
    options: {
      enabled: true
    }
  });
  return termMasterData;
};

export const useTermsListByClass = (classId?: string) => {
  const termMasterData = useApi<{
    success: boolean;
    message: string;
    data: [
      {
        _id: string;
        classId: string;
        termsName: string;
        description: string;
      }
    ];
  }>({
    api: `${commonApi.getTermByClassId}?classId=${classId}`,
    value: [classId],
    options: {
      enabled: !!classId
    }
  });
  return termMasterData;
};
