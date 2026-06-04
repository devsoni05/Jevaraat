import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAdminToken } from "./storage";

function ProtectedRoute() {
  const location = useLocation();
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
