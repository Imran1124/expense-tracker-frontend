import Page from '@/components/helmet-page';
import { useApi } from '@/hooks/useCustomQuery';
import { expenseApi } from '@/lib';
import { FetchUsersResponse } from './type';
import { useState } from 'react';
import UserForm from './UserForm';
import { TableSkeleton } from '@/components/loaders';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  Search,
  ChevronLeft,
  ChevronRight,
  Users as UsersIcon
} from 'lucide-react';

export default function Users() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const [edit, setEdit] = useState(false);

  const userData = useApi<FetchUsersResponse>({
    api: expenseApi?.getAllUsers,
    key: 'getAllUsers',
    options: { enabled: true }
  });

  const handleEdit = (userId: string) => {
    setEdit(true);
    setOpen(true);
    setId(userId);
  };

  const handleDelete = (userId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete user:', userId);
  };

  /* const confirmDelete = async () => {
    try {
      const res = await putMutation.mutateAsync({
        api: `${expenseApi.updateUserStatus}/${deleteId}`
      });
      if (res.data?.success) {
        toast.success(res?.data?.message || 'User deleted successfully');
        userData.refetch();
      } else {
        toast.error(res.data?.message || 'Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
    } finally {
      setOpenDeleteDialog(false);
      setDeleteId('');
    }
  }; */

  const handleAddNew = () => {
    setEdit(false);
    setId('');
    setOpen(true);
  };

  const users = userData?.data?.data?.docs || [];
  const totalPages = userData?.data?.data?.totalPages || 1;

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 0:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'Active';
      case 0:
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Page title="Users">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Users Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and organize all users in your system
                </p>
              </div>
            </div>
          </div>
          <Button onClick={handleAddNew} className="rounded-lg gap-2" size="lg">
            <Plus className="h-4 w-4" />
            Add New User
          </Button>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or mobile..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="border-0 focus-visible:ring-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              {userData.isLoading
                ? 'Loading users...'
                : `Total: ${userData.data?.data?.totalDocs || 0} users`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userData.isLoading ? (
              <TableSkeleton rows={5} columns={6} />
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No users found</p>
                <Button onClick={handleAddNew} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First User
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="font-semibold">Full Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Mobile</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">
                        Created Date
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user._id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {user.fullName}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-sm">{user.mobile}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusColor(user.status)} border-0`}
                          >
                            {getStatusText(user.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem
                                onClick={() => handleEdit(user._id)}
                                className="cursor-pointer gap-2"
                              >
                                <Edit2 className="h-4 w-4" />
                                <span>Edit User</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(user._id)}
                                className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* User Form Modal */}
      <UserForm
        open={open}
        setOpen={setOpen}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={userData.refetch}
      />

      {/* Delete Confirmation Dialog - TODO: Implement delete functionality */}
      {/* <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 my-4">
            <p className="text-sm text-destructive font-medium">
              This user will be permanently removed from the system.
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog> */}
    </Page>
  );
}
