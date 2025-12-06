import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import Login from './app/pages/Login.tsx'
import Produtos from './app/pages/admin/pizzasManage.tsx'
import Metricas from './app/pages/Metricas/metricas.tsx'
import UserManage from './app/pages/admin/userManage.tsx'
import PizzasManage from './app/pages/admin/pizzasManage.tsx'
import AddressManage from './app/pages/admin/AddressManage.tsx'
import AdicionaisManage from './app/pages/admin/AdicionaisManage.tsx'
import OrderItemManage from './app/pages/admin/OrderItemManage.tsx'
import PerfilManage from './app/pages/admin/PerfilManage.tsx'
import PrivateRoute from './middlewares/PrivateRoute.tsx'
import PedidosManage from './app/pages/admin/orderManage.tsx'



const router = createBrowserRouter([
  {
    element: <Login />, // sem sidebar
    children: [
      { path: "/login"},
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