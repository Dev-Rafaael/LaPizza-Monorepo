import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@packages/store/useUserStore";

export default function PublicRoute() {
  const token = useUserStore((state) => state.token);

  if (token) {
    return <Navigate to="/Dashboard" replace />;
  }

  return <Outlet />;
}
