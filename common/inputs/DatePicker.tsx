import React from 'react';
import { DatePicker } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { CalendarDate } from '@internationalized/date';
import { IDatePickerType } from '../types/types';



const NextDatePicker = (props: IDatePickerType) => {
  const { control, label, name, rules, error } = props;

  return (
    <Controller
      control={control}
      rules={rules}
      name={name || ''}
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
            onChange={(date) =>
            {  
              onChange(
                date
                  ? new CalendarDate(date.year, date.month, date.day)
                  : null
              );}
            }
            color={error ? 'danger' : 'default'}
          />
        );
      }}
    />
  );
};

export default NextDatePicker;
