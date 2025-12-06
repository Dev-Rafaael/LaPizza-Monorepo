import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Sobre from "./pages/Sobre";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Cardapio from "./pages/Pizza";
import Carrinho from "./pages/Cart";
import Termos from "./pages/Termos";
import "./index.css";
import LayoutZap from "./components/LayoutZap";
import Cadastrar from "./pages/Order/UserForm";
import Login from "./pages/Login";
import Order from "./pages/Order/Order";
import OrderItem from "./pages/OrderItem";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import User from "./pages/User";
import CancelPage from "./pages/CancelPage";
import SuccessPage from "./pages/SuccessPage";
import OrderStatus from "./pages/OrderStatus";
import MeusPedidos from "./pages/MeusPedidos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fale-conosco/",
        element: <Contato />,
      },
      {
        path: "/sobre/",
        element: <Sobre />,
      },
      {
        path: "/Politica-Privacidade/",
        element: <PoliticaPrivacidade />,
      },
      {
        path: "/Cardapio/",
        element: <Cardapio />,
      },
    {
        path: "Orçamento/:sabor",
        element: <OrderItem />,
      },
    
      {
        path: "/Carrinho/",
        element: <Carrinho />,
      },
       {
        path: "/Meus-Pedidos/",
        element: <MeusPedidos />,
      },
      {
        path: "Perfil/",
        element: <User />,
      },
     
      {
        path: "/Termos-De-Uso",
        element: <Termos />,
      },
      {
        path: "/Cadastro",
        element: <Cadastrar />,
      },
      {
        path: "/Login",
        element: <Login />,
      },  
       {
        path: "/cancel",
        element: <CancelPage />,
      }, 
        {
        path: "/success/",
        element: <SuccessPage />,
      },
          {
        path: "/order-status/:orderId",
        element: <OrderStatus />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/Identificação/", element: <Order /> },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LayoutZap>
      <RouterProvider router={router} />
    </LayoutZap>
  </StrictMode>
);
