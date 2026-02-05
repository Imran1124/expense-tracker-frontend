import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FormProviders,
  RHFTextField,
  RHFSelectField,
  RHFTextArea,
  ButtonLoading
} from '@/components/forms';
import { messageService } from '@/lib';
import {
  ICreateExpensePayload,
  IExpense,
  ICategory
} from '@/types/expenseType';

interface ExpenseFormProps {
  isEdit?: boolean;
  initialData?: IExpense;
  categories?: ICategory[];
  onSuccess?: () => void;
  onSubmit: (data: ICreateExpensePayload) => Promise<any>;
  isLoading?: boolean;
}

const validationSchema = yup.object().shape({
  categoryId: yup.string().required('Category is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than 0')
    .required('Amount is required'),
  expenseDate: yup.string().required('Expense date is required'),
  paymentMethod: yup.string().optional(),
  description: yup.string().optional()
});

export default function ExpenseForm({
  isEdit = false,
  initialData,
  categories = [],
  onSuccess,
  onSubmit,
  isLoading = false
}: ExpenseFormProps) {
  const methods = useForm<ICreateExpensePayload>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      amount: initialData?.amount || 0,
      expenseDate: initialData?.expenseDate
        ? new Date(initialData.expenseDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      paymentMethod: initialData?.paymentMethod || '',
      description: initialData?.description || ''
    }
  });
  console.log(categories);
  const handleFormSubmit = async (data: any) => {
    try {
      const payload: ICreateExpensePayload = {
        categoryId: data.categoryId,
        amount: parseFloat(data.amount),
        expenseDate: new Date(data.expenseDate).toISOString(),
        paymentMethod: data.paymentMethod || undefined,
        description: data.description || undefined,
        tags: data.tags
          ? data.tags
              .split(',')
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag)
          : undefined
      };

      await onSubmit(payload);
      messageService.success(
        isEdit ? 'Expense updated successfully' : 'Expense created successfully'
      );
      methods.reset();
      onSuccess?.();
    } catch (error: any) {
      messageService.error(error.message || 'Failed to save expense');
    }
  };

  const paymentMethods = [
    { label: 'Cash', value: 'cash' },
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'Digital Wallet', value: 'digital_wallet' },
    { label: 'Check', value: 'check' },
    { label: 'Other', value: 'other' }
  ];

  return (
    <FormProviders
      methods={methods}
      onSubmit={methods.handleSubmit(handleFormSubmit)}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEdit ? 'Edit Expense' : 'Create New Expense'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isEdit
              ? 'Update your expense details below'
              : 'Enter the details of your new expense'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Selection */}
          <div className="col-span-1">
            {categories?.docs?.length > 0 ? (
              <RHFSelectField
                name="categoryId"
                label="Category"
                data={categories?.docs.map((cat) => ({
                  label: cat.categoryName,
                  value: cat._id
                }))}
              />
            ) : (
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                  Loading categories...
                </div>
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="col-span-1">
            <RHFTextField
              name="amount"
              label="Amount"
              type="number"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          {/* Expense Date */}
          <div className="col-span-1">
            <RHFTextField name="expenseDate" label="Expense Date" type="date" />
          </div>

          {/* Payment Method */}
          <div className="col-span-1">
            <RHFSelectField
              name="paymentMethod"
              label="Payment Method (Optional)"
              data={paymentMethods}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <RHFTextArea
            name="description"
            label="Description (Optional)"
            placeholder="Add notes about this expense..."
            rows={4}
          />
        </div>

        {/* Tags */}
        <div>
          <RHFTextField
            name="tags"
            label="Tags (Optional)"
            placeholder="Enter tags separated by commas (e.g., lunch, office, conference)"
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Separate multiple tags with commas
          </p>
        </div>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="reset"
            onClick={() => methods.reset()}
            className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            Reset
          </button>
          <ButtonLoading
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200"
          >
            {isEdit ? 'Update Expense' : 'Create Expense'}
          </ButtonLoading>
        </div>
      </div>
    </FormProviders>
  );
}
