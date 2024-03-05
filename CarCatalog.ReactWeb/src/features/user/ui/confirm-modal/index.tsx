import { Modal, message } from 'antd';
import { HttpStatusCode } from 'axios';
import { IUser, UserStore } from 'entities/user';
import React, { FC, PropsWithChildren, useEffect } from 'react';

interface ConfirmUserModalProps {
    user?: IUser;
    isOpened?: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const ConfirmUserModal:FC<PropsWithChildren<ConfirmUserModalProps>> = ({
    children,
    user,
    isOpened,
    isLoading,
    onClose,
    onSuccess,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const {deleteUserAction: deleteUser, getUsersAction: getUsers, error} = UserStore;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Этот пользователь был удален раньше',
        });
    };

    const onOk = async () => {
        if (!user)
            return;
        
        const isDeleted = await deleteUser(user.id)
        if (isDeleted) {
            await getUsers();
            onSuccess?.();
        }
    }

    useEffect(() => {
        if (error?.response?.status === HttpStatusCode.NotFound) {
            warning();
            onClose();
            getUsers();
        }
    }, [error?.response?.status, getUsers, onClose, warning]);

    return (
        <>
            {contextHolder}
            <Modal
                destroyOnClose={true}
                title={'Удаление пользователя'}
                open={isOpened}
                onCancel={onClose}
                confirmLoading={isLoading}
                okText={'Подтвердить'}
                cancelText={'Отмена'}
                onOk={onOk}
            >
                {user ?
                    <p>{`Вы уверены, что хотите удалить: ${user.login}`}</p> :
                    <p>{'Загрузка...'}</p>
                }
                {children}
            </Modal>
        </>
    );
};

export default ConfirmUserModal;
