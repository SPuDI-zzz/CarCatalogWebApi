import { Card } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.css'
import { IUser } from '../../model';

interface UserCardProps {
    user: IUser;
    actions?: React.ReactNode[];
}

const UserCard:FC<UserCardProps> = ({user, actions}) => {
    return (
        <Card
            className={styles.container}
            actions={actions}
            bodyStyle={{flex: '1 1 100%'}}
        >
            <Card.Meta
                title={'Логин'}
                description={user.login}
            />
            <Card.Meta
                title={`${user.roles.length > 1 ? 'Роли': 'Роль'}`}
                description={user.roles.join(' ')}
            />
        </Card>
    );
};

export default UserCard;
