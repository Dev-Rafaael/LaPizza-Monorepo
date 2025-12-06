
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // estilos obrigatórios

function App() {
  
  return (
    <>
 
    <Navbar/> 
    <Outlet/>
     <ToastContainer/>
    <Footer/>
    
    </>
  )
}

export default App