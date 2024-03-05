import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { LoginPage } from 'pages/login';
import { RegisterPage } from 'pages/register';
import { URL_ROUTES } from 'shared/utils';
import { AuthStore } from 'features/auth';
import { HomePage } from './home';
import { CarsPage } from './cars';
import { UsersPage } from './users';
import { observer } from 'mobx-react-lite';
import { AppLayout, Loader } from 'shared/ui';
import { NotFoundPage } from './not-found';
import { useLoadBasketCars } from 'features/basket-shop';
import { ErrorBoundary } from './error';
import { Header } from 'widgets/header';

const Router = () => {
    const { isAuthenticated, inRole, userClaims, isFetched } = AuthStore;
    useLoadBasketCars(userClaims?.userId);

    if (!isFetched)
        return <Loader/>
        
    return (
        <Routes>
            <Route element={<ErrorBoundary/>}>
                <Route 
                    element={
                        <AppLayout header={<Header/>} children={<Outlet/>}/>
                    }
                >
                    <Route path={URL_ROUTES.HOME} element={<HomePage />} />
                        {!isAuthenticated ?
                            <>
                                <Route path={URL_ROUTES.LOGIN} element={<LoginPage />} />
                                <Route path={URL_ROUTES.REGISTER} element={<RegisterPage />} />
                                <Route path={'*'} element={<Navigate to={URL_ROUTES.LOGIN} />} />
                            </> :
                            <>
                                <Route path={URL_ROUTES.CARS} element={<CarsPage />} />
                                {inRole('Admin') ?
                                    <Route path={URL_ROUTES.USERS} element={<UsersPage />} /> :
                                    null
                                }
                            </>
                        }
                </Route>
            </Route>
            <Route path={'*'} element={<NotFoundPage/>} />
        </Routes>
    );
};

export default observer(Router);
