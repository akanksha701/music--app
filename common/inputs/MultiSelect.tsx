import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { ISelectProps } from "../types/types";

const MultiSelect = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  rules,
  error,
  id,
}: ISelectProps<T>) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value = [], ref } }) => {
          return (
            <Select
              id={id}
              onChange={(selectedValue) => {
                onChange(selectedValue);
              }}
              ref={ref}
              placeholder="Select an option"
              color={error ? "danger" : "default"}
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

export default MultiSelect;
