import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IUser, UserCard } from 'entities/user';
import React, { FC } from 'react';

interface UserCardWithActionsProps {
    user: IUser;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const UserCardWithActions:FC<UserCardWithActionsProps> = ({user, onEdit, onDelete}) => {
    const handleEditClick = () => {
        onEdit(user.id);
    }

    const handleDeleteClick = () => {
        onDelete(user.id);
    }

    return (
        <UserCard 
            user={user}
            actions={[
                <EditOutlined onClick={handleEditClick}/>,
                <DeleteOutlined onClick={handleDeleteClick}/>,
            ]}
        />
    );
};

export default UserCardWithActions;
