import React from 'react';
import 'app/index.css';
import Router from 'pages';
import WithDarkTheme from 'app/providers/with-dark-theme';
import WithRouter from './providers/with-router';

const App = () => {
    return (
        <Router/>
    );
};

export default WithDarkTheme(WithRouter(App));
