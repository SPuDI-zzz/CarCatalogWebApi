import { Button, Drawer, Form, Space } from 'antd';
import { CarForm, CarStore, ICar, ICarForm } from 'entities/car';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import React, { FC, PropsWithChildren, useId } from 'react';

interface CreateCarDrawerProps {
    isOpened: boolean;
    onClose: () => void;
    isLoading?: boolean;
    onSuccess?: () => void;
}

const CreateCarDrawer:FC<PropsWithChildren<CreateCarDrawerProps>> = ({
    children,
    isOpened,
    onClose,
    isLoading,
    onSuccess,
}) => {
    const {userClaims} = AuthStore;
    const {createCarAction: createCar, getCarsAction: getCars} = CarStore;
    const [form] = Form.useForm<ICar>();
    const formId = useId();

    const onFinish = async (data: ICarForm) => {
        const car: ICarForm = {...data, userId: userClaims!.userId}
        const isCreated = await createCar(car);
        if (isCreated) {
            onSuccess?.();
            form.resetFields();
            await getCars();
        }
    }

    const onCloseHandler = () => {
        form.resetFields();
        onClose();
    }

    return (
        <Drawer
            destroyOnClose={true}
            title={'Создать автомобиль'}
            onClose={onCloseHandler}
            open={isOpened}
            size={'large'}
            extra={
                <Space>
                    <Button onClick={onCloseHandler}>Отмена</Button>
                    <Button 
                        loading={isLoading}
                        type={'primary'}
                        htmlType={'submit'}
                        form={formId}
                    >
                        Создать
                    </Button>
                </Space>                    
            }
        >
            <CarForm 
                onFinish={onFinish}
                isLoading={isLoading}
                formId={formId}
                form={form}
            >
                {children}
            </CarForm>
        </Drawer>
    );
};

export default observer(CreateCarDrawer);
