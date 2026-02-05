export interface IExpense {
  _id?: string;
  userId: string;
  categoryId: string;
  amount: number;
  expenseDate: string | Date;
  paymentMethod?: string;
  description?: string;
  tags?: string[];
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    _id: string;
    categoryName: string;
    description?: string;
  };
  user?: {
    _id: string;
    fullName: string;
    email: string;
  };
}

export interface ICreateExpensePayload {
  categoryId: string;
  amount: number;
  expenseDate: string | Date;
  paymentMethod?: string;
  description?: string;
  tags?: string[];
}

export interface IExpenseApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface IPaginatedExpenses {
  docs: IExpense[];
  totalDocs: number;
  limit: number;
  page: number;
  pages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IExpenseFilters {
  page?: number;
  limit?: number;
  q?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  paymentMethod?: string;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  description?: string;
}
