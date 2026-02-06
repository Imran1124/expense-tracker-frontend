// form
import { useFormContext, Controller } from 'react-hook-form';
import {
  customInputValidation,
  InputValidationType,
  TextAreaType
} from '@/lib';

// ----------------------------------------------------------------------

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  name: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  borderColor?: string;
  inputValidation?: InputValidationType;
};

export default function RHFTextArea({
  name,
  label,
  size,
  borderColor,
  inputValidation,
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
            {error && <span className="text-red-500 font-extrabold">*</span>}
          </label>
          <textarea
            ref={ref}
            {...field}
            value={
              typeof field.value === 'number' && field.value === 0
                ? ''
                : field.value
            }
            onInput={(e: TextAreaType) => {
              if (inputValidation) {
                customInputValidation(e, inputValidation);
              }
            }}
            className={`w-full rounded-xl font-medium transition-all duration-300 resize-none ${
              (size === 'small' && 'p-2 min-h-20') ||
              (size === 'medium' && 'p-4 min-h-32') ||
              (size === 'large' && 'p-5 min-h-48') ||
              'p-4 min-h-32'
            } ${
              error
                ? 'border-2 border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700'
                : 'border-2 border-purple-200 dark:border-purple-900/40 bg-white dark:bg-slate-700 hover:border-purple-300 dark:hover:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800'
            } placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none`}
            {...other}
          ></textarea>
          {error && (
            <p className="text-sm font-semibold text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
              <span>⚠️</span> {error?.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
