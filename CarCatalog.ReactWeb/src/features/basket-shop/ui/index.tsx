import { Col, Drawer, Row } from 'antd';
import { BasketStore } from 'entities/basket';
import { CarCard, CarStore, ICar } from 'entities/car';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';

interface BasketShopProps {
    onClose: () => void;
    isOpened?: boolean;
}

const BasketShop:FC<BasketShopProps> = ({onClose, isOpened}) => {
    const [basketCars, setBasketCars] = useState<ICar[]>([]);
    const {carIdsSet} = BasketStore;
    const {cars} = CarStore;

    useEffect(() => {
        setBasketCars(
            cars.filter(car => carIdsSet.has(car.id))
        )
    }, [carIdsSet.size, carIdsSet, cars])

    return (
        <Drawer
            destroyOnClose={true}
            title={'Корзина'}
            onClose={onClose}
            open={isOpened}
            size={'large'}
        >
            <Row gutter={[24, 24]}>
                {basketCars.map(car => 
                    <Col span={24} key={car.id}>
                        <CarCard car={car}/>
                    </Col>
                )}
            </Row>
        </Drawer>
    );
};

export default observer(BasketShop);
