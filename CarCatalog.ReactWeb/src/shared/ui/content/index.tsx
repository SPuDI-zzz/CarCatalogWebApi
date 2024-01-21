import { Layout } from 'antd';
import React, { FC, PropsWithChildren } from 'react';
import styles from './index.module.css'

const Content:FC<PropsWithChildren> = ({children}) => {
    return (
        <Layout.Content className={styles.content}>
            {children}
        </Layout.Content>
    );
};

export default Content;
