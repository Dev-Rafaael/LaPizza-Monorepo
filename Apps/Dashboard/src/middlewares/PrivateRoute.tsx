import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@packages/store/useUserStore";

export default function PrivateRoute() {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
