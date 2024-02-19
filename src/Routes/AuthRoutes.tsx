import React, { Component, useContext } from "react";
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/Auth-Context";

const AuthRoute = ({ children }: any) => {
    const isAuthenticated  = localStorage.getItem("is_login");

    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

export default AuthRoute;