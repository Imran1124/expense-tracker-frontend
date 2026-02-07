import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { axios, authApi } from '@/lib';
import RHFPasswordField from '@/components/forms/RHFPasswordField';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Check, AlertCircle } from 'lucide-react';

// Validation Schema
const passwordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], "Passwords don't match")
});

type PasswordFormValues = yup.InferType<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const methods = useForm<PasswordFormValues>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      setIsSubmitting(true);
      setShowSuccess(false);

      const response = await axios.post(authApi.changePassword, {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      });

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || 'Password changed successfully'
        );
        setShowSuccess(true);
        methods.reset();
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        toast.error(response?.data?.message || 'Failed to change password');
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to change password';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {/* Security Warning Card */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                Password Security Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Use at least 8 characters</li>
                <li>• Mix uppercase and lowercase letters</li>
                <li>• Include numbers and special characters</li>
                <li>• Avoid using personal information</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Password Fields Section */}
        <Card className="p-6 border-purple-200 dark:border-purple-900/40">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></span>
            Update Your Password
          </h3>
          <div className="space-y-6">
            <RHFPasswordField
              name="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
            />
            <div className="border-t border-purple-200 dark:border-purple-900/40 pt-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                New Password
              </h4>
              <div className="space-y-6">
                <RHFPasswordField
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter your new password"
                />
                <RHFPasswordField
                  name="confirmPassword"
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40 rounded-lg flex items-center gap-3 animate-in fade-in">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              Your password has been changed successfully. Please use your new
              password in your next login.
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
                Updating...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Change Password
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => methods.reset()}
            className="px-8 py-3"
          >
            Clear
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
