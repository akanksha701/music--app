import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { ISelectProps } from '../types/types';


const SelectMenu = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  rules,
  error,
  id,
}: ISelectProps<T>) => {
  return (
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
  );
};

export default SelectMenu; // Ensure this line is present