import { Link } from "react-router-dom";
import styles from "../../styles/NavBar.module.css";
import useUser from "@packages/hooks/useUser";

function NavBar({ setOpen }) {
  const { user } = useUser();

  return (
    <header className={styles.navbar}>
      <section className={styles.navBarContent}>

        <div className={styles.left}>
          <button className={styles.mobileMenu} onClick={() => setOpen(true)}></button>
          <p>Pages / Dashboard</p>

          <Link to="/Dashboard" className={styles.link}>
            Dashboard
          </Link>
        </div>

        <div className={styles.right}>
          <Link to="/perfil" className={styles.profile}>
            <span className={styles.name}>{user?.nome}</span>
            <span className={styles.email}>{user?.email}</span>
          </Link>
        </div>

      </section>
    </header>
  );
}


export default NavBar;
