// this is hook function
import { useApi } from './useCustomQuery';
import { commonApi, facultyApi, feeDemandApi, transactionApi } from '@/lib';
import { useAuth } from '@/store/useAuth';
import {
  CLASS_BY_FACULTY_ID,
  GET_LAST_TRANSACTION_TYPE,
  MONTH_TYPE,
  SECTION_BY_FACULTY_ID_AND_CLASS_ID,
  SUBJECT_BY_CLASS_AND_SECTION
} from '@/types/commonType';

export default function useLastTransactionData() {
  const { sessionId } = useAuth();
  const lastTransaction = useApi<GET_LAST_TRANSACTION_TYPE>({
    api: `${transactionApi.getLastTransaction}?sessionId=${sessionId}`,
    options: {
      enabled: true
    }
  });
  return {
    lastTransaction
  };
}

export const useClassByFacultyId = () => {
  const classData = useApi<CLASS_BY_FACULTY_ID>({
    api: facultyApi.GetClassFacultyId,
    config: {},
    options: {
      enabled: true
    }
  });
  return { classData };
};

export const useSectionByFacultyIdAndClassId = (classId: string) => {
  const sectionData = useApi<SECTION_BY_FACULTY_ID_AND_CLASS_ID>({
    api: `${facultyApi.GetSectionById}?classId=${classId}`,
    config: {},
    key: 'sectionData',
    value: [classId],
    options: {
      enabled: !!classId
    }
  });
  return { sectionData };
};

export const useSubjectByClassIdAndSectionId = (
  classId: string,
  sectionId: string
) => {
  const subjectData = useApi<SUBJECT_BY_CLASS_AND_SECTION>({
    api: `${facultyApi.GetSubjectById}?classId=${classId}&sectionId=${sectionId}`,
    config: {},
    key: 'subjectData',
    value: [sectionId],
    options: {
      enabled: !!classId && !!sectionId
    }
  });
  return { subjectData };
};

export const useMonthData = () => {
  const monthData = useApi<MONTH_TYPE>({
    api: `${facultyApi.GetMonthList}?page=1&limit=100`,
    key: 'monthData',
    options: {
      enabled: true
    }
  });
  return monthData;
};

export const useClassWiseSubjectList = (classId: string) => {
  const subjectTypeData = useApi<{
    success: boolean;
    data: {
      _id: string;
      className: string;
      status: number;
      createdAt: string;
      updatedAt: string;
      section: {
        sectionName: string;
      };
      classWiseSubject: [
        {
          _id: string;
          classId: string;
          subjectCode: string;
          subjectName: number;
          status: number;
          createdAt: string;
          updatedAt: string;
        }
      ];
    };
  }>({
    api: `${commonApi.getClassWiseSubjectByClassId}/${classId}`,
    value: [classId],
    options: {
      enabled: !!classId
    }
  });
  return subjectTypeData;
};
export const useTermByClassId = (classId: string) => {
  const subjectTypeData = useApi<{
    success: boolean;
    message: string;
    data: [
      {
        _id: string;
        classId: string;
        termsName: string;
        description: string;
        className: string;
      }
    ];
  }>({
    api: `${commonApi.getTermByClassId}?classId=${classId}`,
    options: {
      enabled: !!classId
    }
  });
  return subjectTypeData;
};

export const useFeeAmountByStudentId = (
  studentId: string,
  currentMonthFull?: string
) => {
  const feeAmountData = useApi<{
    success: boolean;
    message: string;
    data: {
      totalFeeAmount: number;
      totalPaidFeeAmount: number;
      totalUnPaidFeeAmount: number;
      totalDiscountAmount: number;
      totalBeforeDiscountAmount: number;
    };
  }>({
    api: `${feeDemandApi.getDemandAmountByStudentId}?studentId=${studentId}&month=${currentMonthFull}`,
    value: [studentId, currentMonthFull],
    options: {
      enabled: !!studentId
    }
  });
  return feeAmountData;
};
