import { HttpStatusCode } from 'axios';
import { IRegister, RegisterCard } from 'entities/register';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorResponseMessage } from 'shared/ui';
import { URL_ROUTES } from 'shared/utils';

const Register = () => {
    const {registerAction, error, isLoading} = AuthStore;
    const navigate = useNavigate();

    const onFinish = async (data: IRegister) => {
        const isRegister = await registerAction(data);

        if (isRegister)
            navigate(URL_ROUTES.LOGIN);
    }

    useEffect(() => {
        if (!error)
            return;

        if (error.response?.status !== HttpStatusCode.BadRequest)
            throw error
    }, [error]);

    return (
        <RegisterCard isLoading={isLoading} onFinish={onFinish}>
            {error ?
                <ErrorResponseMessage error={error}/> :
                null
            }    
        </RegisterCard>
    );
};

export default observer(Register);
