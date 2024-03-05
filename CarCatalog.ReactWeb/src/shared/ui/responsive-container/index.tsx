import React, { FC, PropsWithChildren } from 'react';
import styles from './index.module.css'

const ResponsiveContainer:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default ResponsiveContainer;
