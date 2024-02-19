import React, { Component, useContext } from "react";
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/Auth-Context";

const ProtectedRoute = ({ children }: any) => {
    const isAuthenticated  = localStorage.getItem("is_login");

    return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;