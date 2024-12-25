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
  defaultValue, // New defaultValue prop
}: INextInputProps<T> & { defaultValue?: string }) => {
  const hasError = errors[id] as FieldError;
  return (
    <div className="mb-3">
      {label && (
        <label
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "500",
            fontSize: "14px",
          }}
          htmlFor={id}
          className={`block mb-2 ${
            hasError ? "text-red-500" : "text-gray-900"
          }`}
        >
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
        defaultValue={defaultValue} // Pass defaultValue to the input
        className={`p-2 border rounded-md shadow-sm w-full ${
          hasError ? "" : "border-green-300"
        } ${className}`}
        style={{
          outline: hasError ? "1px solid red" : "none",
        }}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{hasError.message}</p>
      )}
    </div>
  );
};

export default NextInput;
