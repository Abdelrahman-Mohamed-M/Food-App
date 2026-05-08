import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

export default function ProtectedRoutes({ children, allowedRoles = [] }) {
  const { loginData } = useContext(AuthContext);

  if (!localStorage.getItem("token") && !loginData) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(loginData?.userGroup)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
