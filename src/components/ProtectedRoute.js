// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />; // not logged in
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />; // no permission
  }

  return children;
}
