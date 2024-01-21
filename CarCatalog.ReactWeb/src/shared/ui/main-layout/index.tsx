import React, { FC, PropsWithChildren } from 'react';
import styles from './index.module.css'

const MainLayout:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.main}>
            {children}
        </div>
    );
};

export default MainLayout;
