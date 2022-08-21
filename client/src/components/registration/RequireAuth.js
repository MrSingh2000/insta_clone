import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserDetails } from "../common/functions";

export const RequireAuth = ({ children }) => {
    let authToken = useSelector((store) => store.authToken.value);
    let localAuth = localStorage.getItem('authToken');


    return authToken || localAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};