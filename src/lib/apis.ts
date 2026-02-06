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
  changePassword: '/user/change-password'
} as const;

// router.post('/create-role', CreateRole); // endpoint: /role/create-role, body{roleName, description}
// router.get('/get-all-role', GetAllRole); // endpoint: /role/get-all-role
// router.put('/update-role/:id', UpdateRole); // endpoint: /role/update-role/:id
// router.delete('/delete-role/:id', DeleteRole); // endpoint: /role/delete-role/:id
// router.get('/get-role-by-id/:id', GetRoleById); // endpoint: /role/get-role-by-id/:id

// router.post('/create-category', CreateCategory); // endpoint: /category/create-category, body{categoryName, description}
// router.get('/get-all-category', GetAllCategory); // endpoint: /category/get-all-category
// router.put('/update-category/:id', UpdateCategory); // endpoint: /category/update-category/:id
// router.delete('/delete-category/:id', DeleteCategory); // endpoint: /category/delete-category/:id
// router.get('/get-category-by-id/:id', GetCategoryById); // endpoint: /category/get-category-by-id/:id
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
