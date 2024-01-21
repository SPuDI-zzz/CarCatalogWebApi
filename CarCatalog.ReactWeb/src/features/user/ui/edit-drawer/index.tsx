import { Button, Drawer, FormInstance, Space } from 'antd';
import { EditUserForm, IUser } from 'entities/user';
import React, { FC, PropsWithChildren, useId } from 'react';

interface EditUserDrawerProps {
    isOpened?: boolean;
    onClose?: () => void;
    isLoading?: boolean;
    onFinish: (data: IUser) => void;
    form?: FormInstance<IUser>;
}

const EditUserDrawer:FC<PropsWithChildren<EditUserDrawerProps>> = ({
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
            title={'Редактировать пользователя'}
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
            <EditUserForm 
                onFinish={onFinish}
                isLoading={isLoading}
                formId={formId}
                form={form}
            >
                {children}
            </EditUserForm>
        </Drawer>
    );
};

export default EditUserDrawer;
