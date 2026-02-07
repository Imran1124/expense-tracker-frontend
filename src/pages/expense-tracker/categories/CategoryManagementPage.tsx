import { useState } from 'react';
import moment from 'moment';
import { Plus, Pencil, Tag, Calendar, Layers, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableSkeleton } from '@/components/loaders';
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
import { CategoriesResponse } from './type';
import PaginationComponent from '@/components/pagination';
import { Separator } from '@/components/ui/separator';
import SearchBox from '@/components/search-box';
import CategoryForm from './CategoryForm';

export default function CategoryManagementPage() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const [edit, setEdit] = useState(false);

  const categoryListData = useApi<CategoriesResponse>({
    api: `${expenseApi.getAllCategories}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllCategories',
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

  const totalCategories = categoryListData?.data?.data?.totalDocs || 0;
  const categories = categoryListData?.data?.data?.docs || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 lg:p-8">
      <CategoryForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Category' : 'Add New Category'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={categoryListData.refetch}
      />

      <div className="mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Category Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage expense categories
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
            Add New Category
          </Button>
        </div>

        {/* Stats Card */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Categories
                  </p>
                  <p className="text-3xl font-bold">{totalCategories}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
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
                    Categories per Page
                  </p>
                  <p className="text-3xl font-bold">{perPage}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Tag className="h-6 w-6 text-green-500" />
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
                  <Tag className="h-5 w-5 text-primary" />
                  Categories Directory
                </CardTitle>
                <CardDescription className="mt-1">
                  {totalCategories}{' '}
                  {totalCategories === 1 ? 'category' : 'categories'} found
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  refetch={categoryListData.refetch}
                  isFetching={categoryListData?.isLoading}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {categoryListData.isLoading ? (
              <div className="p-6">
                <TableSkeleton rows={5} columns={5} />
              </div>
            ) : categories.length === 0 ? (
              <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Tag className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No categories found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {search
                      ? `No categories match your search "${search}". Try a different search term.`
                      : 'Get started by creating your first category.'}
                  </p>
                </div>
                {!search && (
                  <Button onClick={handleAddNew} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create First Category
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
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            Category Name
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
                      {categories.map((items, index) => (
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
                                <Tag className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-semibold">
                                  {items?.categoryName}
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
                                    <p>Edit category details</p>
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
                      {Math.min(page * perPage, totalCategories)}
                    </span>{' '}
                    of <span className="font-medium">{totalCategories}</span>{' '}
                    categories
                  </p>
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={categoryListData?.data?.data?.totalPages || 0}
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
