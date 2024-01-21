import { Alert, Button, Modal, Row, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { IUser, UserStore, ICreateUserForm, IUserForm } from 'entities/user';
import { AuthStore } from 'features/auth';
import { CreateUserDrawer, EditUserDrawer } from 'features/user';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';
import { UserCards } from 'widgets/user-cards';

const Users = () => {
    const {logoutAction: logout} = AuthStore
    const {
        getUsersAction: getUsers,
        error,
        dispose,
        isLoading,
        isFetched,
        getUserAction: getUser,
        createUserAction: createUser,
        updateUserAction: updateUser,
        deleteUserAction: deleteUser,
    } = UserStore;
    const [isCreateOpened, setIsCreateOpened] = useState(false);
    const [isEditOpened, setIsEditOpened] = useState(false);
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const [form] = useForm<IUserForm>();
    const [removeUser, setRemoveUser] = useState<IUser>();
    const navigate = useNavigate();

    const onClose = () => {
        setIsCreateOpened(false);
        setIsEditOpened(false);
        setIsDeleteOpened(false);
        setRemoveUser(undefined);
        form.resetFields();
    }

    const onCreate = () => {
        setIsCreateOpened(true);
    }

    const onEdit = async (id: number) => {
        setIsEditOpened(true);
        const user = await getUser(id);
        form.setFieldsValue(user);
    }

    const onDelete = async (id: number) => {
        setIsDeleteOpened(true);
        const user = await getUser(id);
        setRemoveUser(user);
    }

    const onCreateFinish = async (data: ICreateUserForm) => {
        debugger;
        const isCreated = await createUser(data);
        if (isCreated)
            await getUsers();
    }

    const onEditFinish = async (data: IUser) => {
        const isUpdated = await updateUser(data.id, data);
        if (isUpdated)
            await getUsers();
    }

    const onDeleteFinish = async () => {
        if (removeUser) {
            const isDeleted = await deleteUser(removeUser.id);
            if (isDeleted) {
                await getUsers();
                setIsDeleteOpened(false);
            }
        }
    }
    
    useEffect(() => {
        if (!error)
            return;

        if (error.status === 401 || error.status === 403) {
            logout()
            .then(_ => navigate(URL_ROUTES.LOGIN));
        }

        if (error.status !== 400 && error.status !== 404)
            throw error;
    }, [error, navigate, dispose, logout]);

    return (
        <>
            <Space direction={'vertical'} size={'large'} style={{ display: 'flex' }}>
                <Row>
                    <Button onClick={onCreate}>Создать</Button>
                </Row>
                <UserCards onEdit={onEdit} onDelete={onDelete}/>
            </Space>
            <CreateUserDrawer
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
            </CreateUserDrawer>
            <EditUserDrawer
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
            </EditUserDrawer>
            <Modal
                title={'Удаление пользователя'}
                open={isDeleteOpened}
                onCancel={onClose}
                confirmLoading={isLoading && isFetched}
                okText={'Подтвердить'}
                cancelText={'Отмена'}
                onOk={onDeleteFinish}
            >
                {removeUser ?
                    <p>{`Вы уверены, что хотите удалить: ${removeUser.login}`}</p>:
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

export default observer(Users);
