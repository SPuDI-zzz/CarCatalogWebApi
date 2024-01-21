import React from 'react';
import { Outlet } from 'react-router-dom';
import { Content, MainLayout } from 'shared/ui';
import { Header } from 'widgets/header';

const AppLayout = () => {
    return (
        <MainLayout>
            <Header/>
            <Content>
                <Outlet/>
            </Content>
        </MainLayout>
    );
};

export default AppLayout;
