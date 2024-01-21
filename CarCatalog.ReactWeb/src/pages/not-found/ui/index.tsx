import { Button, Result } from 'antd';
import React from 'react';
import { ResponsiveContainer } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';

const NotFound = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(URL_ROUTES.HOME);
    }

    return (
        <ResponsiveContainer>
            <Result
                status={'404'}
                title={'404'}
                subTitle={'Извините, такой странице не существует.'}
                extra={<Button onClick={onClick} type={'primary'}>На главную страницу</Button>}
            />
        </ResponsiveContainer>
    );
};

export default NotFound;
