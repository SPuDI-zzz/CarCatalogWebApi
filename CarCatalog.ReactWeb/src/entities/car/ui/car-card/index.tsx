import { Card } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.css'
import { ICar } from '../../model';

interface CarCardProps {
    car: ICar;
    actions?: React.ReactNode[];
}

const CarCard:FC<CarCardProps> = ({car, actions}) => {  
    return (
        <Card
            className={styles.container}
            actions={actions}
            bodyStyle={{flex: '1 1 100%'}}
        >
            <Card.Meta
                title={'Марка'}
                description={car.mark}
            />
            <Card.Meta
                title={'Модель'}
                description={car.model}
            />
            <Card.Meta
                title={'Цвет'}
                description={car.color}
            />
        </Card>
    );
};

export default CarCard;
