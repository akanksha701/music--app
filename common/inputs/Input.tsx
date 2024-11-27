'use client';
import React from 'react';
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from 'react-hook-form';
import { Input as NextUIInput } from '@nextui-org/react';
import { UserData } from '@clerk/types';

interface NextInputProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  id: any;
  register: UseFormRegister<UserData>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  options?: object;
  name?: string;
}

const NextInput = <T extends FieldValues>({
  label,
  placeholder,
  required,
  type = 'text',
  id,
  register,
  errors,
  disabled,
  options,
}: NextInputProps<T>) => {
  return (
    <div className='mb-3'>
      {label && (
        <label className='block mb-2 text-sm font-medium text-gray-900'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <NextUIInput
        id={id}
        {...register(id, options)}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        fullWidth
        color={errors[id] ? 'danger' : 'default'} // Use 'danger' for error color
      />
    </div>
  );
};

export default NextInput;
