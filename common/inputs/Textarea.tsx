"use client";
import React from "react";
import { FieldValues } from "react-hook-form";
import { Textarea as NextUITextArea } from "@/components/ui/textarea";
import { INextTextAreaProps } from "../types/types";

const NextTextArea = <T extends FieldValues>({
  label,
  placeholder,
  required,
  type = "text",
  id,
  register,
  errors,
  disabled,
  options,
}: INextTextAreaProps<T>) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <NextUITextArea
        id={id}
        {...register(id as any, options)}
        placeholder={placeholder}
        disabled={disabled}
        className={`p-2 border rounded-md shadow-sm w-full ${
          errors[id] ? "border-2 border-red-500" : "border-gray-300"
        } `}
      />
    </div>
  );
};

export default NextTextArea;
