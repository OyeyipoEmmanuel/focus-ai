import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

type DatePickerComponentProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ value, onChange }) => {
  const currentDay = dayjs();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker
        value={value ? dayjs(value, dateFormat) : undefined}
        onChange={(dateString) => typeof dateString === "string" && onChange?.(dateString)}
        style={{ width: '100%' }}
        defaultValue={currentDay}
        format={dateFormat}
        disabledDate={(current) => current && current < dayjs().startOf('day')} // ✅ no past dates
      />
    </Space>
  );
};

export default DatePickerComponent;
