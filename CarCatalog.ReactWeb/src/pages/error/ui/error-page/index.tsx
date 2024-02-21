import { Button, Result } from 'antd';
import axios from 'axios';
import { AuthStore } from 'features/auth';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'shared/ui';
import { URL_ROUTES } from 'shared/utils';

interface ErrorPageProps {
    error?: any;
    reset: () => void;
}

const ErrorPage:FC<ErrorPageProps> = ({error, reset}) => {
    const {resetError} = AuthStore;
    const navigate = useNavigate();

    const onClick = () => {
        resetError();
        reset();
        navigate(URL_ROUTES.HOME);
    }

    if (axios.isAxiosError(error)) {
        if (error.status === 500 || error.status === undefined)
            return (
                <ResponsiveContainer>
                    <Result
                        status={500}
                        title={500}
                        subTitle={'Сервер не отвечает'}
                    />
                </ResponsiveContainer>
            );
    }
    
    return (
        <ResponsiveContainer>
            <Result
                title={'Что-то пошло не так'}
                subTitle={'Сервер не отвечает'}
                extra={<Button onClick={onClick} type={'primary'}>На главную страницу</Button>}
            />
        </ResponsiveContainer>
    )
};

export default ErrorPage;
