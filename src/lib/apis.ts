export const apis = {
  photoApi: 'https://api.slingacademy.com/v1/sample-data/photos',
  jsonApi: 'https://jsonplaceholder.typicode.com/posts'
} as const;

export const authApi = {
  sendOtpLogin: '/auth/send-mobile-otp',
  verifyOtpLogin: '/auth/verify-mobile-otp',
  login: '/auth/login',
  register: '/auth/register',
  resetPassword: '/auth/reset-password',
  getUser: '/user/get-user',
  updateProfile: '/user/update-profile',
  changePassword: '/user/change-password',
  sendOtpViaEmail: '/auth/send-email-otp',
  verifyOtp: '/auth/verify-otp',
  loginWithOtp: '/auth/send-mobile-otp',
  updateDeviceToken: 'auth/update-device-token'
} as const;

export const expenseApi = {
  // role api
  createRole: '/role/create-role',
  getAllRoles: '/role/get-all-role',
  updateRole: '/role/update-role',
  deleteRole: '/role/delete-role',
  getRoleById: '/role/get-role-by-id',
  // close role api

  // category api
  createCategory: '/category/create-category',
  getAllCategories: '/category/get-all-category',
  updateCategory: '/category/update-category',
  deleteCategory: '/category/delete-category',
  getCategoryById: '/category/get-category-by-id',
  // close category api
  // expenses api
  createExpense: '/expense/create',
  getUserExpenses: '/expense/list',
  getExpenseById: '/expense/detail',
  updateExpense: '/expense/update',
  deleteExpense: '/expense/delete',
  // close expenses api
  // Reports and Analytics
  getExpenseReport: '/expense/report',
  getExpenseSummary: '/expense/summary',
  getMonthlyTrend: '/expense/trend',
  getAdminOverview: '/expense/admin/overview',
  getUserOverview: '/expense/overview',

  getUserReport: '/expense/user/report',
  getAdminReport: '/expense/admin/report',

  // close Reports and Analytics

  // user management api
  getAllUsers: '/user/get-all-user',
  uploadProfileImage: '/user/upload-image-url',
  updateUser: '/user/update-profile',
  getUserWithId: '/user/edit',
  updateUserAdmin: '/user/update-user',
  createUser: '/user/create-user',
  updateUserStatus: '/update-user-status'
  // close user management api
} as const;
