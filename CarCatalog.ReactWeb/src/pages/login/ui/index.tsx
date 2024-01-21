import { ILogin, LoginCard } from 'entities/login';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';

const Login = () => {
    const {loginAction: login, isLoading} = AuthStore;
    const navigate = useNavigate();

    const onFinish = async (data: ILogin) => {
        const isSignIn = await login(data);
        if (isSignIn)
            navigate(URL_ROUTES.CARS);
    }

    return (
        <LoginCard isLoading={isLoading} onFinish={onFinish} />
    );
};

export default observer(Login);
