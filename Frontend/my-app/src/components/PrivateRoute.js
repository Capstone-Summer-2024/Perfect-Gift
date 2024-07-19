import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebaseConfig";

const PrivateRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return <Navigate to="/register-login?mode=login" />;
  }

  return children;
};

export default PrivateRoute;
