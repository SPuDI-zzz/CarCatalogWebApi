import { ShoppingCartOutlined } from '@ant-design/icons';
import { CarCard, ICar } from 'entities/car';
import React, { FC } from 'react';

interface CarCardWithBasketProps {
    car: ICar;
    onShop: (id: number) => void;
    isInBasket?: boolean;
    actions?: React.ReactNode[];
}

const CarCardWithBasket:FC<CarCardWithBasketProps> = ({car, onShop, isInBasket, actions = []}) => {
    const handleShopClick = () => {
        onShop(car.id);
    }

    return (
        <CarCard 
            car={car}
            actions={[
                <ShoppingCartOutlined style={isInBasket ? {color: 'green'} : undefined} onClick={handleShopClick}/>,
                ...actions
            ]}
        />
    );
};

export default CarCardWithBasket;
