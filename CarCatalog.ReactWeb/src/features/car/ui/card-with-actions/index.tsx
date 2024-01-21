import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ICar } from 'entities/car';
import React, { FC } from 'react';
import CarCardWithBasket from '../card-wih-basket';

interface CarCardWithActionsProps {
    car: ICar;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onShop: (id: number) => void;
    isInBasket?: boolean;
}

const CarCardWithActions:FC<CarCardWithActionsProps> = ({car, onEdit, onDelete, onShop, isInBasket}) => {
    const handleEditClick = () => {
        onEdit(car.id);
    }

    const handleDeleteClick = () => {
        onDelete(car.id);
    }

    return (
        <CarCardWithBasket
            car={car}
            actions={[
                <EditOutlined onClick={handleEditClick}/>,
                <DeleteOutlined onClick={handleDeleteClick}/>,
            ]}
            onShop={onShop}
            isInBasket={isInBasket}
        />
    );
};

export default CarCardWithActions;
