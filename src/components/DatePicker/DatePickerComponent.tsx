import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const DatePickerComponent: React.FC = () => {
  const currentDay = dayjs();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker
        onChange={onChange}
        style={{ width: '100%' }}
        defaultValue={currentDay}
        minDate={currentDay}             
        format={dateFormat}
      />
    </Space>
  );
};

export default DatePickerComponent;
