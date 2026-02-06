export type FetchUsersResponse = {
  success: boolean;
  message: string;
  data: {
    docs: {
      _id: string;
      fullName: string;
      roleId: string;
      mobile: string;
      email: string;
      status: number;
      createdAt: string;
      updatedAt: string;
      role: 'User' | 'Admin';
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

export type UserDetailsResponse = {
  success: boolean;
  userDetails: {
    _id: string;
    fullName: string;
    roleId: string;
    mobile: string;
    email: string;
    password: string;
    isVerified: boolean;
    status: number;
    createdAt: string;
    updatedAt: string;
  };
};
