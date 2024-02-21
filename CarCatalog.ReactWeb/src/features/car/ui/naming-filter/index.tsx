import Search from 'antd/es/input/Search';
import React, { FC } from 'react';

interface CarNamingFilterProps {
    onSearch: () => void;
}

const CarNamingFilter:FC<CarNamingFilterProps> = ({onSearch}) => {
    return (
        <Search 
            allowClear
            size={'large'}
            onSearch={onSearch}
            placeholder={'Поиск по наименованию'}
        />
    );
};

export default CarNamingFilter;
