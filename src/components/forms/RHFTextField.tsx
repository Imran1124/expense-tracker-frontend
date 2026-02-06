// form
import { useFormContext, Controller } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui/input';
import {
  customInputValidation,
  InputValidationType,
  InputElementType
} from '@/lib';

// ----------------------------------------------------------------------

type Props = InputProps & {
  name: string;
  label?: string;
  isDynamic?: boolean;
  inputValidation?: InputValidationType;
  inputSize?: 'small' | 'medium' | 'large';
};

export default function RHFTextField({
  name,
  label,
  isDynamic,
  inputValidation,
  inputSize,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <div className="space-y-2">
          <label
            className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2"
            htmlFor={label}
          >
            {label}
            {error && label && (
              <span className="text-red-500 font-extrabold">*</span>
            )}
          </label>
          <div className="relative">
            <Input
              {...field}
              value={
                typeof field.value === 'number' && field.value === 0
                  ? ''
                  : field.value
              }
              ref={ref}
              className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                error
                  ? 'border-2 border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700'
                  : 'border-2 border-purple-200 dark:border-purple-900/40 bg-white dark:bg-slate-700 hover:border-purple-300 dark:hover:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800'
              }`}
              onInput={(e: InputElementType) => {
                if (inputValidation) {
                  customInputValidation(e, inputValidation);
                }
              }}
              {...other}
            />
            {error && (
              <div className="absolute right-3 top-3">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          {error && (
            <p className="text-sm font-semibold text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
              <span>⚠️</span> {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
