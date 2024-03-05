import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { CarStore } from 'entities/car';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import styles from './index.module.css'

interface CarColorFilterProps {
    onChange: (value?: string) => void;
}

const CarColorFilter:FC<CarColorFilterProps> = ({onChange}) => {
    const {cars} = CarStore;

    const options = useMemo(() => {
        const colorsSet = new Set(cars.map(car => car.color));
        const colorOptions = Array.from(colorsSet).map(color => ({
            label: color,
            value: color,
        } as DefaultOptionType));
        return colorOptions;
    }, [cars]);
    
    return (
        <Select
            size={'large'}
            allowClear
            onChange={onChange}
            className={styles.select}
            placeholder={'Выберите цвет'}
            options={options}
        />
    );
};

export default observer(CarColorFilter);
