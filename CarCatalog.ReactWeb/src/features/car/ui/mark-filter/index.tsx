import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { CarStore } from 'entities/car';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.css'

interface CarMarkFilterProps {
    onChange: (value?: string) => void;
}

const CarMarkFilter:FC<CarMarkFilterProps> = ({onChange}) => {
    const [marks, setMarks] = useState(new Set<string>());
    const {cars} = CarStore;

    useEffect(() => {
        setMarks(new Set(cars.map(car => car.mark)))
    }, [cars]);
    
    return (
        <Select
            size={'large'}
            allowClear
            onChange={onChange}
            className={styles.select}
            placeholder={'Выберите марку'}
            options={Array.from(marks).map(mark => ({
                label: mark,
                value: mark,
            } as DefaultOptionType))}
        />
    );
};

export default observer(CarMarkFilter);
