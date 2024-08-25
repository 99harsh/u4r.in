import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
    const isAuthenticated  = localStorage.getItem("auth_token");

    return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;