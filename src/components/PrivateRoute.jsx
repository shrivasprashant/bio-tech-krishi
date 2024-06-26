import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, adminRoute = false, ...rest }) => {
    const authToken = localStorage.getItem('authToken');
    const isAdmin = localStorage.getItem('admin') === 'true';

    if (!authToken) {
        return <Navigate to="/signin" />;
    }

    if (adminRoute && !isAdmin) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
