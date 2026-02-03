import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

type Props = SelectProps & {
  name: string;
  data: { value: string; label: string }[];
  selectedText?: string;
  label?: any;
  className?: string;
  children?: React.ReactNode;
  initialName?: string;
  isRequired?: boolean;
  isNormal?: boolean;
};

export const NormalSelectField = ({
  children,
  name,
  label,
  selectedText,
  className,
  data,
  isRequired,
  initialName,
  isNormal = true,
  ...other
}: Props) => {
  return (
    <>
      <label
        className="text-gray-700 dark:text-gray-200 text-sm font-semibold"
        htmlFor={label}
      >
        {label}
      </label>
      <Select {...other}>
        <SelectTrigger
          className={cn(
            'h-10 rounded-xl py-6 px-5 w-full bg-background dark:bg-black flex items-center justify-between border border-zinc-200 dark:border-zinc-700 shadow-sm ring-offset-white dark:ring-offset-gray-950 placeholder-text-zinc-500 dark:placeholder-text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 dark:text-gray-100',
            className
          )}
        >
          <SelectValue placeholder={initialName ?? 'Select'} />
        </SelectTrigger>
        <SelectContent className="py-2 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700">
          <SelectGroup>
            {data?.map((item, index) => (
              <SelectItem
                key={index + 1}
                value={item.value}
                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

const RHFSelectField = ({
  children,
  name,
  label,
  selectedText,
  className,
  data,
  isRequired,
  isNormal = true,
  ...other
}: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) =>
        isNormal ? (
          <>
            <label
              className="text-gray-700 dark:text-gray-200 text-sm font-semibold"
              htmlFor={label}
            >
              {label}
            </label>
            <select
              {...field}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                field.onChange(e);
                if (selectedText) {
                  setValue(
                    selectedText,
                    data?.find((item) => item.value == e.target.value)?.label
                  );
                }
              }}
              ref={ref}
              className={cn(
                'flex h-12 w-full rounded-xl border border-input bg-transparent dark:bg-black px-3 py-1 text-sm text-gray-900 dark:text-gray-100 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 dark:border-gray-600',
                error ? 'border-red-400 dark:border-red-500' : null,
                className
              )}
              {...other}
            >
              <option
                value=""
                className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              >
                Select
              </option>
              {data?.map((item, index) => (
                <option
                  key={index + 1}
                  value={item.value}
                  className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
                >
                  {item.label}
                </option>
              ))}
            </select>

            {error && (
              <span className="text-red-400 dark:text-red-500 text-xs">
                {error?.message}
              </span>
            )}
          </>
        ) : (
          <>
            <label className="text-gray-700 dark:text-gray-200" htmlFor={label}>
              {label}{' '}
              {error && label && (
                <span className="text-red-400 dark:text-red-500">*</span>
              )}
            </label>
            <Select
              onValueChange={(e) => {
                field.onChange(e);
                if (selectedText) {
                  setValue(
                    selectedText,
                    data?.find((item) => item.value == e)?.label
                  );
                }
              }}
              value={field.value}
              {...other}
            >
              <SelectTrigger
                ref={ref}
                className={cn(
                  'h-10 rounded-xl py-6 px-5 w-full bg-background dark:bg-gray-800 flex items-center justify-between border border-zinc-200 dark:border-zinc-700 shadow-sm ring-offset-white dark:ring-offset-gray-950 placeholder-text-zinc-500 dark:placeholder-text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 dark:text-gray-100',
                  error ? 'border-red-400 dark:border-red-500' : null,
                  className
                )}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="py-2 rounded-xl bg-white dark:bg-gray-800 border border-zinc-200 dark:border-zinc-700">
                <SelectGroup>
                  {data?.map((item, index) => (
                    <SelectItem
                      key={index + 1}
                      value={item.value}
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {error && (
              <span className="text-red-400 dark:text-red-500 text-xs">
                {error?.message}
              </span>
            )}
          </>
        )
      }
    />
  );
};

export default RHFSelectField;
