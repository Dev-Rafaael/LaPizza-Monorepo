import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'


import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import Login from './app/pages/Login'
import Produtos from './app/pages/admin/pizzasManage'
import Metricas from './app/pages/Metricas/metricas'
import UserManage from './app/pages/admin/userManage'
import PizzasManage from './app/pages/admin/pizzasManage'
import AddressManage from './app/pages/admin/AddressManage'
import AdicionaisManage from './app/pages/admin/AdicionaisManage'
import OrderItemManage from './app/pages/admin/OrderItemManage'
import PerfilManage from './app/pages/admin/PerfilManage'
import PrivateRoute from './middlewares/PrivateRoute'
import PedidosManage from './app/pages/admin/orderManage'



const router = createBrowserRouter([
 { path: "/login", element: <Login /> },
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