import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import Login from "./app/pages/Login";

import Metricas from "./app/pages/Metricas/metricas";
import Produtos from "./app/pages/admin/pizzasManage";
import PizzasManage from "./app/pages/admin/pizzasManage";
import UserManage from "./app/pages/admin/userManage";
import AddressManage from "./app/pages/admin/AddressManage";
import AdicionaisManage from "./app/pages/admin/AdicionaisManage";
import OrderItemManage from "./app/pages/admin/OrderItemManage";
import PerfilManage from "./app/pages/admin/PerfilManage";
import PedidosManage from "./app/pages/admin/orderManage";
import PrivateRoute from "./middlewares/PrivateRoute";
import PublicRoute from "./middlewares/PublicRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: "/dashboard", element: <Metricas /> },
          { path: "/Pedidos", element: <PedidosManage /> },
          { path: "/produtos", element: <Produtos /> },
          { path: "/Pizzas", element: <PizzasManage /> },
          { path: "/Usuarios", element: <UserManage /> },
          { path: "/Endereços", element: <AddressManage /> },
          { path: "/Adicionais", element: <AdicionaisManage /> },
          { path: "/OrdersItems", element: <OrderItemManage /> },
          { path: "/perfil", element: <PerfilManage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
