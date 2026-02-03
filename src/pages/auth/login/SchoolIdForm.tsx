import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonLoading, RHFTextField, FormProviders } from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { getErrorMessage, schoolApi } from '@/lib';
import { Building2 } from 'lucide-react';
import LoginTitle from './LoginTitle';

type Props = {
  next: () => void;
};

const schema = yup.object({
  schoolId: yup.string().required('School ID is required')
});

export default function SchoolIdForm({ next }: Props) {
  const mutate = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      schoolId: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await mutate.mutateAsync({
        api: schoolApi.getSchoolId,
        data: data
      });

      if (response?.data?.success) {
        localStorage.setItem('SID', response?.data?.schoolId);
        localStorage.setItem('schoolName', response?.data?.schoolName);
        localStorage.setItem('schoolLogo', response?.data?.schoolLogo);
        toast.success(
          response?.data?.message || 'School verified successfully!'
        );
        next();
      } else {
        toast.error(response?.data?.message || 'Verification failed');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <LoginTitle />
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-lg border border-primary/20 mb-4">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-slate-800 dark:text-slate-200">
                  School Verification
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Please enter your school ID to continue
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <RHFTextField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="schoolId"
              inputValidation={['removeSpace']}
              placeholder="Enter your school ID"
            />
          </div>

          <div className="pt-1">
            <ButtonLoading
              type="submit"
              isLoading={mutate.isPending}
              className="w-full h-9 rounded-lg px-3 shadow-md bg-primary hover:bg-primary/90 text-white font-medium transition-all hover:translate-y-[-1px] active:translate-y-[1px] text-sm"
              variant="default"
            >
              Verify School
            </ButtonLoading>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contact your school administrator if you don't have an ID
            </p>
          </div>
        </div>
      </FormProviders>
    </>
  );
}
