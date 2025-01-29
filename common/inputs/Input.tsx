'use client';
import React from 'react';
import { FieldError, FieldValues } from 'react-hook-form';
import { INextInputProps } from '../types/types';
// import { Input as NextUIInput } from '@/components/ui/input';
import {Input as NextUIInput } from "@heroui/input";
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
  className = '',
  defaultValue, 

}: INextInputProps<T> & { defaultValue?: string | number | undefined }) => {
  const hasError = errors[id] as FieldError;
  return (
    <div>
      {/* {label && (
        <label
          htmlFor={id}
          className={`block mb-2 ${
            hasError ? 'text-red-500' : 'text-gray-900'
          }`}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )} */}
      <NextUIInput
        id={id}
        label={label}
        {...register(id as any, options)}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        defaultValue={defaultValue as string} 
        className={`p-2   w-full ${
          hasError ? 'border-red-500' : 'border-green-300'
        } ${className}`}
        // style={{
        //   outline: hasError ? '1px solid red' : 'none',
        // }}
        color={hasError ? 'danger':'default'}
      />
      {/* {hasError && (
        <p className="text-red-500 text-sm mt-1">{hasError.message}</p>
      )} */}
    </div>
  );
};

export default NextInput;
