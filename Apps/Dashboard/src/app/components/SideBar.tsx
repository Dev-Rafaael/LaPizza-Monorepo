
import { Link } from "react-router-dom";
import styles from "../../styles/SideBar.module.css";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Sidebar({ open, setOpen }: SidebarProps) {
  return (
<>
  <button className={styles.hamburger} onClick={() => setOpen(!open)}>
    <span className={`${styles.bar} ${open ? styles.bar1 : ""}`}></span>
    <span className={`${styles.bar} ${open ? styles.bar2 : ""}`}></span>
    <span className={`${styles.bar} ${open ? styles.bar3 : ""}`}></span>
  </button>

  {/* Overlay */}
  {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

  {/* Sidebar */}
  <aside className={`${styles.container} ${open ? styles.open : ""}`}>
    <h2 className={styles.title}>LA PIZZA</h2>

     <nav className={styles.nav}>
          <Link to="/Dashboard" className={styles.link} onClick={() => setOpen(false)}>
            📊 DashBoard
          </Link>

          <Link to="/DashBoard" className={styles.link} onClick={() => setOpen(false)}>
            📈 Métricas
          </Link>

          <Link to="/Pizzas" className={styles.link} onClick={() => setOpen(false)}>
            🍕 Pizzas
          </Link>

          <Link to="/Usuarios" className={styles.link} onClick={() => setOpen(false)}>
            👥 Usuários
          </Link>

          <Link to="/Endereços" className={styles.link} onClick={() => setOpen(false)}>
            🏠 Address
          </Link>

          <Link to="/Adicionais" className={styles.link} onClick={() => setOpen(false)}>
            ➕ Adicionais
          </Link>

          <Link to="/OrdersItems" className={styles.link} onClick={() => setOpen(false)}>
            🛒 OrderItems
          </Link>
           <Link to="/Pedidos" className={styles.link} onClick={() => setOpen(false)}>
           📦 Orders
          </Link>
        </nav>
  </aside>
</>

  );
}

export default Sidebar;
