import React, { useState } from 'react';
import styles from './index.module.css'
import { Button, Layout, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { URL_ROUTES } from 'shared/utils';
import { CarOutlined, ShoppingOutlined } from '@ant-design/icons';
import { AuthStore } from 'features/auth';
import { observer } from 'mobx-react-lite';
import { BasketShop } from 'features/basket-shop';



const Header = () => {
    const {isAuthenticated, logoutAction: logout, inRole, resetError} = AuthStore;
    const [isOpened, setIsOpened] = useState(false);
    const navigate = useNavigate();

    const onLogout = async () => {
        navigate(URL_ROUTES.LOGIN);
        await logout();
    }

    const onShopClose = () => {
        setIsOpened(false);
    }

    const onShopClick = () => {
        setIsOpened(true);
    }

    return (
        <Layout.Header className={styles.header}>
            <Space size={'large'}>
                <Link to={URL_ROUTES.HOME}>
                    <CarOutlined className={styles.carIcon}/>
                </Link>
                {isAuthenticated ?
                    <>
                        <Link to={URL_ROUTES.CARS}>
                            <Typography.Title level={2}>Каталог автомобилей</Typography.Title>
                        </Link>
                        {inRole('Admin') ? 
                            <Link to={URL_ROUTES.USERS}>
                                <Typography.Title level={2}>Пользователи</Typography.Title>
                            </Link> :
                            null
                        }
                    </> :
                    null
                }
            </Space>
            <Space>
                {isAuthenticated ? 
                    <>
                        <ShoppingOutlined onClick={onShopClick} className={styles.shoppingIcon}/>
                        <Button onClick={onLogout} className={styles.logoutBtn} type='link'>Выйти</Button>  
                    </> : 
                    <>
                        <Link onClick={resetError} to={URL_ROUTES.REGISTER}>
                            <Button className={styles.registerBtn} type='link'>Зарегистрироваться</Button>
                        </Link>
                        <Link onClick={resetError} to={URL_ROUTES.LOGIN}>
                            <Button className={styles.loginBtn} type='link'>Войти</Button>
                        </Link>
                    </>
                }
            </Space>
            <BasketShop onClose={onShopClose} isOpened={isOpened}/>
        </Layout.Header>
    );
};

export default observer(Header);
