import React, { FC, PropsWithChildren } from 'react';
import styles from './index.module.css'
import { Layout } from 'antd';

interface AppLayoutProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const AppLayout:FC<PropsWithChildren<AppLayoutProps>> = ({header, children, footer}) => {
    return (
        <Layout className={styles.main}>
            {header}
            <Layout.Content className={styles.content}>
                {children}
            </Layout.Content>
            {footer}
        </Layout>           
    );
};

export default AppLayout;
