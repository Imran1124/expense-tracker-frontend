import React, { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFNormalSelectField
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
import { UserDetailsResponse } from './type';
import { useRoleList } from '@/hooks/useMaster';
import { X } from 'lucide-react';
import { FormSkeleton } from '@/components/loaders';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Mobile number is required'),
  roleId: yup.string().required('Role is required')
});
type FormData = yup.InferType<typeof schema>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

export default function UserForm({
  open,
  setOpen,
  id,
  edit,
  setEdit,
  refetch
}: Readonly<Props>) {
  const roleMasterData = useRoleList();
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});
  const { data, isFetching } = useApi<UserDetailsResponse>({
    api: `${expenseApi.getUserWithId}/${id}`,
    key: 'getUserWithId',
    options: {
      enabled: edit && open
    }
  });

  const defaultValues = useMemo(
    () => ({
      fullName: data?.userDetails?.fullName || '',
      email: data?.userDetails?.email || '',
      mobile: data?.userDetails?.mobile || '',
      roleId: String(data?.userDetails?.roleId) || ''
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
          api: `${expenseApi.updateUser}`,
          data: {
            id,
            ...data
          }
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data?.message || 'User not updated successfully');
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: expenseApi.createUser,
          data: data
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data?.message || 'User not created successfully');
        }
        methods.reset({ fullName: '', email: '', mobile: '', roleId: '' });
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
      methods.reset(defaultValues);
    } else {
      methods.reset({ fullName: '', email: '', mobile: '', roleId: '' });
    }
  }, [edit, data, methods]);

  const handleClose = () => {
    setOpen(false);
    setEdit!(false);
    methods.reset({ fullName: '', email: '', mobile: '', roleId: '' });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">
                {edit ? 'Edit User' : 'Create New User'}
              </DialogTitle>
              <DialogDescription className="mt-2">
                {edit
                  ? 'Update the user information below'
                  : 'Fill in the details to create a new user'}
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
          <FormSkeleton fields={4} />
        ) : (
          <FormProviders
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-2">
                <RHFNormalSelectField
                  label="Select Role"
                  name="roleId"
                  data={
                    roleMasterData?.data?.data?.docs?.map((item) => {
                      return {
                        label: item?.roleName,
                        value: String(item?._id)
                      };
                    }) || []
                  }
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <RHFTextField
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter full name"
                  inputValidation={['removeSpecialCharacterExceptSpace']}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <RHFTextField
                  label="Email Address"
                  name="email"
                  placeholder="Enter email address"
                  type="email"
                  inputValidation={['removeSpecialCharacterExceptSpace']}
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <RHFTextField
                  label="Mobile Number"
                  name="mobile"
                  placeholder="Enter mobile number"
                  inputValidation={['removeSpecialCharacterExceptSpace']}
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
                  {edit ? 'Update User' : 'Create User'}
                </ButtonLoading>
              </div>
            </div>
          </FormProviders>
        )}
      </DialogContent>
    </Dialog>
  );
}
