import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// Cool piece of code. Will check for authenticated user and restricts access to chat page and profile page
const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/click/auth" />;
};

export default PrivateRoute;
