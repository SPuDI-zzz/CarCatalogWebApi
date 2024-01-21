import { Alert, Button, Col, Modal, Row, Space } from 'antd';
import { CarStore, ICar, ICarForm } from 'entities/car';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';
import { useForm } from 'antd/es/form/Form';
import { CarColorFilter, CarMarkFilter, CreateCarDrawer, EditCarDrawer, IFilterCars } from 'features/car';
import { CarCards } from 'widgets/car-cards';
import { BasketStore } from 'entities/basket';
import Search from 'antd/es/input/Search';
import styles from './index.module.css'

const Cars = () => {
    const {logoutAction: logout, userClaims} = AuthStore;
    const {
        getCarsAction: getCars,
        error,
        dispose,
        isLoading,
        isFetched,
        getCarAction: getCar,
        createCarAction: createCar,
        updateCarAction: updateCar,
        deleteCarAction: deleteCar,
    } = CarStore;
    const [filters, setFilters] = useState<IFilterCars>({});
    const [isCreateOpened, setIsCreateOpened] = useState(false);
    const [isEditOpened, setIsEditOpened] = useState(false);
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const [form] = useForm<ICar>();
    const [removeCar, setRemoveCar] = useState<ICar>();
    const {removeIfContainsCarId} = BasketStore;
    const navigate = useNavigate();

    const onChangeColor = (color?: string) => {
        setFilters(prev => ({...prev, color}))
    }

    const onChangeMark = (mark?: string) => {
        setFilters(prev => ({...prev, mark}))
    }

    const onChangeNaming = (naming?: string) => {
        setFilters(prev => ({...prev, naming}))
    }

    const onClose = () => {
        setIsCreateOpened(false);
        setIsEditOpened(false);
        setIsDeleteOpened(false);
        setRemoveCar(undefined);
        form.resetFields();
    }

    const onCreate = () => {
        setIsCreateOpened(true);
    }

    const onEdit = async (id: number) => {
        setIsEditOpened(true);
        const car = await getCar(id);
        form.setFieldsValue(car);
    }

    const onDelete = async (id: number) => {
        setIsDeleteOpened(true);
        const car = await getCar(id);
        setRemoveCar(car);
    }

    const onCreateFinish = async (data: ICarForm) => {
        const car: ICarForm = {...data, userId: userClaims!.userId}
        const isCreated = await createCar(car);
        if (isCreated)
            await getCars();
    }

    const onEditFinish = async (data: ICar) => {
        const isUpdated = await updateCar(data.id, data);
        if (isUpdated)
            await getCars();
    }

    const onDeleteFinish = async () => {
        if (removeCar) {
            const isDeleted = await deleteCar(removeCar.id);
            if (isDeleted) {
                removeIfContainsCarId(removeCar.id, userClaims!.userId);
                await getCars();
                setIsDeleteOpened(false);
            }
        }
    }
    
    useEffect(() => {
        if (!error)
            return;

        if (error.status === 401) {
            logout()
            .then(_ => navigate(URL_ROUTES.LOGIN));
        }

        if (error.status !== 400 && error.status !== 404)
            throw error;
    }, [navigate, dispose, logout, error]);   

    return (
        <>
            <Space 
                direction={'vertical'}
                size={'large'}
                className={styles.space}
            >
                <Row gutter={[12, 12]}>
                    <Col span={4}>
                        <CarMarkFilter onChange={onChangeMark}/>
                    </Col>
                    <Col span={4}>
                        <CarColorFilter onChange={onChangeColor}/>
                    </Col>
                    <Col span={4}>
                        <Search 
                            allowClear
                            size={'large'}
                            onSearch={onChangeNaming}
                            placeholder={'Поиск по наименованию'}
                        />
                    </Col>
                    <Col>
                        <Button size={'large'} onClick={onCreate}>Создать</Button>
                    </Col>
                </Row>           
                <CarCards 
                    onEdit={onEdit}
                    onDelete={onDelete}
                    filterCars={filters}
                />
            </Space>
            <CreateCarDrawer
                isOpened={isCreateOpened}
                isLoading={isLoading && isFetched}
                onClose={onClose}
                onFinish={onCreateFinish}
                form={form}
            >
                {error?.data?.errors.map((error, index) => 
                    <Alert
                        key={index}
                        type={'error'}
                        message={error.description}
                    />
                )}
            </CreateCarDrawer>
            <EditCarDrawer
                isOpened={isEditOpened}
                isLoading={isLoading && isFetched}
                onClose={onClose}
                onFinish={onEditFinish}
                form={form}
            >
                {error?.data?.errors.map((error, index) => 
                    <Alert
                        key={index}
                        type={'error'}
                        message={error.description}
                    />
                )}
            </EditCarDrawer>
            <Modal
                title={'Удаление автомобиля'}
                open={isDeleteOpened}
                onCancel={onClose}
                confirmLoading={isLoading && isFetched}
                okText={'Подтвердить'}
                cancelText={'Отмена'}
                onOk={onDeleteFinish}
            >
                {removeCar ?
                    <p>{`Вы уверены, что хотите удалить: ${removeCar.mark} ${removeCar.model}`}</p> :
                    <p>{'Загрузка...'}</p>
                }
                {error?.data?.errors.map((error, index) => 
                    <Alert
                        key={index}
                        type={'error'}
                        message={error.description}
                    />
                )}
            </Modal>
        </>
    );
};

export default observer(Cars);
