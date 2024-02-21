import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/header';
import styles from './index.module.css'
import { Layout } from 'antd';

const AppLayout = () => {
    return (
        <Layout className={styles.main}>
            <Header/>
            <Layout.Content className={styles.content}>
                <Outlet/>
            </Layout.Content>
        </Layout>           
    );
};

export default AppLayout;
