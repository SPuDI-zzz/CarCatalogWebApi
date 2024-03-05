import { DeleteOutlined, EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { CarCard, ICar } from 'entities/car';
import React, { FC } from 'react';

interface CarCardWithActionsProps {
    car: ICar;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onShop: (id: number) => void;
}

const CarCardWithActions:FC<CarCardWithActionsProps> = ({car, onEdit, onDelete, onShop}) => {
    const handleEditClick = () => {
        onEdit(car.id);
    }

    const handleDeleteClick = () => {
        onDelete(car.id);
    }

    const handleShopClick = () => {
        onShop(car.id);
    }

    return (
        <CarCard 
            car={car}
            actions={[
                <ShoppingCartOutlined onClick={handleShopClick}/>,
                <EditOutlined onClick={handleEditClick}/>,
                <DeleteOutlined onClick={handleDeleteClick}/>,
            ]}
        />
    );
};

export default CarCardWithActions;
