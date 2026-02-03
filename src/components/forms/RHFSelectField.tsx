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
  label?: string;
  className?: string;
  placeHolder?: string;
  children?: React.ReactNode;
  isReload?: boolean;
};

const RHFSelectField = ({
  children,
  name,
  label,
  selectedText,
  className,
  data,
  placeHolder,
  isReload,
  ...other
}: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <label className="text-gray-700 dark:text-gray-200" htmlFor={label}>
            {label} {error && <span className="text-red-400">*</span>}
          </label>
          <Select
            onValueChange={(e) => {
              field.onChange(e);
              if (selectedText) {
                // setValue(
                //   selectedText,
                //   children?.find((child: any) => child.props.value === e)?.props
                //     .children
                // );
                setValue(
                  selectedText,
                  data?.find((item) => item.value == e)?.label
                );
              }
              isReload && window.location.reload();
            }}
            defaultValue={field.value}
            {...other}
          >
            <SelectTrigger
              ref={ref}
              className={cn(
                'h-10 mt-1',
                error ? 'border-red-400' : null,
                className
              )}
            >
              <SelectValue placeholder={placeHolder ?? 'Select'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data?.map((item, index) => (
                  <SelectItem key={index + 1} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error && (
            <span className="text-red-400 text-xs">{error?.message}</span>
          )}
        </>
      )}
    />
  );
};

export default RHFSelectField;
