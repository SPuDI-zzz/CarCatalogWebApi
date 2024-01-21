import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { CarStore } from 'entities/car';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.css'

interface CarColorFilterProps {
    onChange: (value?: string) => void;
}

const CarColorFilter:FC<CarColorFilterProps> = ({onChange}) => {
    const [colors, setColors] = useState(new Set<string>());
    const {cars} = CarStore;

    useEffect(() => {
        setColors(new Set(cars.map(car => car.color)))
    }, [cars]);
    
    return (
        <Select
            size={'large'}
            allowClear
            onChange={onChange}
            className={styles.select}
            placeholder={'Выберите цвет'}
            options={Array.from(colors).map(color => ({
                label: color,
                value: color,
            } as DefaultOptionType))}
        />
    );
};

export default observer(CarColorFilter);
