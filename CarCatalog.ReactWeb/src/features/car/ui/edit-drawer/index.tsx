import { Button, Drawer, FormInstance, Space } from 'antd';
import { CarForm, ICar } from 'entities/car';
import React, { FC, PropsWithChildren, useId } from 'react';

interface EditCarDrawerProps {
    isOpened?: boolean;
    onClose?: () => void;
    isLoading?: boolean;
    onFinish: (data: ICar) => void;
    form?: FormInstance<ICar>;
}

const EditCarDrawer:FC<PropsWithChildren<EditCarDrawerProps>> = ({
    children,
    isOpened,
    onClose,
    isLoading,
    onFinish,
    form,
}) => {
    const formId = useId();

    return (
        <Drawer
            title={'Редактировать автомобиль'}
            onClose={onClose}
            open={isOpened}
            size={'large'}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
            extra={
                <Space>
                    <Button onClick={onClose}>Отмена</Button>
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
    );
};

export default EditCarDrawer;
