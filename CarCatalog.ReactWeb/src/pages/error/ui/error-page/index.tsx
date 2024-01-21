import { Result } from 'antd';
import React, { FC } from 'react';
import { ResponsiveContainer } from 'shared/ui';
import { isIErrorResponse } from 'shared/utils';

interface ErrorPageProps {
    error?: any;
}

const ErrorPage:FC<ErrorPageProps> = ({error}) => {
    if (isIErrorResponse(error)) {
        if (error.status === 500)
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
            />
        </ResponsiveContainer>
    )
};

export default ErrorPage;
