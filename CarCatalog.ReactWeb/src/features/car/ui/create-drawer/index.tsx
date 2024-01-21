import { Button, Drawer, FormInstance, Space } from 'antd';
import { CarForm, ICar } from 'entities/car';
import React, { FC, PropsWithChildren, useId } from 'react';

interface CreateCarDrawerProps {
    isOpened: boolean;
    onClose: () => void;
    isLoading?: boolean;
    onFinish: (data: ICar) => void;
    form?: FormInstance<ICar>;
}

const CreateCarDrawer:FC<PropsWithChildren<CreateCarDrawerProps>> = ({
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
            title={'Создать автомобиль'}
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

export default CreateCarDrawer;
