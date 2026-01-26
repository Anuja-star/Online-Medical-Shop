import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const storedRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // ❌ Not logged in
  if (!token || !storedRole) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but wrong role
  if (role && storedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
};

export default PrivateRoute;



