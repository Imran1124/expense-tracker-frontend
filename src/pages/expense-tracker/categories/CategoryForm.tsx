import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFTextArea
} from '@/components/forms';
import { Separator } from '@/components/ui/separator';
import EditDialogBox from '@/components/edit-dialog-box';
import {
  useApi,
  usePostMutation,
  usePutMutation
} from '@/hooks/useCustomQuery';
import { expenseApi } from '@/lib';
import { GET_CATEGORY_BY_ID_RESPONSE } from './type';

const schema = yup.object().shape({
  categoryName: yup.string().required('Category Name is required'),
  description: yup.string().required('Description is required')
});
type FormData = yup.InferType<typeof schema>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  id?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: () => void;
};

export default function CategoryForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch
}: Readonly<Props>) {
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});
  const { data, isFetching } = useApi<GET_CATEGORY_BY_ID_RESPONSE>({
    api: `${expenseApi.getCategoryById}/${id}`,
    key: 'getCategoryById',
    options: {
      enabled: edit
    }
  });

  const methods = useForm<FormData>({
    defaultValues: { categoryName: '', description: '' },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${expenseApi.updateCategory}/${id}`,
          data: {
            ...data
          }
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data?.message || 'Category not updated successfully');
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: expenseApi.createCategory,
          data: data
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data?.message || 'Category not created successfully');
        }
        methods.reset({ categoryName: '', description: '' });
      }
      setOpen(false);
      setEdit!(false);
      refetch!();
    } catch (error) {
      // Error handled silently
    }
  };
  useEffect(() => {
    if (edit && data) {
      methods.reset({
        categoryName: data?.data?.categoryName || '',

        description: data?.data?.description || ''
      });
    } else {
      methods.reset({ categoryName: '', description: '' });
    }
  }, [edit, data]);

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-x-2 gap-y-4">
          <div>
            <RHFTextField
              name="categoryName"
              placeholder="Enter Category Name"
              inputValidation={['removeSpecialCharacterExceptSpace']}
            />
          </div>

          <div>
            <RHFTextArea
              name="description"
              placeholder="Enter your description"
              inputValidation={['removeSpecialCharacterExceptSpace']}
            />
          </div>
          <Separator />
          <div>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="h-11 w-full rounded-xl"
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}
