import {  Navigate } from 'react-router-dom';

const AuthRoute = ({ children }: any) => {
    const isAuthenticated  = localStorage.getItem("auth_token");

    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

export default AuthRoute;