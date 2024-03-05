import { Alert } from 'antd';
import axios, { AxiosError } from 'axios';
import React, { FC } from 'react';
import { IErrorData } from 'shared/utils';

interface ErrorResponseMessageProps {
    error?: AxiosError<any>;
    message?: string;
}

const renderMessage = (status?: number) => {
    switch (status) {
        case 400:
            return 'Некорректные данные';
        case 401: 
            return 'Неваторизованный пользователь'
        case 403: 
            return 'У пользователя нет прав на эти ресурсы'
        case 404:
            return 'Такого элемента нет';
        default:
            return 'Что-то пошло не так';
    }
}

const ErrorResponseMessage: FC<ErrorResponseMessageProps> = ({ error, message }) => {
    if (axios.isAxiosError<IErrorData>(error)) {
        const errors = error.response?.data.errors
        if (errors) {
            return (
                <>
                    {errors.map((error, index) => 
                        <Alert
                            key={index}
                            type={'error'}
                            message={message ?? error.description}
                        />
                    )}
                </>
            )
        }
    }

    return (
        <Alert
            type={'error'}
            message={message ?? renderMessage(error?.response?.status)}
        />
    );
};

export default ErrorResponseMessage;
