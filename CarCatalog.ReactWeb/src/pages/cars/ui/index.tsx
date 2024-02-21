import { Button, Col, Row } from 'antd';
import { CarStore, ICar } from 'entities/car';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';
import { CarColorFilter, CarMarkFilter, CarNamingFilter, ConfirmCarModal, CreateCarDrawer, EditCarDrawer, IFilterCars } from 'features/car';
import { CarCards } from 'widgets/car-cards';
import styles from './index.module.css'
import { BasketStore } from 'entities/basket';
import { ErrorResponseMessage } from 'shared/ui';
import { HttpStatusCode } from 'axios';

const Cars = () => {
    const {logoutAction: logout, userClaims, inRole} = AuthStore;
    const {
        error,
        isLoading,
        isFetched,
        getCarAction: getCar,
        resetError
    } = CarStore;
    const {removeIfContainsCarId} = BasketStore;
    const [filters, setFilters] = useState<IFilterCars>({});
    const [isCreateOpened, setIsCreateOpened] = useState(false);
    const [isEditOpened, setIsEditOpened] = useState(false);
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const [editCar, setEditCar] = useState<ICar>();
    const [deleteCar, setRemoveCar] = useState<ICar>();
    const navigate = useNavigate();

    const onChangeColor = (color?: string) => {
        setFilters(prev => ({...prev, color}))
    }

    const onChangeMark = (mark?: string) => {
        setFilters(prev => ({...prev, mark}))
    }

    const onSearchNaming = (naming?: string) => {
        setFilters(prev => ({...prev, naming}))
    }

    const onCreateClose = () => {
        setIsCreateOpened(false);
        resetError();
    }

    const onEditClose = () => {
        setEditCar(undefined);
        setIsEditOpened(false);
        resetError();
    }

    const onDeleteClose = () => {
        setRemoveCar(undefined);
        setIsDeleteOpened(false);
        resetError();
    }

    const onCreate = () => {
        setIsCreateOpened(true);
    }

    const onEdit = async (id: number) => {
        setIsEditOpened(true);
        const car = await getCar(id);
        setEditCar(car);
    }

    const onDelete = async (id: number) => {
        setIsDeleteOpened(true);
        const car = await getCar(id);
        setRemoveCar(car);
    }

    const onEditSuccess = () => {
        setIsEditOpened(false);
    }

    const onDeleteSuccess = async () => {
        if (deleteCar && userClaims) {
            removeIfContainsCarId(deleteCar.id, userClaims.userId);
            setIsDeleteOpened(false);            
        }
    }
    
    useEffect(() => {
        if (!error)
            return;

        if (!error.response)
            throw error;

        if (error.response.status === HttpStatusCode.Unauthorized || 
            error.response.status === HttpStatusCode.Forbidden
        ) {
            navigate(URL_ROUTES.LOGIN);
            logout();
            return;
        }

        if (error.response.status !== HttpStatusCode.BadRequest &&
            error.response.status !== HttpStatusCode.NotFound
        ) {
            throw error;
        }
    }, [error, navigate, logout]);   

    return (
        <>
            <Row className={styles.rowContainer} gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                    <CarMarkFilter onChange={onChangeMark}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                    <CarColorFilter onChange={onChangeColor}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                    <CarNamingFilter onSearch={onSearchNaming}/>
                </Col>
                {inRole('Manager') || inRole('Admin') ?
                    <Col>
                        <Button size={'large'} onClick={onCreate}>Создать</Button>
                    </Col> :
                    null
                }
            </Row>           
            <CarCards 
                onEdit={onEdit}
                onDelete={onDelete}
                filter={filters}
            />
            <CreateCarDrawer
                isOpened={isCreateOpened}
                isLoading={isLoading && isFetched}
                onClose={onCreateClose}
            >
                {error ?
                    <ErrorResponseMessage error={error}/> :
                    null
                }
            </CreateCarDrawer>
            <EditCarDrawer
                isOpened={isEditOpened}
                isLoading={isLoading && isFetched}
                onClose={onEditClose}
                car={editCar}
                onSuccess={onEditSuccess}
            >
                {error ?
                    <ErrorResponseMessage error={error}/> :
                    null
                }
            </EditCarDrawer>
            <ConfirmCarModal
                isOpened={isDeleteOpened}
                onClose={onDeleteClose}
                isLoading={isLoading && isFetched}
                onSuccess={onDeleteSuccess}
                car={deleteCar}
            />
        </>
    );
};

export default observer(Cars);
