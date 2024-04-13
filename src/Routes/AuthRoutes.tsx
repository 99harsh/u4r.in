import React, { Component, useContext } from "react";
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/Auth-Context";

const AuthRoute = ({ children }: any) => {
    const isAuthenticated  = localStorage.getItem("auth_token");

    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

export default AuthRoute;