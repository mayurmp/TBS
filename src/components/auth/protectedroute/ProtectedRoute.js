import React from "react";
import Dashboard from "../../layout/dashboard/Dashboard";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const usertoken = localStorage.getItem("usertoken");
  const admintoken = localStorage.getItem("admintoken");
  const approvaltoken = localStorage.getItem("approvaltoken");

  if (approvaltoken || usertoken || admintoken) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoute = () => {
  const auth = useAuth();
  return auth ? <Dashboard /> : <Navigate to="/" />;
};

export default ProtectedRoute;

