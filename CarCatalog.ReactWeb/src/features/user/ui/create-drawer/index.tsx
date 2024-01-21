import { Button, Drawer, FormInstance, Space } from 'antd';
import { CreateUserForm, ICreateUserForm } from 'entities/user';
import React, { FC, PropsWithChildren, useId } from 'react';

interface CreateUserDrawerProps {
    isOpened: boolean;
    onClose: () => void;
    isLoading?: boolean;
    onFinish: (data: ICreateUserForm) => void;
    form?: FormInstance<ICreateUserForm>;
}

const CreateUserDrawer:FC<PropsWithChildren<CreateUserDrawerProps>> = ({
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
            title={'Создать пользователя'}
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
            <CreateUserForm 
                onFinish={onFinish}
                isLoading={isLoading}
                formId={formId}
                form={form}
            >
                {children}
            </CreateUserForm>
        </Drawer>
    );
};

export default CreateUserDrawer;
