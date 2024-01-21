import { Alert } from 'antd';
import { IRegister, RegisterCard } from 'entities/register';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';

const Register = () => {
    const {registerAction, error, isLoading} = AuthStore;
    const navigate = useNavigate();

    const onFinish = async (data: IRegister) => {
        const isRegister = await registerAction(data);

        if (isRegister)
            navigate(URL_ROUTES.LOGIN);
    }

    return (
        <RegisterCard isLoading={isLoading} onFinish={onFinish}>
            {error?.data?.errors.map((error, index) => 
                <Alert
                    key={index}
                    type={'error'}
                    message={error.description}
                />
            )}
        </RegisterCard>
    );
};

export default observer(Register);
