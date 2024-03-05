import React from 'react';
import 'app/index.css';
import Router from 'pages';
import { ConfigProvider, theme } from 'antd';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
