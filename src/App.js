import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Routes, Route } from "react-router-dom";
import UserSignIn from "./components/auth/usersignin/UserSignIn";
import UserSignUp from "./components/auth/usersignup/UserSignUp";
import AdminSignIn from "./components/auth/adminsignin/AdminSignIn";
import ApprovalSignIn from "./components/auth/approvalsignin/ApprovalSignIn";
import ProtectedRoute from "./components/auth/protectedroute/ProtectedRoute";
import PageNotFound from "./components/pagenotfound/PageNotFound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/" element={<UserSignIn />} />
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route path="approvalsignin" element={<ApprovalSignIn />} />
        <Route path="/*" element={<ProtectedRoute />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
