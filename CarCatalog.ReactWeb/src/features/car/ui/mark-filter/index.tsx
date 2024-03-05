import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { CarStore } from 'entities/car';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import styles from './index.module.css'

interface CarMarkFilterProps {
    onChange: (value?: string) => void;
}

const CarMarkFilter:FC<CarMarkFilterProps> = ({onChange}) => {
    const {cars} = CarStore;

    const options = useMemo(() => {
        const marksSet = new Set(cars.map(car => car.mark));
        const markOptions = Array.from(marksSet).map(mark => ({
            label: mark,
            value: mark,
        } as DefaultOptionType));
        return markOptions;
    }, [cars]);
    
    return (
        <Select
            size={'large'}
            allowClear
            onChange={onChange}
            className={styles.select}
            placeholder={'Выберите марку'}
            options={options}
        />
    );
};

export default observer(CarMarkFilter);
