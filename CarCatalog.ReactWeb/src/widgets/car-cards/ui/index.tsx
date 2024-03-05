import { Col, Row } from 'antd';
import { BasketStore } from 'entities/basket';
import { CarStore } from 'entities/car';
import { AuthStore } from 'features/auth';
import { CarCardWithActions, CarCardWithBasket, IFilterCars } from 'features/car';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useMemo } from 'react';
import { Loader } from 'shared/ui';

interface CarCardsProps {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    filter?: IFilterCars;
}

const CarCards:FC<CarCardsProps> = ({onEdit, onDelete, filter}) => {
    const {cars, isFetched, getCarsAction: getCars} = CarStore;
    const {carIdsSet, toggleCar} = BasketStore;
    const {userClaims, inRole} = AuthStore;

    const filteredCars = useMemo(() => (
        cars.filter(car =>
            (!filter?.mark || car.mark === filter.mark) &&
            (!filter?.color || car.color === filter?.color) &&
            (!filter?.naming || car.mark.toLowerCase().includes(filter.naming) || car.model.toLowerCase().includes(filter.naming))
        )
    ), [cars, filter?.color, filter?.mark, filter?.naming]);

    const onShop = (carId: number) => {
        toggleCar(carId, userClaims!.userId);
    }

    useEffect(() => {
        getCars();
    }, [getCars]);

    if (!isFetched)
        return <Loader/>

    return (
        <Row gutter={[24, 24]}>
            {inRole('Manager') || inRole('Admin') ?            
                filteredCars?.map(car => 
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={car.id}>
                        <CarCardWithActions 
                            car={car}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onShop={onShop}
                            isInBasket={carIdsSet.has(car.id)}
                        />
                    </Col>
                ) :
                filteredCars?.map(car => 
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={car.id}>
                        <CarCardWithBasket 
                            car={car}
                            onShop={onShop}
                            isInBasket={carIdsSet.has(car.id)}
                        />
                    </Col>
                )
            }
        </Row>
    );
};

export default observer(CarCards);
