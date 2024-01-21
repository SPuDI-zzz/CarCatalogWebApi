import { Col, Row } from 'antd';
import { UserStore } from 'entities/user';
import { UserCardWithActions } from 'features/user';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Loader } from 'shared/ui';

interface UserCardsProps {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const UserCards:FC<UserCardsProps> = ({onEdit, onDelete}) => {
    const {users, isFetched, getUsersAction: getUsers} = UserStore;

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (!isFetched)
        return <Loader/>

    return (
        <Row gutter={[24, 24]}>
            {users.map(user => 
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={user.id}>
                    <UserCardWithActions 
                        user={user}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Col>
            )}
        </Row>
    );
};

export default observer(UserCards);
