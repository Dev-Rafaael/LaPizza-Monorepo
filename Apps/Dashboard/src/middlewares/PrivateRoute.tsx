import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const l = 1; 

  if (l !== 1) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

