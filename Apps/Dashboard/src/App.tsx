import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './app/components/NavBar'
import Footer from './app/components/Footer'
import Sidebar from './app/components/SideBar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-container">
      <NavBar />

      <ToastContainer />

      <div className={`content ${open ? "sidebar-open" : ""}`}>
        <Sidebar open={open} setOpen={setOpen} />

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
