import React, { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFNormalSelectField,
  RHFTextArea
} from '@/components/forms';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  useApi,
  usePostMutation,
  usePutMutation
} from '@/hooks/useCustomQuery';
import { expenseApi } from '@/lib';
import { ExpenseResponse } from './type';
import { useRoleList } from '@/hooks/useMaster';
import { X } from 'lucide-react';
import { useCategoryList } from '@/hooks/useMaster';

// categoryId, amount, expenseDate, paymentMethod, description, tags

const schema = yup.object().shape({
  categoryId: yup.string().required('Category is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required'),
  expenseDate: yup.string().required('Expense date is required'),
  paymentMethod: yup.string().required('Payment method is required'),
  description: yup.string()
});
type FormData = yup.InferType<typeof schema>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  id?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchExpenseList: () => void;
  refetchReport: () => void;
  refetchSummary: () => void;
  refetchTrend: () => void;
};

export default function UserForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetchExpenseList,
  refetchReport,
  refetchSummary,
  refetchTrend
}: Readonly<Props>) {
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});
  const categoryListData = useCategoryList();
  const { data, isFetching } = useApi<ExpenseResponse>({
    api: `${expenseApi.getExpenseById}/${id}`,
    key: 'getUserWithId',
    options: {
      enabled: edit && open
    }
  });

  const defaultValues = useMemo(
    () => ({
      categoryId:
        typeof data?.data?.categoryId === 'string'
          ? data?.data?.categoryId
          : (data?.data?.categoryId as any)?._id || '',
      amount: data?.data?.amount || 0,
      expenseDate: data?.data?.expenseDate
        ? new Date(data.data.expenseDate).toISOString().split('T')[0]
        : '',
      paymentMethod: data?.data?.paymentMethod || '',
      description: data?.data?.description || ''
    }),
    [data]
  );

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${expenseApi.updateExpense}`,
          data: {
            id,
            ...data
          }
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data?.message || 'Expense not updated successfully');
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: expenseApi.createExpense,
          data: data
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data?.message || 'Expense not created successfully');
        }
        methods.reset({
          categoryId: '',
          amount: 0,
          expenseDate: '',
          paymentMethod: '',
          description: ''
        });
      }
      setOpen(false);
      setEdit!(false);
      refetchExpenseList();
      refetchReport();
      refetchSummary();
      refetchTrend();
    } catch (error) {
      // Error handled silently
    }
  };

  useEffect(() => {
    if (edit && data) {
      methods.reset(defaultValues);
    } else {
      methods.reset({
        categoryId: '',
        amount: 0,
        expenseDate: '',
        paymentMethod: '',
        description: ''
      });
    }
  }, [edit, data, methods]);

  const handleClose = () => {
    setOpen(false);
    setEdit!(false);
    methods.reset({
      categoryId: '',
      amount: 0,
      expenseDate: '',
      paymentMethod: '',
      description: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">
                {edit ? 'Edit Expense' : 'Create New Expense'}
              </DialogTitle>
              <DialogDescription className="mt-2">
                {edit
                  ? 'Update the expense information below'
                  : 'Fill in the details to create a new expense'}
              </DialogDescription>
            </div>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        {isFetching && edit ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <FormProviders
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="space-y-5">
              {/* Category Selection */}
              <div className="space-y-2">
                <RHFNormalSelectField
                  label="Select Category"
                  name="categoryId"
                  data={
                    categoryListData?.data?.data?.docs?.map((item) => {
                      return {
                        label: item?.categoryName,
                        value: String(item?._id)
                      };
                    }) || []
                  }
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <RHFTextField
                  label="Amount"
                  name="amount"
                  placeholder="Enter amount"
                  inputValidation={['number']}
                />
              </div>

              {/* Expense Date */}
              <div className="space-y-2">
                <RHFTextField
                  label="Expense Date"
                  name="expenseDate"
                  placeholder="Select expense date"
                  type="date"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <RHFNormalSelectField
                  label="Select Payment Method"
                  name="paymentMethod"
                  data={[
                    { label: 'Cash', value: 'cash' },
                    { label: 'Credit Card', value: 'credit_card' },
                    { label: 'Debit Card', value: 'debit_card' },
                    { label: 'Online Payment', value: 'online' },
                    { label: 'UPI', value: 'upi' },
                    { label: 'Other', value: 'other' }
                  ]}
                />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <RHFTextArea
                  label="Description"
                  name="description"
                  placeholder="Enter description (optional)"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 h-11 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                >
                  Cancel
                </button>
                <ButtonLoading
                  isLoading={methods.formState.isSubmitting}
                  type="submit"
                  className="flex-1 h-11 rounded-lg"
                >
                  {edit ? 'Update Expense' : 'Create Expense'}
                </ButtonLoading>
              </div>
            </div>
          </FormProviders>
        )}
      </DialogContent>
    </Dialog>
  );
}
