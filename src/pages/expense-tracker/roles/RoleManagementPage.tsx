import { useState } from 'react';
import moment from 'moment';
import {
  Plus,
  Pencil,
  Shield,
  Calendar,
  Users,
  Search,
  FileText,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { useApi } from '@/hooks/useCustomQuery';
import { expenseApi } from '@/lib';
import { RolesResponse } from './type';
import PaginationComponent from '@/components/pagination';
import { Separator } from '@/components/ui/separator';
import SearchBox from '@/components/search-box';
import Spinner from '@/components/loaders/Spinner';
import RoleForm from './RoleForm';

export default function RoleManagementPage() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const [edit, setEdit] = useState(false);

  const empTypeListData = useApi<RolesResponse>({
    api: `${expenseApi.getAllRoles}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllRoles',
    value: [page, perPage, search],
    options: {
      enabled: true
    }
  });

  const handleEdit = (id: string) => {
    setEdit(true);
    setOpen(true);
    setId(id);
  };

  const handleAddNew = () => {
    setEdit(false);
    setId('');
    setOpen(true);
  };

  const totalRoles = empTypeListData?.data?.data?.totalDocs || 0;
  const roles = empTypeListData?.data?.data?.docs || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 lg:p-8">
      <RoleForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Role' : 'Add New Role'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={empTypeListData.refetch}
      />

      <div className="mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Role Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage user roles and permissions
                </p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="gap-2 shadow-lg transition-all hover:shadow-xl"
            onClick={handleAddNew}
          >
            <Plus className="h-4 w-4" />
            Add New Role
          </Button>
        </div>

        {/* Stats Card */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Roles
                  </p>
                  <p className="text-3xl font-bold">{totalRoles}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Page
                  </p>
                  <p className="text-3xl font-bold">{page}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Roles per Page
                  </p>
                  <p className="text-3xl font-bold">{perPage}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-xl">
          <CardHeader className="border-b bg-muted/50 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="h-5 w-5 text-primary" />
                  Roles Directory
                </CardTitle>
                <CardDescription className="mt-1">
                  {totalRoles} {totalRoles === 1 ? 'role' : 'roles'} found
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  refetch={empTypeListData.refetch}
                  isFetching={empTypeListData?.isLoading}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {empTypeListData.isLoading ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center space-y-3">
                  <Spinner />
                  <p className="text-sm text-muted-foreground">
                    Loading roles...
                  </p>
                </div>
              </div>
            ) : roles.length === 0 ? (
              <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Shield className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No roles found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {search
                      ? `No roles match your search "${search}". Try a different search term.`
                      : 'Get started by creating your first role.'}
                  </p>
                </div>
                {!search && (
                  <Button onClick={handleAddNew} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create First Role
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="w-20 font-semibold">#</TableHead>
                        <TableHead className="font-semibold">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            Role Name
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            Created Date
                          </div>
                        </TableHead>
                        <TableHead className="text-right font-semibold">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roles.map((items, index) => (
                        <TableRow
                          key={items?._id}
                          className="group transition-colors hover:bg-muted/50"
                        >
                          <TableCell className="font-medium text-muted-foreground">
                            <Badge variant="outline" className="font-mono">
                              {(page - 1) * perPage + index + 1}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Shield className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-semibold">
                                  {items?.roleName}
                                </p>
                                {items?.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {items.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {moment(items?.createdAt).format('DD MMM YYYY')}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="gap-2 shadow-sm transition-all hover:shadow-md"
                                      onClick={() =>
                                        handleEdit(String(items?._id))
                                      }
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                      Edit
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit role details</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                <div className="flex items-center justify-between px-6 py-4 bg-muted/20">
                  <p className="text-sm text-muted-foreground">
                    Showing{' '}
                    <span className="font-medium">
                      {(page - 1) * perPage + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(page * perPage, totalRoles)}
                    </span>{' '}
                    of <span className="font-medium">{totalRoles}</span> roles
                  </p>
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={empTypeListData?.data?.data?.totalPages || 0}
                    setPage={setPage}
                    setPerPage={setPerPage}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
