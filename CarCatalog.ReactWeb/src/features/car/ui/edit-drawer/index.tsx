import { Button, Drawer, Form, Space, message } from 'antd';
import { HttpStatusCode } from 'axios';
import { CarForm, CarStore, ICar } from 'entities/car';
import React, { FC, PropsWithChildren, useEffect, useId } from 'react';

interface EditCarDrawerProps {
    isOpened?: boolean;
    onClose: () => void;
    isLoading?: boolean;
    car?: ICar;
    onSuccess?: () => void;
}

const EditCarDrawer:FC<PropsWithChildren<EditCarDrawerProps>> = ({
    children,
    isOpened,
    onClose,
    isLoading,
    car,
    onSuccess,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const {updateCarAction: updateCar, getCarsAction: getCars, error} = CarStore;
    const [form] = Form.useForm<ICar>();
    const formId = useId();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Это машина была удалена раньше',
        });
    };

    const onFinish = async (data: ICar) => {
        const isUpdated = await updateCar(data.id, data);
        if (isUpdated) {
            await getCars();
            form.resetFields();
            onSuccess?.();
        }
    }

    const onCloseHandler = () => {
        form.resetFields();
        onClose();
    }
    
    useEffect(() => {
        if (error?.response?.status === HttpStatusCode.NotFound) {
            warning();
            onClose();
            getCars();
        }
    }, [error?.response?.status, getCars, onClose, warning]);

    useEffect(() => {
        if (car)
            form.setFieldsValue(car);
    }, [car, form]);

    return (
        <>
            {contextHolder}
            <Drawer
                destroyOnClose={true}
                title={'Редактировать автомобиль'}
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
                            Подтвердить
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
        </>
    );
};

export default EditCarDrawer;
