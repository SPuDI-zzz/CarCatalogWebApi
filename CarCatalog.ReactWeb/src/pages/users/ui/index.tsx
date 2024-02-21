import { Button, Row } from 'antd';
import { IUser, UserStore } from 'entities/user';
import { AuthStore } from 'features/auth';
import { ConfirmUserModal, CreateUserDrawer, EditUserDrawer } from 'features/user';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';
import { UserCards } from 'widgets/user-cards';
import styles from './index.module.css'
import { ErrorResponseMessage } from 'shared/ui';
import { HttpStatusCode } from 'axios';

const Users = () => {
    const {logoutAction: logout} = AuthStore
    const {
        error,
        isLoading,
        isFetched,
        getUserAction: getUser,
        resetError,
    } = UserStore;
    const [isCreateOpened, setIsCreateOpened] = useState(false);
    const [isEditOpened, setIsEditOpened] = useState(false);
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const [editUser, setEditUser] = useState<IUser>();
    const [deleteUser, setDeleteUser] = useState<IUser>();
    const navigate = useNavigate();

    const onCreateClose = () => {
        setIsCreateOpened(false);
        resetError();
    }

    const onEditClose = () => {
        setEditUser(undefined);
        setIsEditOpened(false);
        resetError();
    }

    const onDeleteClose = () => {
        setDeleteUser(undefined);
        setIsDeleteOpened(false);
        resetError();
    }

    const onCreate = () => {
        setIsCreateOpened(true);
    }

    const onEdit = async (id: number) => {
        setIsEditOpened(true);
        const user = await getUser(id);
        setEditUser(user);
    }

    const onDelete = async (id: number) => {
        setIsDeleteOpened(true);
        const user = await getUser(id);
        setDeleteUser(user);
    }

    const onEditSuccess = () => {
        setIsEditOpened(false);
    }

    const onDeleteSuccess = async () => {
        setIsDeleteOpened(false);      
    }
    
    useEffect(() => {
        if (!error)
            return;

        if (!error.response)
            throw error;

        if (error.response.status === HttpStatusCode.Unauthorized || 
            error.response.status === HttpStatusCode.Forbidden
        ) {
            navigate(URL_ROUTES.LOGIN);
            logout();
            return;
        }

        if (error.response.status !== HttpStatusCode.BadRequest &&
            error.response.status !== HttpStatusCode.NotFound
        ) {
            throw error;
        }
    }, [error, navigate, logout]);   

    return (
        <>
            <Row className={styles.rowContainer}>
                <Button onClick={onCreate}>Создать</Button>
            </Row>
            <UserCards onEdit={onEdit} onDelete={onDelete}/>
            <CreateUserDrawer
                isOpened={isCreateOpened}
                isLoading={isLoading && isFetched}
                onClose={onCreateClose}
            >
                {error ?
                    <ErrorResponseMessage error={error}/> :
                    null
                }
            </CreateUserDrawer>
            <EditUserDrawer
                isOpened={isEditOpened}
                isLoading={isLoading && isFetched}
                onClose={onEditClose}
                onSuccess={onEditSuccess}
                user={editUser}
            >
                {error ?
                    <ErrorResponseMessage error={error}/> :
                    null
                }
            </EditUserDrawer>
            <ConfirmUserModal
                isOpened={isDeleteOpened}
                onClose={onDeleteClose}
                isLoading={isLoading && isFetched}
                onSuccess={onDeleteSuccess}
                user={deleteUser}
            />
        </>
    );
};

export default observer(Users);
