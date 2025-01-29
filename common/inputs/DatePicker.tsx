import React from 'react';
import {DatePicker} from "@heroui/react";
import { Controller, FieldValues } from 'react-hook-form';
import { CalendarDate } from '@internationalized/date';
import { IDatePickerType } from '../types/types';
// import { DatePicker } from '@nextui-org/react';

const NextDatePicker = <T extends FieldValues>(props: IDatePickerType<T>) => {
  const { control, label, name, rules, error ,className} = props;

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { value, onChange } }) => {
        const today = new CalendarDate(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate()
        );
        return (
            <DatePicker
              label={label}
              name={name}
              maxValue={today}
              value={value}
              onChange={(date) => {
                onChange(
                  date ? new CalendarDate(date.year, date.month, date.day) : null
                );
              }}
              className={`w-full ${
                error ? '' : 'border-green-300'
              } ${className}`}
              
              color={error ? 'danger' : 'default'}
            />
        );
      }}
    />
  );
};

export default NextDatePicker;
