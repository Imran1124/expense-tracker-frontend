import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { axios, authApi } from '@/lib';
import { IUser } from '@/store';
import RHFTextField from '@/components/forms/RHFTextField';
import RHFTextArea from '@/components/forms/RHFTextArea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Check } from 'lucide-react';

// Validation Schema
const profileSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  mobile: yup
    .string()
    .min(10, 'Mobile must be at least 10 digits')
    .required('Mobile is required'),
  address: yup.string().notRequired()
});

type ProfileFormValues = yup.InferType<typeof profileSchema>;

interface ProfileFormProps {
  user: IUser;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const methods = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      address: user?.address || ''
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSubmitting(true);
      setShowSuccess(false);

      const response = await axios.put(authApi.updateProfile, {
        fullName: data.fullName,
        mobile: data.mobile,
        address: data.address
      });

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || 'Profile updated successfully'
        );
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        toast.error(response?.data?.message || 'Failed to update profile');
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <Card className="p-6 border-purple-200 dark:border-purple-900/40">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></span>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RHFTextField
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <RHFTextField
              name="email"
              label="Email Address"
              type="email"
              disabled
              placeholder="Enter your email"
            />
            <RHFTextField
              name="mobile"
              label="Mobile Number"
              placeholder="Enter your mobile number"
            />
          </div>
        </Card>

        {/* Address Information Section */}
        <Card className="p-6 border-purple-200 dark:border-purple-900/40">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></span>
            Address Information
          </h3>
          <div className="space-y-6">
            <RHFTextArea
              name="address"
              label="Street Address"
              placeholder="Enter your street address"
              rows={3}
            />
          </div>
        </Card>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40 rounded-lg flex items-center gap-3 animate-in fade-in">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              Your profile has been updated successfully!
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4 pt-6 border-t border-purple-200 dark:border-purple-900/40">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => methods.reset()}
            className="px-8 py-3"
          >
            Reset
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
