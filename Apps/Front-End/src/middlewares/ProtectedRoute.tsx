import { Navigate, Outlet } from "react-router-dom";
  import  {useUserStore}  from "@packages/store/useUserStore";

export default function ProtectedRoute() {
  const { user } = useUserStore();


  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
