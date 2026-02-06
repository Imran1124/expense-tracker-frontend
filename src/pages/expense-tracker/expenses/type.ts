export type ExpensesResponse = {
  success: boolean;
  message: string;
  data: {
    docs: Array<{
      _id: string;
      userId: string;
      categoryId: string;
      amount: number;
      expenseDate: string; // ISO date string
      paymentMethod: string;
      tags: string[];
      status: number;
      createdAt: string;
      updatedAt: string;
      category: {
        _id: string;
        categoryName: string;
        description: string;
        status: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      user: {
        _id: string;
        fullName: string;
        roleId: string;
        mobile: string;
        email: string;
        isVerified: boolean;
        status: number;
        createdAt: string;
        updatedAt: string;
      };
    }>;
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
};

export type ExpenseResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: {
      _id: string;
      fullName: string;
      email: string;
    };
    categoryId: {
      _id: string;
      categoryName: string;
      description: string;
    };
    amount: number;
    expenseDate: string; // ISO date string
    paymentMethod: string;
    description: string;
    tags: string[];
    status: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
