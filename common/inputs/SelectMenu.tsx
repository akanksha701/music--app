import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  control: any;
  name: Path<T>;
  label?: string;
  items: Array<{ id: string; name: string }>; // Define the structure of items
  rules?: any;
  error?: string;
  id?: string;
}

const SelectMenu = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  rules,
  error,
  id,
}: SelectProps<T>) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <label className='mb-2 text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => {
          return (
            <Select
              id={id}
              onChange={(selectedValue) => {
                onChange(selectedValue); // Update the form state
              }}
              selectedKeys={[value]}
              ref={ref} // Ensure ref is passed correctly
              placeholder='Select an option'
              color={error ? 'danger' : 'default'}
            >
              {items.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </Select>
          );
        }}
      />
    </div>
  );
};

export default SelectMenu; // Ensure this line is present