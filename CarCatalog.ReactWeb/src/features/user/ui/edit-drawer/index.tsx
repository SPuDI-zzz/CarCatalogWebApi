import { Button, Drawer, Form, Space, message } from 'antd';
import { HttpStatusCode } from 'axios';
import { EditUserForm, IUser, UserStore } from 'entities/user';
import React, { FC, PropsWithChildren, useEffect, useId } from 'react';

interface EditUserDrawerProps {
    isOpened?: boolean;
    onClose: () => void;
    isLoading?: boolean;
    user?: IUser
    onSuccess?: () => void;
}

const EditUserDrawer:FC<PropsWithChildren<EditUserDrawerProps>> = ({
    children,
    isOpened,
    onClose,
    isLoading,
    user,
    onSuccess,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const {updateUserAction: updateUser, getUsersAction: getUsers, error} = UserStore;
    const [form] = Form.useForm<IUser>();
    const formId = useId();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Этот пользователь был удален раньше',
        });
    };
    
    const onFinish = async (data: IUser) => {
        const isUpdated = await updateUser(data.id, data);
        if (isUpdated) {
            await getUsers();
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
            getUsers();
        }
    }, [error?.response?.status, getUsers, onClose, warning]);

    useEffect(() => {
        if (user)
            form.setFieldsValue(user);
    }, [user, form]);

    return (
        <>
            {contextHolder}
            <Drawer
                destroyOnClose={true}
                title={'Редактировать пользователя'}
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
                <EditUserForm 
                    onFinish={onFinish}
                    isLoading={isLoading}
                    formId={formId}
                    form={form}
                >
                    {children}
                </EditUserForm>
            </Drawer>
        </>
    );
};

export default EditUserDrawer;
