export type CategoriesResponse = {
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
};

export type GET_CATEGORY_BY_ID_RESPONSE = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    categoryName: string;
    status: number;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
};
