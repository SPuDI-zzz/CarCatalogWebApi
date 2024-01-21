import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const WithRouter = (component: () => React.ReactNode) => () => {
    return (
        <BrowserRouter>
            {component()}
        </BrowserRouter>
    );
};

export default WithRouter;
