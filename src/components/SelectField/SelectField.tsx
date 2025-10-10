import React from 'react';
import { Select, Space, type SelectProps } from 'antd';

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const SelectField: React.FC<SelectProps> = ({options, defaultValue}) => (
    <Space wrap>
        <Select
            defaultValue={defaultValue}
            style={{ minWidth: 150 }}
            onChange={handleChange}
            options={options}
        />
    </Space>
);

export default SelectField;