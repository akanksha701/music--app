"use client";
import React from "react";
import { FieldError, FieldValues } from "react-hook-form";
import { INextInputProps } from "../types/types";
import { Input as NextUIInput } from "@/components/ui/input";
const NextInput = <T extends FieldValues>({
  label,
  placeholder,
  required,
  type = "text",
  id,
  register,
  errors,
  disabled,
  options,
  className = "",
}: INextInputProps<T>) => {
  const hasError = errors[id] as FieldError;
  return (
    <div className="mb-3">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <NextUIInput
        id={id}
       
        {...register(id as any, options)}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        className="border-2 border-red-500"
        // className={`p-2 border rounded-md shadow-sm w-full ${
        //   hasError ? "border-2 border-red-500" : "border-gray-300"
        // } `}
      />
      {/* {hasError && (
        <p className="text-red-500 text-sm">{errors[id]?.message as string}</p>
      )} */}
    </div>
  );
};

export default NextInput;
