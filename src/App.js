import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageSchools from "./pages/ManageSchools";
import ManageDrivers from "./pages/ManageDrivers";
import ManageStops from "./pages/ManageStops";
import ManageAdmins from "./pages/ManageAdmins";
import "./index.css";   // ✅ This line is needed

function App() {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const hideSidebar = location.pathname === "/login";

  return (
    <div className="flex">
      {!hideSidebar && role && <Sidebar role={role} />}
      <div className="flex-1 p-6">
        <Routes>
          <Route
            path="/"
            element={
              role ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "schooladmin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schools"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "schooladmin"]}>
                <ManageSchools />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admins"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <ManageAdmins />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "schooladmin"]}>
                <ManageDrivers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stops"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "schooladmin"]}>
                <ManageStops />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
