import React, { Component, useContext } from "react";
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/Auth-Context";

const ProtectedRoute = ({ children }: any) => {
    const isAuthenticated  = localStorage.getItem("auth_token");

    return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;