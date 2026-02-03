import { I_LIST_TYPE } from './listType';

export type I_CLASS_MSTR = {
  _id: string;
  className: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type I_CLASS_MSTR_VIEW = {
  success: boolean;
  data: I_CLASS_MSTR;
};

export type I_CLASS_MSTR_LIST = I_LIST_TYPE<I_CLASS_MSTR>;

// sectionMasterType.ts
export type I_SECTION_MSTR = {
  _id: string;
  classId: string;
  className: string;
  sectionName: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type I_SECTION_MSTR_VIEW = {
  success: boolean;
  data: I_SECTION_MSTR[];
};

export type I_SECTION_MSTR_LIST = I_LIST_TYPE<I_SECTION_MSTR>;

export type SESSION_MSTR = {
  _id: string;
  session: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SESSION_MSTR_VIEW = {
  success: boolean;
  data: SESSION_MSTR;
};

export type SESSION_MSTR_LIST = I_LIST_TYPE<SESSION_MSTR>;

// month List
export type MONTH_MSTR = {
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

export type MONTH_MSTR_LIST = I_LIST_TYPE<MONTH_MSTR>;

export type GET_LAST_TRANSACTION_TYPE = {
  success: true;
  data: {
    _id: string;
    transactionNo: string;
    amount: number;
    paidFrom: string;
    paidUpto: string;
    studentId: string;
    paymentMode: string;
    orderId: string;
    isVerified: boolean;
    status: number;
    receiptNo: string | null;
    willReconcile: boolean;
    isReconciled: boolean;
    reconcileDate: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type CLASS_BY_FACULTY_ID = {
  success: boolean;
  data: [
    {
      _id: string;
      className: string;
      status: number;
    }
  ];
};

export type SECTION_BY_FACULTY_ID_AND_CLASS_ID = {
  success: boolean;
  data: [
    {
      _id: string;
      sectionName: string;
      classId: string;
      status: number;
    }
  ];
};

export type SUBJECT_BY_CLASS_AND_SECTION = {
  success: boolean;
  data: [
    {
      _id: string;
      classId: string;
      sectionId: string;
      subjectCode: string;
      subjectName: string;
    }
  ];
};

export type MONTH_TYPE = {
  success: boolean;
  message: string;
  data: {
    docs: [
      {
        _id: string;
        month: string;
        status: number;
        sNo: number;
      }
    ];
  };
};
