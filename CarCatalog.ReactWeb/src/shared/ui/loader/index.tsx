import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './index.module.css';
import ResponsiveContainer from '../responsive-container';

const Loader = () => {
    return (
        <ResponsiveContainer>
            <Spin className={styles.loaderSize} indicator={<LoadingOutlined style={{fontSize: '1em'}} />} />
        </ResponsiveContainer>
    );
};

export default Loader;
