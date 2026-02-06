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
        <>
          <label
            className="text-gray-700 dark:text-gray-200 text-xs font-bold"
            htmlFor={label}
          >
            {label} {error && label && <span className="text-red-400">*</span>}
          </label>
          <Input
            {...field}
            value={
              typeof field.value === 'number' && field.value === 0
                ? ''
                : field.value
            }
            ref={ref}
            // if error then border-red-400 else border-indigo-400
            className={`${error ? 'border-red-400' : null}
            ${
              (inputSize === 'small' && 'h-8') ||
              (inputSize === 'medium' && 'h-10') ||
              (inputSize === 'large' && 'h-12') ||
              'h-9'
            }`}
            onInput={(e: InputElementType) => {
              if (inputValidation) {
                customInputValidation(e, inputValidation);
              }
            }}
            {...other}
          />
          {
            // if is field ayrray then show error message
            error && (
              <span className="text-red-400 text-xs">{error.message}</span>
            )

            // if not field array then show error message
          }
        </>
      )}
    />
  );
}
