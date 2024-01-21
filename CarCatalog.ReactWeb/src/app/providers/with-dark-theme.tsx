import { ConfigProvider, theme } from 'antd';
import React from 'react';

const WithDarkTheme = (component: () => React.ReactNode) => () => {
    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
        }}>
            {component()}
        </ConfigProvider>
    );
};

export default WithDarkTheme;
