import { Button, Drawer, Form, Space } from 'antd';
import { CreateUserForm, ICreateUserForm, UserStore } from 'entities/user';
import React, { FC, PropsWithChildren, useId } from 'react';

interface CreateUserDrawerProps {
    isOpened: boolean;
    onClose: () => void;
    isLoading?: boolean;
}

const CreateUserDrawer:FC<PropsWithChildren<CreateUserDrawerProps>> = ({
    children,
    isOpened,
    onClose,
    isLoading,
}) => {
    const [form] = Form.useForm<ICreateUserForm>();
    const {createUserAction: createUser, getUsersAction: getUsers} = UserStore;
    const formId = useId();

    const onFinish = async (data: ICreateUserForm) => {
        const isCreated = await createUser(data);
        if (isCreated) {
            form.resetFields();
            await getUsers();
        }
    }

    const onCloseHandler = () => {
        form.resetFields();
        onClose();
    }

    return (
        <Drawer
            destroyOnClose={true}
            title={'Создать пользователя'}
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
