import React from 'react';
import { DatePicker } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { CalendarDate } from '@internationalized/date';

interface PropsType {
  control?: any;
  label?: string;
  name?: string;
  rules?: object;
  error?: any;
}

const NextDatePicker = (props: PropsType) => {
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
