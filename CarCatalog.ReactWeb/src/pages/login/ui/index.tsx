import { ILogin, LoginCard } from 'entities/login';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';
import { ErrorResponseMessage } from 'shared/ui';
import { HttpStatusCode } from 'axios';

const Login = () => {
    const {loginAction: login, isLoading, error, getClaimsAction} = AuthStore;
    const navigate = useNavigate();

    const onFinish = async (data: ILogin) => {
        const isSignIn = await login(data);
        if (isSignIn) {
            navigate(URL_ROUTES.CARS, { replace: true });
            await getClaimsAction();
        }
    }

    useEffect(() => {
        if (!error)
            return;

        if (error.response?.status !== HttpStatusCode.Unauthorized)
            throw error
    }, [error]);

    return (
        <LoginCard isLoading={isLoading} onFinish={onFinish}>
            {error ?
                <ErrorResponseMessage 
                    message={'Неверное имя пользователя или пароль'}
                /> :
                null
            }
        </LoginCard>
    );
};

export default observer(Login);
